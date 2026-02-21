import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { headers as nextHeaders } from "next/headers";

import { buildSecurityHeaders } from "./headers";

export const CSP_NONCE_HEADER = "x-nonce";

export type CspMode = "enforce" | "report-only" | "dual";
export type CspLifecycleStage = "build" | "pre-release" | "release";

const STATIC_FILE_EXTENSION = /\.(?:js|mjs|css|png|jpg|jpeg|gif|svg|ico|webp|avif|txt|xml|json|map|pdf|woff2?|ttf)$/i;

const ENV_CSP_MODE = process.env.CSP_MODE as CspMode | undefined;
const ENV_CSP_LIFECYCLE_STAGE =
  process.env.CSP_LIFECYCLE_STAGE as CspLifecycleStage | undefined;
const ALLOW_INLINE_DEBUG = process.env.CSP_ALLOW_UNSAFE_INLINE === "1" || process.env.NODE_ENV === "development";
const ALLOW_EVAL_DEBUG = process.env.CSP_ALLOW_UNSAFE_EVAL === "1";
const DISABLE_UPGRADE_INSECURE = process.env.CSP_DISABLE_UPGRADE_INSECURE_REQUESTS === "1";
const CSP_REPORT_URI = process.env.CSP_REPORT_URI?.trim() || "/api/csp-report";
const CSP_DISABLED = process.env.CSP_DISABLE === "1";

export function createNonce(): string {
  if (typeof crypto !== "undefined" && typeof crypto.getRandomValues === "function") {
    const bytes = new Uint8Array(16);
    crypto.getRandomValues(bytes);
    return toBase64(bytes);
  }

  if (typeof crypto !== "undefined" && typeof crypto.randomUUID === "function") {
    return crypto.randomUUID().replace(/-/g, "");
  }

  // Last resort: rely on Math.random with additional entropy. This path should rarely run.
  return Math.random().toString(36).slice(2) + Math.random().toString(36).slice(2);
}

function toBase64(bytes: Uint8Array): string {
  if (typeof Buffer !== "undefined") {
    return Buffer.from(bytes).toString("base64");
  }

  let binary = "";
  for (let index = 0; index < bytes.length; index += 1) {
    binary += String.fromCharCode(bytes[index]);
  }

  // btoa is available in the Edge runtime.
  return btoa(binary);
}

export function shouldHandleRequest(request: NextRequest): boolean {
  if (CSP_DISABLED) {
    return false;
  }

  const { pathname } = request.nextUrl;
  if (pathname.startsWith("/_next/")) {
    return false;
  }
  if (pathname.startsWith("/api/")) {
    return false;
  }
  if (STATIC_FILE_EXTENSION.test(pathname)) {
    return false;
  }

  const accept = request.headers.get("accept") || "";
  if (accept.includes("text/html")) {
    return true;
  }

  // Fallback: treat route without explicit extension as HTML document.
  return !pathHasFileExtension(pathname);
}

function pathHasFileExtension(pathname: string): boolean {
  const lastSegment = pathname.split("/").pop() ?? "";
  return lastSegment.includes(".");
}

function isCspMode(value: string | null | undefined): value is CspMode {
  return value === "enforce" || value === "dual" || value === "report-only";
}

function isLifecycleStage(value: string | null | undefined): value is CspLifecycleStage {
  return value === "build" || value === "pre-release" || value === "release";
}

export function resolveCspMode(options: {
  envMode?: CspMode;
  lifecycleStage?: CspLifecycleStage;
  requestOverrideMode?: string | null;
}): CspMode {
  const { envMode, lifecycleStage = "build", requestOverrideMode } = options;

  if (isCspMode(envMode)) {
    return envMode;
  }

  if (isCspMode(requestOverrideMode)) {
    return requestOverrideMode;
  }

  if (lifecycleStage === "release") {
    return "enforce";
  }

  if (lifecycleStage === "pre-release") {
    return "dual";
  }

  return "report-only";
}

function resolveMode(request: NextRequest): CspMode {
  const headerStage = request.headers.get("x-csp-lifecycle-stage");
  const lifecycleStage = isLifecycleStage(headerStage)
    ? headerStage
    : isLifecycleStage(ENV_CSP_LIFECYCLE_STAGE)
      ? ENV_CSP_LIFECYCLE_STAGE
      : "build";

  return resolveCspMode({
    envMode: ENV_CSP_MODE,
    lifecycleStage,
    requestOverrideMode: request.headers.get("x-csp-mode"),
  });
}

export function applySecurityHeaders(request: NextRequest): NextResponse {
  const nonce = createNonce();
  const mode = resolveMode(request);

  const { cspHeader, cspReportOnlyHeader, additionalHeaders } = buildSecurityHeaders({
    nonce,
    allowUnsafeInlineScripts: ALLOW_INLINE_DEBUG,
    allowUnsafeEval: ALLOW_EVAL_DEBUG,
    disableUpgradeInsecureRequests: DISABLE_UPGRADE_INSECURE,
    reportUri: CSP_REPORT_URI,
    mode,
    environment: process.env.NODE_ENV === "production" ? "production" : "development",
  });

  const requestHeaders = new Headers(request.headers);
  requestHeaders.set(CSP_NONCE_HEADER, nonce);

  const response = NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  });

  if (cspHeader) {
    response.headers.set(cspHeader.key, cspHeader.value);
  }
  if (cspReportOnlyHeader) {
    response.headers.set(cspReportOnlyHeader.key, cspReportOnlyHeader.value);
  }
  for (const header of additionalHeaders) {
    response.headers.set(header.key, header.value);
  }

  response.headers.set(CSP_NONCE_HEADER, nonce);
  response.headers.set("x-csp-active-mode", mode);

  return response;
}

export function getCspNonce(): string | undefined {
  try {
    return nextHeaders().get(CSP_NONCE_HEADER) ?? undefined;
  } catch {
    return undefined;
  }
}
