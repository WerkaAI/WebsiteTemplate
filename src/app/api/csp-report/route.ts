import { NextRequest, NextResponse } from "next/server";

export const runtime = "nodejs";

interface CspViolationPayload {
  [key: string]: unknown;
  "csp-report"?: {
    "document-uri"?: string;
    "violated-directive"?: string;
    "blocked-uri"?: string;
    "original-policy"?: string;
    [key: string]: unknown;
  };
}

function sanitizeValue(value: unknown, maxLength = 300): string {
  if (typeof value !== "string") return "";
  return value.slice(0, maxLength);
}

function extractReport(body: CspViolationPayload): Record<string, string> {
  const report = body?.["csp-report"] ?? {};

  return {
    documentUri: sanitizeValue(report["document-uri"]),
    violatedDirective: sanitizeValue(report["violated-directive"]),
    blockedUri: sanitizeValue(report["blocked-uri"]),
    originalPolicy: sanitizeValue(report["original-policy"], 600),
  };
}

export async function POST(request: NextRequest) {
  try {
    const contentType = request.headers.get("content-type") || "";
    const isJsonLike =
      contentType.includes("application/json") ||
      contentType.includes("application/csp-report");

    if (!isJsonLike) {
      return NextResponse.json({ error: "Unsupported content type" }, { status: 415 });
    }

    const body = (await request.json()) as CspViolationPayload;
    const report = extractReport(body);

    console.info("[CSP-REPORT]", {
      documentUri: report.documentUri,
      violatedDirective: report.violatedDirective,
      blockedUri: report.blockedUri,
    });

    return new NextResponse(null, { status: 204 });
  } catch (error) {
    console.warn("[CSP-REPORT] parse error", error instanceof Error ? error.message : error);
    return new NextResponse(null, { status: 204 });
  }
}
