#!/usr/bin/env tsx
import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import ts from "typescript";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const workspaceRoot = path.resolve(__dirname, "..");

const componentsRoot = path.join(workspaceRoot, "src/components");

interface ComponentInfo {
  file: string;
  exports: {
    default: string | null;
    named: string[];
  };
  classNames: string[];
  dataTestIds: string[];
}

async function walk(dir: string): Promise<string[]> {
  const entries = await fs.readdir(dir, { withFileTypes: true });
  const files: string[] = [];
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...(await walk(fullPath)));
    } else if (entry.isFile() && entry.name.endsWith(".tsx")) {
      files.push(fullPath);
    }
  }
  return files;
}

function collectFromSource(filePath: string, sourceText: string): ComponentInfo {
  const sourceFile = ts.createSourceFile(filePath, sourceText, ts.ScriptTarget.Latest, true, ts.ScriptKind.TSX);

  const classNames = new Set<string>();
  const dataTestIds = new Set<string>();
  const namedExports = new Set<string>();
  let defaultExport: string | null = null;

  const recordClassName = (value: ts.Expression) => {
    if (ts.isStringLiteral(value) || ts.isNoSubstitutionTemplateLiteral(value)) {
      value.text
        .split(/\s+/)
        .map((token) => token.trim())
        .filter(Boolean)
        .forEach((token) => classNames.add(token));
    }
  };

  const recordDataTestId = (value: ts.Expression) => {
    if (ts.isStringLiteral(value) || ts.isNoSubstitutionTemplateLiteral(value)) {
      dataTestIds.add(value.text);
    }
  };

  const visit = (node: ts.Node) => {
    if (ts.isJsxAttribute(node) && node.initializer) {
      const name = node.name.getText(sourceFile);
      const init = node.initializer;
      if (name === "className") {
        if (ts.isStringLiteral(init)) {
          recordClassName(init);
        } else if (ts.isJsxExpression(init) && init.expression) {
          if (ts.isStringLiteral(init.expression) || ts.isNoSubstitutionTemplateLiteral(init.expression)) {
            recordClassName(init.expression);
          }
        }
      }
      if (name === "data-testid") {
        if (ts.isStringLiteral(init)) {
          recordDataTestId(init);
        } else if (ts.isJsxExpression(init) && init.expression) {
          if (ts.isStringLiteral(init.expression) || ts.isNoSubstitutionTemplateLiteral(init.expression)) {
            recordDataTestId(init.expression);
          }
        }
      }
    }

    if (ts.isFunctionDeclaration(node) && node.name) {
      const hasDefault = node.modifiers?.some((mod) => mod.kind === ts.SyntaxKind.DefaultKeyword);
      const hasExport = node.modifiers?.some((mod) => mod.kind === ts.SyntaxKind.ExportKeyword);
      if (hasDefault) {
        defaultExport = node.name.text;
      } else if (hasExport) {
        namedExports.add(node.name.text);
      }
    }

    if (ts.isVariableStatement(node)) {
      const hasExport = node.modifiers?.some((mod) => mod.kind === ts.SyntaxKind.ExportKeyword);
      if (hasExport) {
        node.declarationList.declarations.forEach((decl) => {
          if (ts.isIdentifier(decl.name)) {
            namedExports.add(decl.name.text);
          }
        });
      }
    }

    if (ts.isExportAssignment(node)) {
      if (ts.isIdentifier(node.expression)) {
        defaultExport = node.expression.text;
      }
    }

    ts.forEachChild(node, visit);
  };

  visit(sourceFile);

  return {
    file: path.relative(workspaceRoot, filePath).replace(/\\/g, "/"),
    exports: {
      default: defaultExport,
      named: Array.from(namedExports).sort(),
    },
    classNames: Array.from(classNames).sort(),
    dataTestIds: Array.from(dataTestIds).sort(),
  };
}

async function run() {
  const componentFiles = await walk(componentsRoot);
  const reports: ComponentInfo[] = [];

  for (const file of componentFiles) {
    const sourceText = await fs.readFile(file, "utf8");
    reports.push(collectFromSource(file, sourceText));
  }

  reports.sort((a, b) => a.file.localeCompare(b.file));

  const outputDir = path.join(workspaceRoot, "docs/review/artifacts/mobile");
  await fs.mkdir(outputDir, { recursive: true });
  const outputPath = path.join(outputDir, "component-map.json");

  await fs.writeFile(
    outputPath,
    JSON.stringify({ generatedAt: new Date().toISOString(), components: reports }, null, 2),
    "utf8"
  );
  console.log(`Component map written to ${outputPath}`);
}

run().catch((error) => {
  console.error("Component map generation failed:", error);
  process.exitCode = 1;
});
