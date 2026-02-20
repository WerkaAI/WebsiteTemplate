#!/usr/bin/env node
import puppeteer from "puppeteer";
import { ensureServer } from "./utils/dev-server.mjs";

const baseUrlInput = process.env.SMOKE_BASE_URL || "http://localhost:3000";

const routes = [
  { path: "/", name: "home" },
  { path: "/blog", name: "blog" },
  { path: "/kontakt", name: "kontakt" },
  { path: "/tutoriale", name: "tutoriale" },
];

async function runRoute(page, baseUrl, route) {
  const url = new URL(route.path, baseUrl).toString();

  const pageErrors = [];
  const requestFailures = [];

  const onPageError = (error) => pageErrors.push(String(error));
  const onRequestFailed = (req) => {
    const failure = req.failure();
    requestFailures.push(`${req.method()} ${req.url()} -> ${failure?.errorText ?? "unknown"}`);
  };

  page.on("pageerror", onPageError);
  page.on("requestfailed", onRequestFailed);

  try {
    const response = await page.goto(url, { waitUntil: "networkidle2" });
    const status = response?.status() ?? 0;

    if (status >= 400) {
      throw new Error(`Route ${route.name} returned HTTP ${status}`);
    }

    const hasMain = await page.$("main");
    if (!hasMain) {
      throw new Error(`Route ${route.name} has no <main> landmark`);
    }

    if (pageErrors.length > 0) {
      throw new Error(`Route ${route.name} has page errors: ${pageErrors.join(" | ")}`);
    }

    const nonEssentialFailure = requestFailures.find((item) => {
      const lower = item.toLowerCase();
      return !lower.includes("googletagmanager") && !lower.includes("google-analytics") && !lower.includes("facebook.net");
    });

    if (nonEssentialFailure) {
      throw new Error(`Route ${route.name} has failed request: ${nonEssentialFailure}`);
    }

    console.log(`✓ ${route.name} (${route.path})`);
  } finally {
    page.off("pageerror", onPageError);
    page.off("requestfailed", onRequestFailed);
  }
}

async function run() {
  const { stop, baseUrl } = await ensureServer(baseUrlInput, { autoStartEnvVar: "SMOKE_AUTO_START" });
  const browser = await puppeteer.launch({ headless: "new" });
  const page = await browser.newPage();

  await page.setViewport({
    width: 390,
    height: 844,
    deviceScaleFactor: 2,
    isMobile: true,
    hasTouch: true,
  });

  let hasFailure = false;

  try {
    for (const route of routes) {
      try {
        await runRoute(page, baseUrl, route);
      } catch (error) {
        hasFailure = true;
        console.error(`✗ ${route.name}:`, error instanceof Error ? error.message : error);
      }
    }
  } finally {
    await browser.close();
    await stop();
  }

  if (hasFailure) {
    process.exit(1);
  }

  console.log("Smoke E2E completed successfully.");
  process.exit(0);
}

run().catch((error) => {
  console.error("Smoke E2E failed:", error);
  process.exit(1);
});
