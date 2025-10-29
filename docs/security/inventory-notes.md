# Security Inventory Notes – October 27, 2025

## Next.js Configuration Audit
- `next.config.ts` embeds placeholder secrets inside the public env block (`NEXT_PUBLIC_TURNSTILE_SITE_KEY`, `RESEND_API_KEY`, etc.). We must relocate production secrets to deployment-time environment variables before enforcing new headers.
- Current CSP builder ships `'unsafe-inline'` and `'unsafe-eval'` for `script-src` plus `'unsafe-inline'` for `style-src`; tightening this is a primary mitigation task for the header spec.
- `frame-src` already restricts to self + YouTube/YouTube-nocookie; new embeds must be added explicitly to avoid CSP violations.
- Remote image allow-list limited to `images.unsplash.com` and DigitalOcean Spaces—aligns with inventory output.
- Security headers run only in production; report-only rollout will need `headers()` update to inject `Content-Security-Policy-Report-Only` for staging/preview.

## Tailwind & Build Tooling
- `tailwind.config.ts` only references local content paths and plugin modules; no dynamic imports or remote fetches detected.
- Typography plugin overrides rely on CSS variables—no inline script implications.

## MDX Pipeline Review
- MDX sanitation schema extends `rehype-sanitize` with `iframe`, `section`, `div`, etc., but still leverages attribute allow-lists. Need to compare with planned `mdx-sanitize-spec` to ensure we keep className gating while blocking inline event handlers.
- Custom transformer `rehypeMdxJsxToElements` rewrites lowercase JSX to HTML elements; it ignores upper-case component imports, limiting risk of arbitrary React execution.

## Risk Flags Requiring Follow-up
- `dangerouslySetInnerHTML` appears in structured data injections (`src/app/page.tsx`, blog/tutorial detail pages) and `src/components/ui/chart.tsx`. CSP nonce strategy plus explicit sanitation review needed before enforcement.
- Multiple external video embeds (`www.youtube.com`, `www.youtube-nocookie.com`) and analytics-like share links (`twitter.com`, `www.linkedin.com`) surfaced in inventory; they must be represented in the header spec allow-list.
- Contact form Turnstile verification fetches `https://challenges.cloudflare.com`; ensure `connect-src` includes this domain once CSP tightens.

## Next Steps
- Use `docs/security/inventory.json` as the authoritative list for CSP drafts and threat modeling inputs.
- Begin drafting `docs/security/headers-spec.md` and `docs/security/mdx-sanitize-spec.md`, referencing the above findings.
