# Mobile Calm Control Follow-up Checklist

## Performance Optimization PR
- [ ] Baseline hero LCP audit and capture flamechart excerpt (reference `docs/review/artifacts/mobile/lighthouse-mobile-2025-10-17.report.html`).
- [ ] Refactor hero illustration delivery to use optimized WebP/AVIF assets and explicit `sizes` hints mirroring `src/components/hero-section.tsx` layout logic.
- [ ] Defer or split non-critical scripts flagged under Lighthouse "Reduce unused JavaScript" (see `docs/review/artifacts/mobile/component-map.json` for dependency owners).
- [ ] Verify updated build with `npm run build` and rerun Lighthouse (`npx lighthouse http://localhost:3001 --preset=perf --only-categories=accessibility,performance --screenEmulation.mobile true --form-factor=mobile`) targeting Performance ≥90.

## QA Verification PR
- [ ] Execute manual Calm Control touch QA (navigation drawer, primary CTA tap targets, form focus handling) and log outcomes in `docs/review/mobile-findings.csv`.
- [ ] Re-run `node scripts/run-axe.mjs` to confirm no regressions.
- [ ] Attach before/after DOM snapshots to PR description (use `node scripts/capture-dom.mjs` with 360 × 740 viewport).

## Release Coordination
- [ ] Attach `docs/review/mobile-stakeholder-memo-2025-10-17.md` to stakeholder thread and document approvals.
- [ ] Backfill CI job to archive Lighthouse JSON/HTML artifacts per release candidate.
- [ ] Schedule Calm Control launch readiness review once performance target met.
