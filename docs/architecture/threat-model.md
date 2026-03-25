# AutoŻaba Marketing – Threat Modeling Canvas

_Updated: 2025-10-27_

## Context
- Surface: marketing site hosted on Next.js (app router) with static generation, MDX-driven blog/tutorial content, and call-to-action redirects to `app.autozaba.pl`.
- Assets: static pages, MDX articles, tutorial videos, contact form hitting API route with Cloudflare Turnstile verification.
- Trust boundaries: user browsers ↔ Vercel edge/runtime ↔ internal APIs (`/api/contact`), plus external services (Turnstile, YouTube, Unsplash CDN).

## Risk Ratings
| Threat ID | Category | Entry Vector | Likelihood | Impact | Proposed Control |
| --- | --- | --- | --- | --- | --- |
| T1 | Content Injection (ASVS V5) | Authorable MDX content or front matter includes unsafe HTML/JS | Medium | High (XSS/CSP bypass) | Strengthen `rehype-sanitize` policy, forbid inline event handlers, enforce CSP nonce policy, add preview pipeline linting |
| T2 | Structured Data Injection | `dangerouslySetInnerHTML` for JSON-LD scripts | Low | Medium | Wrap JSON serialization in isolated utility that enforces safe characters and CSP nonce tagging |
| T3 | Third-Party Embed Drift | YouTube iframes, share URLs introduce new domains | Medium | Medium | Centralize embed allow-list, monitor CSP reports, require spec update before adding new embeds |
| T4 | Clickjacking | Lack of frame protections on marketing pages | Low | Medium | Maintain `X-Frame-Options: SAMEORIGIN` and equivalent CSP `frame-ancestors` enforcement |
| T5 | Asset Integrity | Remote images hosted on Unsplash/DigitalOcean CDN | Medium | Low | Prefer locally hosted marketing assets; when remote needed, restrict `img-src` to curated list, monitor for mixed-content |
| T6 | API Abuse | `/api/contact` accepts user-supplied payloads | Low | Medium | Continue server-side validation (zod), rate limiting (future), ensure Turnstile enforced before submission |
| T7 | Supply Chain | npm dependency compromise, rehype/remark plugins | Low | High | Schedule `npm audit` checks during quarterly review, pin critical plugins, run CI SCA (GitHub Dependabot) |
| T8 | Redirect Leakage | CTAs redirect to `app.autozaba.pl` with potential query params | Low | Medium | Sanitize outbound URLs, avoid reflecting attacker-controlled query strings |
| T9 | CSP Misconfiguration | Current policy allows `'unsafe-inline'/'unsafe-eval'` | High | High | Draft strict CSP with nonce/hashes, roll out via report-only with monitoring |
| T10 | Observability Gaps | No existing alerting on CSP violations or contact form abuse | Medium | Medium | Implement report collector endpoint/service, integrate with monitoring dashboard |

## Accepted Risks
- Remote media hosted on Unsplash remains until in-house imagery pipeline is ready (tracked as backlog item). Residual risk accepted with quarterly review.
- Social share links to Twitter/LinkedIn remain exposed; mitigated by limiting to outbound GET navigation only.

## Open Questions
1. Confirm hosting provider (assumed Vercel) supports per-route header overrides needed for CSP nonce injection.
2. Determine whether marketing site and `app.autozaba.pl` share cookies; if yes, validate `SameSite` and scope to prevent leakage.
3. Identify owner for incoming CSP violation triage (marketing vs. engineering).

## Next Actions
- Feed `T1`, `T2`, `T3`, and `T9` directly into `docs/security/headers-spec.md` and `mdx-sanitize-spec.md` drafting.
- Schedule `npm audit` run and document outcome alongside future dependency remediation backlog.
- Design telemetry plan (CSP report endpoint or third-party service) before enforcement switch.
