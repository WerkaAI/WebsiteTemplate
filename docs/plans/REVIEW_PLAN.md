# Review Plan (Next.js + MDX)

## Scope
- Landing quality: UX, performance, accessibility, SEO.
- MDX pipeline and content reliability.
- Security posture and CI quality gates.

## Verified baseline
- `lint` / `typecheck` / `build` pass history documented.
- MDX hardening and sanitization flow documented.
- Security headers + CSP baseline documented.
- Final report available in [docs/review/FINAL_REPORT.md](../review/FINAL_REPORT.md).

## Checklist summary
- Inventory/routing ✅
- Quality gates ✅
- Architecture ✅
- Theming/UI ✅
- A11y ✅ (with follow-up polish)
- Performance ◐
- SEO/social ✅
- MDX pipeline ✅
- Forms validation ✅
- Data fetching/state ✅
- Security ✅
- Error/loading/not-found ✅
- Testing strategy ◐
- CI hygiene ✅
- Quick wins ✅
- Final report ✅

## Follow-up
- Lighthouse mobile+desktop refresh.
- Additional perf cuts for non-critical heavy UI.
- Keep CSP tightening aligned with ADRs.
