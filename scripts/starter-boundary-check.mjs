#!/usr/bin/env node
import fs from "node:fs";
import path from "node:path";

const root = process.cwd();

const requiredCorePaths = [
  "src/app",
  "src/lib/security",
  "src/middleware.ts",
  "src/app/api/contact/route.ts",
  "src/lib/validation/contact.ts",
  "next.config.mjs",
  "vitest.config.ts",
  "docs/foundation/CORE_STARTER_BOUNDARY.md",
  "docs/foundation/RELEASE_PLAYBOOK.md",
];

const requiredPerProjectPaths = [
  "content/blog",
  "content/tutorials",
  "public/illustrations",
  "public/images",
];

function exists(relPath) {
  return fs.existsSync(path.join(root, relPath));
}

function assertPaths(paths, label) {
  const missing = paths.filter((item) => !exists(item));
  if (missing.length > 0) {
    throw new Error(`${label} missing: ${missing.join(", ")}`);
  }
}

function assertMdxPresent(relDir) {
  const dir = path.join(root, relDir);
  const files = fs.readdirSync(dir).filter((file) => file.endsWith(".mdx"));
  if (files.length === 0) {
    throw new Error(`No .mdx files found in ${relDir}`);
  }
}

function run() {
  assertPaths(requiredCorePaths, "CoreStarter paths");
  assertPaths(requiredPerProjectPaths, "PerProject paths");

  assertMdxPresent("content/blog");
  assertMdxPresent("content/tutorials");

  console.log("✓ CoreStarter boundary check passed");
}

try {
  run();
  process.exit(0);
} catch (error) {
  console.error("Boundary check failed:", error instanceof Error ? error.message : error);
  process.exit(1);
}
