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
- **Responsive DOM snapshots**: use `npm run dev -- --turbo` in controlled session to gather HTML dumps via `node scripts/capture-dom.mjs` (to be created if missing). Script should visit routes with `puppeteer`, set viewport sizes, and save sanitized HTML/CSS extracts for Codex analysis.
- **CSS token extraction**: run static analysis with a custom script (`scripts/dump-tailwind-theme.mjs`) to list typography, spacing, color, and radius tokens for quick comparison.
- **Component mapping**: leverage `ts-node` or `tsx` to parse `src/components` and produce a list of props/responsive classes (e.g., using `@typescript-eslint/typescript-estree`).
- **Accessibility linting**: execute `npx @axe-core/cli http://localhost:3000 --viewport-width 360 --viewport-height 740` for baseline issues; Codex reviews the results.

## Review Workflow
1. **Preparation**
  - Ensure dependencies installed (`npm install`).
  - Run Tailwind build once (`npm run build:css` if available) to catch compilation errors.
  - Generate latest DOM and token dumps using the scripts above; store outputs under `docs/review/artifacts/mobile/`.
2. **Blueprint Pass (Architectural Priming)**
  - Draft or refresh the route blueprint synopsis; include layout intent, hierarchy, and Calm Control cues.
  - Validate blueprint against design references; adjust until stakeholders agree this is the structural source of truth.
3. **Heuristic Pass (Automated Support)**
  - Feed Codex the blueprint, DOM snapshot, and token list for each route.
  - Prompt Codex to flag layout anomalies, overflow risks, inconsistent spacing, and missing interactive affordances while honoring declared constraints.
4. **Focused Manual Pass (Stylistic Injection)**
  - Use browser dev tools in responsive mode; document observations textually (element selector, issue, rationale, suggested fix) referencing Calm Control vocabulary.
  - Cross-check against blueprint and vibe principles (balance, contrast, mindful motion, clarity of CTA hierarchy).
5. **Constraint Validation**
  - Confirm Codex recommendations obey performance, accessibility, and interaction budgets; reject or revise suggestions that breach constraints.
6. **Accessibility & Performance Checks**
  - Run `npm run lint` and `npm run test -- --runInBand` to ensure regressions are not introduced by recommended fixes.
  - Evaluate `axe` results, Lighthouse mobile metrics (run via `npx lighthouse http://localhost:3000 --preset perf --only-categories=accessibility,performance --screenEmulation.mobile true`).
7. **Synthesis**
  - Aggregate all findings into a structured table: route, issue, severity, recommendation, reference token, violated constraint.
  - Prioritize by severity (blocking, high, medium, polish) and tag owners (component author, content, tooling).
8. **Action Planning (Conceptual Scaffolding)**
  - Create follow-up tasks or PR checklist items referencing the relevant files and tokens.
  - Draft Codex-ready prompts for each high-priority issue (see templates below) describing which existing component patterns to replicate.

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
- Draft the DOM capture and token extraction scripts if they do not exist yet.
- Create initial blueprint synopses for high-priority routes and store them alongside DOM/token artifacts.
- Schedule Codex-assisted sessions per route, attaching blueprint, DOM, token, and constraint briefs.
- Prepare template for documenting findings in CSV/MDX to maintain consistency across reviews.
