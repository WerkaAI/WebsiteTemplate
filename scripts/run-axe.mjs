#!/usr/bin/env node
import fs from "node:fs/promises";
import path from "node:path";
import { spawn } from "node:child_process";
import { fileURLToPath } from "node:url";
import { ensureServer, projectRoot } from "./utils/dev-server.mjs";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

process.chdir(projectRoot);

const DEFAULT_ROUTES = [
  { path: "/", name: "home" },
  { path: "/blog", name: "blog" },
  { path: "/blog/2026-02-21-template-start", name: "blog-post" },
  { path: "/kontakt", name: "kontakt" }
];

const DEFAULT_VIEWPORT = { label: "360x740", width: 360, height: 740 };
const baseUrlInput = process.env.REVIEW_BASE_URL || "http://localhost:3000";
const outputDir = path.resolve(projectRoot, "docs/review/artifacts/mobile/axe");
const NPX_COMMAND = process.platform === "win32" ? "npx.cmd" : "npx";

function parseCliOptions() {
  const args = process.argv.slice(2);
  const options = {
    routes: DEFAULT_ROUTES,
    viewport: DEFAULT_VIEWPORT,
    extra: []
  };

  for (const arg of args) {
    if (arg.startsWith("--routes=")) {
      const value = arg.replace("--routes=", "");
      options.routes = value.split(",").map((entry) => {
        const [name, rawPath] = entry.split(":");
        return { name: name?.trim() || rawPath.trim().replace(/[^a-z0-9]/gi, "-"), path: rawPath.trim() };
      });
    } else if (arg.startsWith("--viewport=")) {
      const dims = arg.replace("--viewport=", "");
      const [width, height] = dims.split("x").map((value) => Number.parseInt(value, 10));
      if (!width || !height) {
        throw new Error(`Invalid viewport definition: ${dims}`);
      }
      options.viewport = { label: dims, width, height };
    } else {
      options.extra.push(arg);
    }
  }

  return options;
}

async function ensureOutputDirectory(dirPath) {
  await fs.mkdir(dirPath, { recursive: true });
}

function runAxeCli(url, viewport, reportPath, extraArgs) {
  const relativeReportPath = path.relative(projectRoot, reportPath);
  const args = [
    "--yes",
    "@axe-core/cli",
    url,
    "--exit",
    "--save",
    relativeReportPath,
  `--chrome-options=--window-size=${viewport.width},${viewport.height}`,
    ...extraArgs
  ];

  return new Promise((resolve, reject) => {
    const child = spawn(NPX_COMMAND, args, { stdio: "inherit", shell: process.platform === "win32" });
    child.on("error", reject);
    child.on("close", (code) => {
      resolve(code ?? 0);
    });
  });
}

async function run() {
  const { routes, viewport, extra } = parseCliOptions();
  await ensureOutputDirectory(outputDir);
  const { stop, baseUrl } = await ensureServer(baseUrlInput, { autoStartEnvVar: "REVIEW_AUTO_START" });

  let exitCode = 0;

  try {
    for (const route of routes) {
      const targetUrl = new URL(route.path, baseUrl).toString();
      const reportName = `${route.name}-${viewport.label}.json`;
      const reportPath = path.join(outputDir, reportName);
      console.log(`\nRunning axe-core audit for ${targetUrl} @ ${viewport.label}`);
      const code = await runAxeCli(targetUrl, viewport, reportPath, extra);
      if (code !== 0 && exitCode === 0) {
        exitCode = code;
      }
    }
  } finally {
    await stop();
  }

  if (exitCode !== 0) {
    console.warn(`axe-core CLI reported accessibility findings (exit code ${exitCode}). See JSON reports in ${outputDir}.`);
  } else {
    console.log(`axe-core CLI completed with no blocking violations. Reports saved to ${outputDir}.`);
  }

  process.exit(exitCode);
}

run().catch((error) => {
  console.error("axe run failed:", error);
  process.exit(1);
});
