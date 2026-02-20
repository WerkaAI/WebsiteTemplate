#!/usr/bin/env node
import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import puppeteer from "puppeteer";
import { ensureServer, projectRoot, sleep } from "./utils/dev-server.mjs";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

process.chdir(projectRoot);

const DEFAULT_VIEWPORTS = [
  { label: "360x740", width: 360, height: 740, deviceScaleFactor: 2 },
  { label: "414x896", width: 414, height: 896, deviceScaleFactor: 2 },
  { label: "768x1024", width: 768, height: 1024, deviceScaleFactor: 2 }
];

const DEFAULT_ROUTES = [
  { path: "/", name: "home" },
  { path: "/blog", name: "blog" },
  { path: "/blog/2026-02-21-template-start", name: "blog-post" },
  { path: "/kontakt", name: "kontakt" }
];

const baseUrlString = process.env.REVIEW_BASE_URL || "http://localhost:3000";
const baseUrl = new URL(baseUrlString);

function parseCliOptions() {
  const args = process.argv.slice(2);
  const options = { routes: DEFAULT_ROUTES, viewports: DEFAULT_VIEWPORTS };

  for (const arg of args) {
    if (arg.startsWith("--routes=")) {
      const value = arg.replace("--routes=", "");
      options.routes = value.split(",").map((entry) => {
        const [name, rawPath] = entry.split(":");
        return { name: name?.trim() || rawPath.trim().replace(/[^a-z0-9]/gi, "-"), path: rawPath.trim() };
      });
    }
    if (arg.startsWith("--viewports=")) {
      const value = arg.replace("--viewports=", "");
      options.viewports = value.split(",").map((entry) => {
        const [label, dims] = entry.split("=");
        const [width, height] = dims.split("x").map((n) => Number.parseInt(n, 10));
        if (!width || !height) {
          throw new Error(`Invalid viewport definition: ${entry}`);
        }
        return { label: label || `${width}x${height}`, width, height, deviceScaleFactor: 2 };
      });
    }
  }

  return options;
}

function sanitizeDom(html) {
  return html
    .replace(/\sdata-n-[^=]+="[^"]*"/g, "")
    .replace(/\sdata-new-gr-c-s-check-loaded="[^"]*"/g, "")
    .replace(/\sdata-new-gr-c-s-loaded="[^"]*"/g, "")
    .replace(/\sclass="\s*"/g, "")
    .replace(/\n{3,}/g, "\n\n");
}

async function ensureDirectory(dirPath) {
  await fs.mkdir(dirPath, { recursive: true });
}

async function captureRoute(page, route, viewport, outputDir) {
  const url = new URL(route.path, baseUrl).toString();
  await page.setViewport({
    width: viewport.width,
    height: viewport.height,
    deviceScaleFactor: viewport.deviceScaleFactor ?? 2,
    isMobile: viewport.width < 600,
    hasTouch: viewport.width < 600
  });

  await page.goto(url, { waitUntil: "networkidle2" });
  await sleep(450);

  const serializedDom = await page.evaluate(() => {
    const clone = document.documentElement.cloneNode(true);
    clone.querySelectorAll("script, noscript").forEach((node) => node.remove());
    clone.querySelectorAll("style[data-href*='/_next/']").forEach((node) => node.remove());
    clone.querySelectorAll("[data-testid*='toast']").forEach((node) => node.remove());

    const doctype = document.doctype
      ? `<!DOCTYPE ${document.doctype.name}${document.doctype.publicId ? ` PUBLIC \"${document.doctype.publicId}\"` : ""}${document.doctype.systemId ? ` \"${document.doctype.systemId}\"` : ""}>\n`
      : "<!DOCTYPE html>\n";

    return doctype + clone.outerHTML;
  });

  const sanitized = sanitizeDom(serializedDom);
  const filename = `${route.name}-${viewport.label}.html`;
  const filePath = path.join(outputDir, filename);
  await fs.writeFile(filePath, sanitized, "utf8");
  return filePath;
}

async function run() {
  const { routes, viewports } = parseCliOptions();
  const { stop } = await ensureServer(baseUrl, { autoStartEnvVar: "REVIEW_AUTO_START" });
  const browser = await puppeteer.launch({ headless: "new" });
  const page = await browser.newPage();

  try {
    const outputRoot = path.resolve(__dirname, "../docs/review/artifacts/mobile/dom");
    await ensureDirectory(outputRoot);

    const manifest = [];

    for (const route of routes) {
      for (const viewport of viewports) {
        const savedPath = await captureRoute(page, route, viewport, outputRoot);
        manifest.push({
          route: route.path,
          name: route.name,
          viewport: viewport.label,
          file: path.relative(path.resolve(__dirname, ".."), savedPath)
        });
        console.log(`Captured ${route.path} @ ${viewport.label} -> ${savedPath}`);
      }
    }

    const manifestPath = path.join(outputRoot, "manifest.json");
    await fs.writeFile(
      manifestPath,
      JSON.stringify({ baseUrl: baseUrl.href, generatedAt: new Date().toISOString(), routes: manifest }, null, 2)
    );
    console.log(`Manifest written to ${manifestPath}`);
  } finally {
    await browser.close();
    await stop();
  }
}

run().catch((error) => {
  console.error("DOM capture failed:", error);
  process.exitCode = 1;
});
