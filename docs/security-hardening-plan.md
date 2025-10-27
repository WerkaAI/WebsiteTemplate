# GPT-5 Codex Security Hardening Blueprint

## Intent Signature
- Objective: orchestrate a lightweight yet robust security posture for the marketing surface while keeping handoff to `app.<domain>` frictionless.
- Scope: statically generated Next.js pages, MDX content pipeline, shared components, and platform headers delivered via Vercel (confirm if different).
- Success Vibe: defense-in-depth that feels deliberate, observable, and easy to extend during future vibe-coding sessions.

## Architectural Priming
- Treat security controls as a modular layer that mirrors existing site architecture: `next.config.mjs` for platform headers, middleware for edge logic, `src/lib` for reusable policies.
- Reuse blueprint from existing content plans (`docs/New-pages-plan.md`) for structure and naming conventions; keep security artifacts in `docs/` for traceability.
- Require every mitigation to publish a contract (type definition, config schema, or markdown spec) before implementation so agents can propagate intent consistently.

## Constraint Layering
- Security: eliminate unaudited inline scripts, enforce CSP with nonce/hash strategy, block clickjacking, and prefer least-privilege Permissions-Policy.
- Performance: header logic must add <2 ms per request at the edge; CSP should not trigger excessive browser revalidation.
- SEO & Marketing: preserve existing metadata signals; avoid blocking analytics domains explicitly approved by stakeholders.
- Operability: configurations must support report-only rollout and easy allow-list changes via single source of truth.

## Baseline Inventory Pass
- Generate an inventory script (Node/TS) that enumerates Next.js routes, MDX imports, and third-party domains. Persist output in `docs/security/inventory.json`.
- Inspect `next.config.mjs`, `tailwind.config.ts`, and MDX plugins for dynamic HTML paths or env leaks; summarize findings in `docs/security/inventory-notes.md`.
- Flag any use of `dangerouslySetInnerHTML` or external image domains for follow-up constraints.

## Threat Modeling Canvas
- Use OWASP ASVS Lite categories tailored to static sites: content injection, asset integrity, redirection, session bleed from primary app.
- For each threat, articulate: entry vector, likelihood, impact (low/med/high), and proposed control aligned with architectural layer.
- Document accepted risks and rationale in `docs/security/threat-model.md`; agents must reference this file before diverging from plan.

## Blueprint Workflow for Controls
1. **Specification Phase (Blueprint Workflow)**
	- Draft a security header spec (`docs/security/headers-spec.md`) detailing CSP directives, fallback headers, and report URIs.
	- Define MDX sanitation contract with schema references and allowed HTML tags in `docs/security/mdx-sanitize-spec.md`.
2. **Validation Phase**
	- Human review ensures spec honors constraints; note adjustments inline using markdown callouts for future agents.
3. **Implementation Phase**
	- Reference specs explicitly in prompts when updating `next.config.mjs`, middleware, or lint rules.
	- Keep code changes scoped per spec to maintain traceability.

## Control Library (Conceptual Scaffolding)
- **Security Headers Module:** pattern-match existing Next.js header exports; add helper in `src/lib/security/headers.ts` returning typed policies.
- **CSP Nonce Utility:** create `src/lib/security/csp.ts` providing nonce generation and middleware hook; ensure compatibility with MDX runtime.
- **MDX Sanitizer:** integrate `rehype-sanitize` via configuration object stored in `src/lib/security/mdx-policy.ts`; enforce typed schema to prevent drift.
- **Lint Guardrails:** extend ESLint config with custom rule (or plugin) disallowing `dangerouslySetInnerHTML` without documented exemption.

## Verification Loop
- Unit tests: add Vitest coverage around header utility and CSP nonce generator.
- Integration tests: Playwright or custom script to fetch key routes and assert header presence + CSP compliance.
- Observability: configure CSP `report-uri` to external service or lightweight API route; log and triage violations weekly.

## Rollout Narrative
- Step 1: deploy headers in report-only mode, collect telemetry for at least 48 hours.
- Step 2: iterate allow-lists responding to real-world reports; update specs and inventory accordingly.
- Step 3: flip to enforcing CSP and X-Frame-Options once noise stabilizes.
- Step 4: capture lessons learned in `docs/security/post-rollout.md` and schedule quarterly review checkpoints.

## Deliverables Checklist
- `docs/security/*.md` specs (headers, sanitizer, threat model, post-rollout).
- Inventory outputs (`inventory.json`, `inventory-notes.md`).
- Updated Next.js configuration/code aligned with specs.
- Automated tests and monitoring hooks proving controls remain active.
- Backlog tickets for deferred or accepted risks with owner + due date.
