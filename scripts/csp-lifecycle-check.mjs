#!/usr/bin/env node
import { ensureServer } from "./utils/dev-server.mjs";

const baseUrlInput = process.env.CSP_CHECK_BASE_URL || "http://localhost:3000";

async function checkMode(baseUrl, stage, expected) {
  const response = await fetch(new URL("/", baseUrl), {
    headers: {
      "x-csp-lifecycle-stage": stage,
      accept: "text/html",
    },
  });

  if (!response.ok) {
    throw new Error(`HTTP ${response.status} for stage ${stage}`);
  }

  const mode = response.headers.get("x-csp-active-mode");
  const csp = response.headers.get("content-security-policy");
  const cspReportOnly = response.headers.get("content-security-policy-report-only");

  if (mode !== expected) {
    throw new Error(`Stage ${stage} expected mode ${expected}, got ${mode}`);
  }

  if (expected === "report-only") {
    if (csp) throw new Error(`Stage ${stage} should not have enforce header`);
    if (!cspReportOnly) throw new Error(`Stage ${stage} should have report-only header`);
  }

  if (expected === "dual") {
    if (!csp) throw new Error(`Stage ${stage} should have enforce header`);
    if (!cspReportOnly) throw new Error(`Stage ${stage} should have report-only header`);
  }

  if (expected === "enforce") {
    if (!csp) throw new Error(`Stage ${stage} should have enforce header`);
    if (cspReportOnly) throw new Error(`Stage ${stage} should not have report-only header`);
  }

  console.log(`✓ stage=${stage} mode=${mode}`);
}

async function run() {
  const { stop, baseUrl } = await ensureServer(baseUrlInput, {
    autoStartEnvVar: "CSP_CHECK_AUTO_START",
  });

  try {
    await checkMode(baseUrl, "build", "report-only");
    await checkMode(baseUrl, "pre-release", "dual");
    await checkMode(baseUrl, "release", "enforce");
    console.log("CSP lifecycle check completed successfully.");
    process.exit(0);
  } finally {
    await stop();
  }
}

run().catch((error) => {
  console.error("CSP lifecycle check failed:", error instanceof Error ? error.message : error);
  process.exit(1);
});
