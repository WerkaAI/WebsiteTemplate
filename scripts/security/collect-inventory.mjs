import { promises as fs } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, "../..");

const appDir = path.join(rootDir, "src", "app");
const srcDir = path.join(rootDir, "src");
const contentDir = path.join(rootDir, "content");
const outputPath = path.join(rootDir, "docs", "security", "inventory.json");

const ROUTE_FILE_REGEX = /^page\.(tsx|ts|jsx|js|mdx)$/;
const FIRST_PARTY_HOSTS = new Set([
  "autozaba.pl",
  "www.autozaba.pl",
  "app.autozaba.pl",
]);

async function pathExists(targetPath) {
  try {
    await fs.access(targetPath);
    return true;
  } catch {
    return false;
  }
}

function transformSegment(segment) {
  if (segment.startsWith("(") && segment.endsWith(")")) {
    return null; // route group, omit from path
  }

  if (segment.startsWith("@")) {
    return segment.slice(1); // parallel routes
  }

  if (segment.startsWith("[[...") && segment.endsWith("]]")) {
    return `:${segment.slice(4, -2)}?`;
  }

  if (segment.startsWith("[...") && segment.endsWith("]")) {
    return `:${segment.slice(4, -1)}*`;
  }

  if (segment.startsWith("[") && segment.endsWith("]")) {
    return `:${segment.slice(1, -1)}`;
  }

  return segment === "page" ? null : segment;
}

async function collectRoutes(dir, segments = []) {
  if (!(await pathExists(dir))) {
    return [];
  }

  const entries = await fs.readdir(dir, { withFileTypes: true });
  const routes = [];

  for (const entry of entries) {
    const entryPath = path.join(dir, entry.name);

    if (entry.isDirectory()) {
      const transformed = transformSegment(entry.name);
      const nextSegments = transformed === null ? segments : [...segments, transformed];
      const childRoutes = await collectRoutes(entryPath, nextSegments);
      routes.push(...childRoutes);
      continue;
    }

    if (entry.isFile() && ROUTE_FILE_REGEX.test(entry.name)) {
      const cleanedSegments = segments.filter(Boolean);
      const routePath = "/" + cleanedSegments.join("/");
      routes.push({
        route: routePath === "//" || routePath === "/" ? "/" : routePath.replace(/\/\//g, "/"),
        file: path.relative(rootDir, entryPath).replace(/\\/g, "/"),
      });
    }
  }

  return routes;
}

async function collectMdxImports(dir) {
  if (!(await pathExists(dir))) {
    return [];
  }

  const entries = await fs.readdir(dir, { withFileTypes: true });
  const mdxData = [];

  for (const entry of entries) {
    const entryPath = path.join(dir, entry.name);

    if (entry.isDirectory()) {
      const nested = await collectMdxImports(entryPath);
      mdxData.push(...nested);
      continue;
    }

    if (entry.isFile() && entry.name.endsWith(".mdx")) {
      const raw = await fs.readFile(entryPath, "utf8");
      const importMatches = raw.match(/^import\s+.+$/gm) || [];
      mdxData.push({
        file: path.relative(rootDir, entryPath).replace(/\\/g, "/"),
        imports: importMatches.map((line) => line.trim()),
      });
    }
  }

  return mdxData;
}

async function collectThirdPartyHosts(directories) {
  const hostMap = new Map();

  const urlPattern = /https?:\/\/([A-Za-z0-9.-]+)[^\s"'`<>)\\]*/g;

  for (const dir of directories) {
    if (!(await pathExists(dir))) {
      continue;
    }

    const stack = [dir];
    while (stack.length) {
      const current = stack.pop();
      const stat = await fs.stat(current);

      if (stat.isDirectory()) {
        const childEntries = await fs.readdir(current);
        for (const child of childEntries) {
          stack.push(path.join(current, child));
        }
        continue;
      }

      if (!stat.isFile()) continue;

      // Only inspect text-based files
      if (!/[.](ts|tsx|js|jsx|mdx|mjs|cjs|json|scss|css|html|txt)$/.test(current)) {
        continue;
      }

      const content = await fs.readFile(current, "utf8");
      const relativePath = path.relative(rootDir, current).replace(/\\/g, "/");
      const lines = content.split(/\r?\n/);

      lines.forEach((line, index) => {
        let match;
        while ((match = urlPattern.exec(line)) !== null) {
          const host = match[1].toLowerCase();
          if (FIRST_PARTY_HOSTS.has(host) || host === "localhost" || host === "127.0.0.1") {
            continue;
          }

          if (!hostMap.has(host)) {
            hostMap.set(host, []);
          }

          hostMap.get(host).push({
            file: relativePath,
            line: index + 1,
            snippet: line.trim().slice(0, 200),
          });
        }
      });
    }
  }

  const entries = [];
  for (const [host, references] of hostMap.entries()) {
    entries.push({ host, references });
  }

  return entries.sort((a, b) => a.host.localeCompare(b.host));
}

async function main() {
  const [routes, mdxImports, thirdPartyHosts] = await Promise.all([
    collectRoutes(appDir),
    collectMdxImports(contentDir),
    collectThirdPartyHosts([srcDir, contentDir]),
  ]);

  const inventory = {
    generatedAt: new Date().toISOString(),
    rootDir,
    metrics: {
      routeCount: routes.length,
      mdxFileCount: mdxImports.length,
      thirdPartyHostCount: thirdPartyHosts.length,
    },
    routes: routes.sort((a, b) => a.route.localeCompare(b.route)),
    mdx: mdxImports.sort((a, b) => a.file.localeCompare(b.file)),
    thirdPartyHosts,
  };

  await fs.mkdir(path.dirname(outputPath), { recursive: true });
  await fs.writeFile(outputPath, JSON.stringify(inventory, null, 2) + "\n", "utf8");

  console.log(`Security inventory written to ${path.relative(rootDir, outputPath)}`);
}

main().catch((error) => {
  console.error("Failed to collect security inventory:", error);
  process.exitCode = 1;
});
