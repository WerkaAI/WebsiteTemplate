import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { headers as nextHeaders } from "next/headers";

import { buildSecurityHeaders } from "./headers";

export const CSP_NONCE_HEADER = "x-nonce";

export type CspMode = "enforce" | "report-only" | "dual";

const STATIC_FILE_EXTENSION = /\.(?:js|mjs|css|png|jpg|jpeg|gif|svg|ico|webp|avif|txt|xml|json|map|pdf|woff2?|ttf)$/i;

const SOURCE_MODE = (process.env.CSP_MODE as CspMode | undefined) ?? "report-only";
const ALLOW_INLINE_DEBUG = process.env.CSP_ALLOW_UNSAFE_INLINE === "1" || process.env.NODE_ENV === "development";
const ALLOW_EVAL_DEBUG = process.env.CSP_ALLOW_UNSAFE_EVAL === "1";
const DISABLE_UPGRADE_INSECURE = process.env.CSP_DISABLE_UPGRADE_INSECURE_REQUESTS === "1";
const CSP_REPORT_URI = process.env.CSP_REPORT_URI?.trim() || null;
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

function resolveMode(request: NextRequest): CspMode {
  if (process.env.VERCEL_ENV === "production") {
    return SOURCE_MODE;
  }

  // Allow per-request override via header for integration tests.
  const modeOverride = request.headers.get("x-csp-mode");
  if (modeOverride === "enforce" || modeOverride === "dual" || modeOverride === "report-only") {
    return modeOverride;
  }

  return SOURCE_MODE;
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

  return response;
}

export function getCspNonce(): string | undefined {
  try {
    return nextHeaders().get(CSP_NONCE_HEADER) ?? undefined;
  } catch {
    return undefined;
  }
}
