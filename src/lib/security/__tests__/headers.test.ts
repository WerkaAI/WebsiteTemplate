import { describe, expect, it } from "vitest";

import { buildSecurityHeaders, createCspDirectives, serializeCspDirectives } from "../headers";
import { createNonce } from "../csp";

describe("CSP directive helpers", () => {
  it("injects nonce into script-src", () => {
    const directives = createCspDirectives({ nonce: "abc123" });
    const scriptSrc = directives["script-src"] ?? [];

    expect(scriptSrc).toContain("'nonce-abc123'");
  });

  it("serializes directives into header string", () => {
    const directives = createCspDirectives({ nonce: "nonce-value" });
    const policy = serializeCspDirectives(directives);

    expect(policy).toContain("script-src");
    expect(policy).toContain("'nonce-nonce-value'");
    expect(policy.split("; ")).toContain("default-src 'self'");
  });

  it("builds enforcement and report-only headers based on mode", () => {
    const enforce = buildSecurityHeaders({ nonce: "xyz", mode: "enforce" });
    expect(enforce.cspHeader?.key).toBe("Content-Security-Policy");
    expect(enforce.cspReportOnlyHeader).toBeUndefined();

    const dual = buildSecurityHeaders({ nonce: "xyz", mode: "dual" });
    expect(dual.cspHeader?.key).toBe("Content-Security-Policy");
    expect(dual.cspReportOnlyHeader?.key).toBe("Content-Security-Policy-Report-Only");
  });
});

describe("Nonce generator", () => {
  it("produces base64 strings", () => {
    const nonce = createNonce();

    expect(typeof nonce).toBe("string");
    expect(nonce.length).toBeGreaterThanOrEqual(16);
    expect(/^[A-Za-z0-9+/=]+$/.test(nonce)).toBe(true);
  });
});
