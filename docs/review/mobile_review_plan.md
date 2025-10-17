# Mobile UI Review Plan

Operationalizes the mobile evaluation using GPT-5 Codex with the Vibe Coding methodology so every finding flows from a shared blueprint, expresses the Calm Control ethos, and can be executed programmatically without screenshots.

## Objectives
- Validate that the mobile experience delivers the intended Calm Control brand attributes while remaining task-focused.
- Catch layout, typography, navigation, and interaction defects before launch without relying on bitmap screenshots.
- Produce structured findings that GPT-5-Codex can transform into coded fixes via the GPT-5 Vibe Coding lexicon (architectural priming, stylistic injection, constraint layering, conceptual scaffolding).

## Scope
- Viewports: primary 360×740, secondary 414×896 and 768×1024 (portrait first, then landscape spot-checks).
- Surfaces: landing page (`src/app/page.tsx`), blog listing (`src/app/blog/page.tsx`), sample blog post (`content/blog/2025-08-21-witaj-autozaba.mdx`), contact flow (`src/app/kontakt/page.tsx`), and any reusable components rendered within these screens.
- Theming: typography scale, spacing rhythm, color tokens, shadows, and interactive states defined in `tailwind.config.ts` and `src/app/globals.css`.

## Vibe Coding Anchors
- **Architectural Priming**: frame each prompt with structural intent (e.g., "Calm Control mobile shell follows two-stack layout"), referencing layout primitives in `src/app/layout.tsx` before diagnosing implementation gaps.
- **Stylistic Injection**: remind GPT-5 Codex of Calm Control tone (measured, optimistic, high-contrast minimalism) and cite Tailwind tokens to steer typography, spacing, and motion.
- **Constraint Layering**: declare non-negotiables—no horizontal scroll, tap targets ≥48px, WCAG AA contrast, Lighthouse mobile score ≥90—to bound Codex recommendations.
- **Conceptual Scaffolding**: when proposing fixes, anchor to existing component patterns (e.g., "mirror `Hero` responsive logic from `src/components/hero.tsx`") so Codex reuses proven blueprints.

## Constraints & Assumptions
- No visual screenshots; rely on DOM structure, computed styles, and Tailwind classes extracted via instrumentation.
- GPT-5-Codex has direct repository access and can run Node scripts but should avoid long-lived dev servers unless necessary.
- Mobile parity with desktop is not required; we focus on mobile-first correctness and clarity.
- All Codex prompts reference an approved blueprint summary (see Review Workflow) before requesting code changes.

## Inputs & References
- Design intent: `docs/visual-refresh-plan.md`, `attached_assets/Marketing_SSOT_1756378934444.md`, `attached_assets/General-Principles-of-the-Calm-Control-Theme-Vibe-Emotional-Arc-Reception--1756381593845_1756381593846.txt`.
- Component inventory: `src/components`, `src/app/layout.tsx` for global chrome, `mdx-components.tsx` for rich content.
- Breakpoint logic: `tailwind.config.ts` (`theme.screens`) and any `@media` rules inside `globals.css`.
- Interaction scripts: `src/hooks`, `src/lib`, and API routes affecting client behaviour.
- Vibe coding primer: `c:\AI\0_Ainything\5_Klienci\BetterCallPaul\KursRepo\AI_Guides\[GUIDE]GPT-5 Vibe Coding.md` (sections 1–2).

## Tooling Strategy (GPT-5-Codex)
- **Blueprint synopsis**: author a concise architectural brief per route (layout zones, priority content, critical interactions) stored in `docs/review/artifacts/mobile/<route>-blueprint.md`; this becomes the priming artifact for every Codex session.
- **Responsive DOM snapshots**: run `node scripts/capture-dom.mjs` to gather HTML dumps. The script will auto-start a local Next dev server if the target `REVIEW_BASE_URL` (default `http://localhost:3000`) is unavailable; override host/port via env vars and set `REVIEW_AUTO_START=0` to opt out. Each pass visits scoped routes with Puppeteer, enforces preset mobile viewports, and stores sanitized HTML in `docs/review/artifacts/mobile/dom/`.
- **CSS token extraction**: run static analysis with `npx tsx scripts/dump-tailwind-theme.ts` to list typography, spacing, color, and radius tokens for quick comparison.
- **Component mapping**: leverage `npx tsx scripts/map-components.ts` to parse `src/components` and produce a list of props/responsive classes pulled from `className` and `data-testid` attributes.
- **Accessibility linting**: run `node scripts/run-axe.mjs` (honours `REVIEW_BASE_URL`, auto-starts the dev server, and saves JSON reports under `docs/review/artifacts/mobile/axe/`). The script wraps `@axe-core/cli` with the default 360×740 viewport and exits non-zero when violations are detected so Codex can triage.

## Status Overview (2025-10-17)
- ✅ DOM snapshots current for 360×740, 414×896, and 768×1024 viewports (`docs/review/artifacts/mobile/dom/*`).
- ✅ Route blueprints published for home, blog index, blog post, and contact flows (`docs/review/artifacts/mobile/*-blueprint.md`).
- ✅ Component inventory extracted (`docs/review/artifacts/mobile/component-map.json`) and Tailwind tokens captured (`docs/review/artifacts/mobile/tokens.json`).
- ✅ Latest accessibility sweep via `scripts/run-axe.mjs` returns zero violations across audited routes (`docs/review/artifacts/mobile/axe/`).
- ✅ Findings tracker updated to show resolved accessibility defects (`docs/review/mobile-findings.csv`).
- ✅ Lighthouse mobile performance audit captured from the post-fix production build (performance 0.83; FCP 2.0 s, LCP 3.8 s, TBT 0 ms) with reports in `docs/review/artifacts/mobile/lighthouse-mobile-2025-10-18-report.report.{html,json}`.
- ⏳ Stakeholder sign-off package (memo + recommended PR tasks) still to assemble.

## Review Workflow
1. **Preparation — Complete**
  - Dependencies validated, build scripts green, DOM and token dumps captured in `docs/review/artifacts/mobile/`.
2. **Blueprint Pass (Architectural Priming) — Complete**
  - Route synopses refreshed and aligned to Calm Control intent (`*-blueprint.md`).
3. **Heuristic Pass (Automated Support) — Complete**
  - Codex runs consumed blueprint + DOM + tokens; anomalies triaged into findings, now resolved.
4. **Focused Manual Pass (Stylistic Injection) — Complete**
  - Manual audit notes distilled in `docs/review/artifacts/mobile/home-audit-2025-10-16.md` and fed into fixes.
5. **Constraint Validation — Complete**
  - Verified no regression against accessibility/performance budgets during remediation.
6. **Accessibility & Performance Checks — Complete**
  - `node scripts/run-axe.mjs` captured zero-violation reports.
  - Production Lighthouse mobile snapshot refreshed post-optimizations (`docs/review/artifacts/mobile/lighthouse-mobile-2025-10-18-report.report.*`, performance 83) with supporting JSON/HTML artifacts.
7. **Synthesis — Complete**
  - Findings tracked in `docs/review/mobile-findings.csv` with resolved statuses.
8. **Action Planning (Conceptual Scaffolding) — In Progress**
  - Draft stakeholder summary and follow-up task list to unblock sign-off.

## Vibe Coding Session Cadence
- **Phase 1: Blueprint validation** — establish or refresh the architectural brief and confirm constraints.
- **Phase 2: Diagnostic dialogue** — alternate between layout audits and component deep-dives, always citing blueprint + tokens.
- **Phase 3: Fix briefing** — craft implementation briefs that Codex can convert into patches; include constraint checks.
- **Phase 4: Verification loop** — after applying fixes, rerun audits and automated checks to ensure constraints remain satisfied.

## Evaluation Heuristics
- **Layout integrity**: no horizontal scroll, consistent padding, responsive grids degrade gracefully, key content above-the-fold.
- **Typography**: optimal line length (~45–75 characters), adequate contrast, consistent heading hierarchy, readable body text.
- **Navigation & CTAs**: tappable targets ≥48px, persistent access to primary actions, clear feedback states.
- **Content density**: maintain breathing room per Calm Control ethos; avoid clutter on devices <400px wide.
- **Imagery & media**: responsive images, no layout shifts, fallback states for slow networks.
- **Micro-interactions**: transitions ≤200ms, no obstructive animations, keyboard and screen-reader accessibility preserved.

## Prompt Templates for GPT-5-Codex
- **Blueprint refresher (Architectural Priming)**
  ```
  Act as a Calm Control design architect. Update the mobile blueprint for <route> using the attached references:
  - Layout intent: <summary>
  - Priority content blocks: <list>
  - Interaction goals: <list>
  Confirm that the structure remains feasible at 360×740 and note any prerequisites before implementation prompts.
  ```
- **Layout audit (Constraint Layering)**
  ```
  You are auditing the mobile layout for <route>. Inputs: blueprint.md, dom.html, tokens.json.
  Enforce the following constraints: no horizontal scroll, tap targets ≥48px, WCAG AA contrast, Lighthouse mobile ≥90.
  Report:
  1. Structural issues (overflow, stacking order, alignment) with selectors and files.
  2. Spacing or typography inconsistencies relative to Calm Control tokens.
  3. Accessibility gaps (aria, focus states, semantic roles).
  Provide prioritized recommendations grounded in existing components.
  ```
- **Component deep-dive (Conceptual Scaffolding)**
  ```
  Inspect component <ComponentName> in <path>. Compare its responsive behaviour to the blueprint and reuse patterns from <reference component/path>. Identify risks at 360px width, propose Tailwind class adjustments, and outline follow-up tests (unit + visual).
  ```
- **Token alignment (Stylistic Injection)**
  ```
  Using tokens.json and Calm Control tone guidelines, evaluate <route> for palette and spacing drift. Highlight mismatches, cite selectors, and recommend replacements that keep copy legibility and rhythm intact.
  ```
- **Fix execution brief**
  ```
  Prepare an implementation brief for issue <id>. Include:
  - Goal and constraints from the blueprint.
  - Files and components to touch.
  - Expected Tailwind tokens and interaction states.
  - Tests to run post-change.
  This brief will be fed to GPT-5 Codex to generate the patch.
  ```

## Reporting & Deliverables
- Findings matrix stored in `docs/review/mobile-findings.csv`.
- Follow-up issue list or PR backlog with Codex-ready prompts.
- Summary memo for stakeholders highlighting user-impact, effort estimates, and proposed release sequencing.

## Timeline & Roles
- **Day 0**: Preparation scripts, environment validation.
- **Day 1**: Automated heuristic pass per route with Codex.
- **Day 2**: Manual verification, accessibility/performance checks, synthesis.
- **Day 3**: Stakeholder review, finalize action items, handoff to implementation.
- Primary owner: Senior UI designer (you). Support: frontend engineer, accessibility specialist.

## Risks & Mitigations
- **Incomplete DOM data**: ensure scripts wait for dynamic content or use `page.waitForNetworkIdle()` to capture final state.
- **Token drift**: if Tailwind config changes mid-review, regenerate extracts before sign-off.
- **Tooling noise**: triage automated reports; focus on user-facing issues to avoid audit fatigue.

## Next Steps
- Compile stakeholder-ready memo summarizing remediation outcomes, residual risks, and recommended follow-up work.
- Translate remaining action-planning items into PR checklists or tickets aligned with Calm Control blueprints.
