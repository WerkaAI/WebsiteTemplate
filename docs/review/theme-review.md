# Theme Review Plan

## 1. Scope & Preconditions
- Confirm current build (commit/tag, browser versions, viewport sizes).
- Capture baseline screenshots for light and dark themes.

## 2. Global UI Elements
- Typography: verify font family, weights, sizes, contrast (WCAG AA), focus states.
- Color palette: compare token usage against design system; note light-theme deviations.
- Spacing & alignment: check layout grid, padding/margin consistency.
- Iconography & illustrations: ensure accessibility (alt text, contrast).

## 3. Navigation & Header
- Background/foreground contrast in light theme.
- Active/hover states for menu items.
- Responsiveness for tablet/mobile breakpoints.

## 4. Hero & Primary CTA Sections
- Heading legibility on gradient backgrounds.
- CTA button colors, hover/focus states, shadow intensity.
- Media elements (video play button) sizing and alignment.

## 5. Pricing Cards
- Light theme contrast for text vs. background (e.g., badges, “Bezcen​ny” tier).
- Badge and highlight treatments; ensure white text where required.
- Card padding, border-radius, shadow consistency.

## 6. Feature Lists & Icons
- Bullet icon visibility on light backgrounds.
- Text hierarchy (titles vs. descriptions).
- Checklists for legal/compliance copy clarity.

## 7. Footer & Secondary Sections
- Link visibility in light theme.
- Subscription/contact forms inputs and validation states.
- Legal copy (terms, privacy) readability.

## 8. Accessibility & Interaction
- Keyboard navigation audit.
- ARIA roles/labels for interactive components.
- Reduced motion and high-contrast mode compatibility.

## 9. Performance & Implementation Notes
- Verify theme switcher behavior, stored state.
- Audit CSS variables/tokens for light-theme overrides.
- Identify redundant or conflicting styles.

## 10. Deliverables
- Annotated screenshot deck with issues.
- Prioritized issue list (critical, major, minor).
- Suggested fixes referencing design tokens/variables.
- Retest checklist after remediation.

## Audit summary (15.10.2025)
- Target surface: light theme activated via `ThemeToggle` in the marketing landing (`src/app/page.tsx`). Tested against the current Tailwind tokens defined in `src/app/globals.css` and component overrides.
- Baseline checks: typography tokens resolve to Inter/var(--font-sans); focus rings inherit `--ring` and appear on buttons, links, and form inputs; spacing and grid utilities align with Tailwind defaults.
- Positive call-outs: navigation maintains contrast on light backgrounds, CTA buttons reuse `primary` tokens, animations respect `prefers-reduced-motion` via `usePrefersReducedMotion` and `InteractionLayer` fallbacks.

## Issue log (light theme)

| Severity | Area | Issue & Evidence | Suggested fix |
| --- | --- | --- | --- |
| **Critical** | Calculator “Spokój ducha” metric | `.metric-card--peace` forces `color: rgb(240,253,244)` on a light emerald/blue gradient (see `globals.css` ~L887-914). In light theme this yields ~1.6:1 contrast for headings, body copy, and the white badge pill (`bg-white/20 text-white`), matching the attached screenshot where the card washes out. | Switch text to `var(--foreground)`/`text-foreground` and reserve white text for the dark theme. Alternatively deepen the gradient (`rgba(...,0.35+)`) and set the badge background to `bg-primary/15` with `text-primary`.
| **Major** | Calculator metric labels | `.metric-card__label` uses `rgba(30,64,175,0.7)` on a translucent white card (`rgba(250,250,255,0.9)`), producing ~4.0:1 contrast (< WCAG AA). | Replace with `text-muted-foreground` or a dedicated `--metric-label` token mapped to `#313847` in light mode, retaining the current blue hue only in dark mode.
| **Major** | Hero highlights carousel controls | In `hero-section.tsx` the pagination dots default to `bg-emerald-400/20` with no border, so inactive states are barely visible on the hero gradient. Focus rings also overflow because the hit target is only 6px high. | Increase idle opacity (`bg-emerald-400/50`) and add a 1px outline (`border border-emerald-500/30`). Expand the tappable area via padding/`min-w-[12px]` to preserve the visible focus halo.
| **Major** | Theme preference compliance | `Providers` set `defaultTheme="dark"` with `enableSystem={false}`, disregarding user OS preferences—a11y failure for users who request light mode. | Change to `defaultTheme="system"`, keep `enableSystem`, and persist the last explicit choice so light-theme fixes surface by default for light-preferring users.
| **Minor** | Hero trust strip & other frosted cards | Several surfaces (`hero` trust strip, pricing comparison halo) rely on `border-white/30` and `bg-white/15`. On the very light hero gradient the cards lose edge definition and appear low-contrast. | Swap to semantic tokens: e.g., `border-border` and `bg-white/60` (or `bg-card`) in light mode, keeping the frosted treatment only for dark theme via `.dark` overrides.
| **Minor** | Footer CTA secondary button | The “Umów prezentację” CTA uses `border-white/20 text-white` on `bg-primary`. On hover it only increases background opacity, so the border remains nearly invisible. | Use `border-primary-foreground/60` (pure white) or convert the control to an outline button (`variant="outline"` with `text-primary` and `bg-white`).

Severity legend: Critical = blocks readability/compliance, Major = noticeable UX/a11y regression, Minor = polish/clarity issue.

## Suggested fixes by token/component
- **Metric cards**: update light-theme token mapping for `.metric-card--peace` to reuse `--foreground` / `--muted-foreground`, and raise gradient alpha (≥0.35) for `metric-card--peace` to sustain contrast.
- **Metric labels**: define `--metric-label` in `:root` as `#313847` and override `.dark` with the current blue tone to keep brand flavor without hurting contrast.
- **Hero carousel dots**: move styles into Tailwind utilities (`bg-emerald-400/50 border border-emerald-500/30 rounded-full h-2 w-6`) and wrap each dot in a flex container with `p-1` to enlarge the focus target.
- **Theme provider**: in `Providers`, set `defaultTheme="system"` and `enableSystem` to `true`. Consider storing the resolved theme in analytics once per session to verify uptake.
- **Frosted cards**: replace light-mode `border-white/*` usages with `border-border` and `bg-white/70` (or `bg-card`) while keeping the current translucent layering behind a `.dark` selector.
- **Footer secondary CTA**: refactor to reuse `Button` with `variant="outline"`, `className="border-primary-foreground/80 text-primary-foreground bg-transparent hover:bg-primary-foreground/10"` for clarity.

## Retest checklist (post-fix)
- Toggle between dark/light themes after updating `ThemeProvider`; confirm persisted preference and absence of flashes on initial load.
- Re-run contrast checks (use Chrome DevTools or Stark) on all metric cards, especially “Spokój ducha”, verifying ≥4.5:1 for headings, copy, and badge text in light mode.
- Validate hero carousel controls: inactive dots should be visible at 100% zoom, focus outline fully contained, and keyboard users able to tab/activate each dot.
- Inspect frosted cards (hero trust strip, pricing comparison) for adequate edge definition on a calibrated monitor; adjust opacity if they still blend into the background.
- Verify footer CTA pair in light mode: outline button border should be visible, hover/focus states must maintain ≥3:1 contrast against background.
- Smoke-test key forms (contact, newsletter) to ensure focus ring styling remains intact after color token adjustments.

## Remediation progress (15.10.2025)
- Updated `.pricing-card--featured` to override local foreground tokens, guaranteeing white body copy and supporting text on the highlighted plan in light mode while keeping dark-mode tokens intact.
- Forced the demo preview headline (“Od chaosu do kontroli w 15 minut”) to `text-white` so the video teaser remains readable regardless of parent card styling.
- Restyled the “Spokój ducha” metric badge with a solid white chip and black text in light mode (`dark:` fallbacks preserved) to deliver AA contrast, and aligned the card copy with pure black text.
- Boosted the hero board label (“Obecny grafik”) to `text-white/90` for stronger readability against the emerald gradient background.
- Locked the footer CTA headline to `text-white`, making the “Odzyskaj kontrolę nad swoim czasem” message unmistakable on light backgrounds.
- Added a dark-mode override so the “Spokój ducha” metric text flips back to near-white while light mode keeps high-contrast black copy.
- Rebuilt the blog experience: removed link underlines/hover color shifts, introduced structured hero/grid/timeline components, and rewrote the opening article to read like a polished copy deck.
- Configured `ThemeProvider` with a dedicated storage key while keeping `defaultTheme="dark"` so the dark palette loads first and persists between visits.
- Extended the MDX sanitize schema to allow `div`/`section` wrappers and `className` attributes so the redesigned blog layout renders instead of being stripped out.

## Audit summary – Dark theme (15.10.2025)
- Target surface: default “dark” theme (`ThemeProvider` sets `defaultTheme="dark"`) applied across landing page sections in `src/app/page.tsx` and shared UI primitives.
- Palette review: `.dark` tokens in `globals.css` swap backgrounds to deep slate hues while keeping `--primary`/`--secondary` at low lightness values; buttons, inline links, and focus rings inherit those tints.
- Positive call-outs: hero gradient redefines to rich emerald/navy blend, testimonial carousel gains depth via `.dark` shadows, and animation hooks honour `prefers-reduced-motion` through `InteractionLayer` fallbacks.

## Issue log (dark theme)

| Severity | Area | Issue & Evidence | Suggested fix |
| --- | --- | --- | --- |
| **Critical** | Brand primary usage | `.dark` tokens keep `--primary: hsl(145 100% 25%)` (see `globals.css` ~L36-70). On the dark background (`--background` ≈ #0c1a13) this yields ~2.5:1 contrast, so every `text-primary`/`bg-primary` element (hero CTA, inline links, footer CTA) blends into the page. | Lighten the dark-theme primary token (≥50% lightness or use tailwind emerald-400) and adjust `--primary-foreground` accordingly; update CTA classes if needed to retain hover states. |
| **Major** | Secondary accent icons | Feature cards (`solution-section.tsx` lines 148-179) and contact info rows rely on `text-secondary`, which maps to the same dark green (`hsl(123 47% 35%)`). Icons lose contrast against `dark:bg-slate-900/70` cards. | Introduce a dedicated `--secondary-dark` (e.g. emerald-300) for `.dark`, or override icon classes to `text-emerald-300`/`text-emerald-200` when `dark` is active. |
| **Major** | Focus outlines | Global focus styling (`globals.css` @layer base) uses `ring-ring`, but `--ring` inherits the dark primary tone. On dark surfaces the 2px outline is <3:1 contrast, making keyboard focus hard to locate. | Brighten `--ring` in `.dark` (emerald-300 or even white with 0.7 alpha) and consider increasing offset to 3px for primary CTAs. |
| **Minor** | Navigation chrome | At the top of the page the nav bar renders `dark:bg-slate-900/80` with `border-transparent` (`navigation.tsx` lines 92-102), nearly matching the hero gradient. The header disappears until scroll. | Add a subtle border/token (e.g. `border-white/10`) and/or apply a gradient overlay so the bar is distinguishable even at scroll position 0. |
| **Minor** | Pricing standard card depth | `.dark .pricing-card--standard` (`globals.css` ~L638-648) uses `background: rgba(15,23,42,0.75)` over a `bg-muted` section, so card edges blur. | Increase contrast via lighter card fill (`rgba(30,41,59,0.9)`), a brighter border token, or a soft outline shadow in dark mode. |

Severity legend: Critical = blocks readability/compliance, Major = noticeable UX/a11y regression, Minor = polish/clarity issue.

## Suggested fixes by token/component (dark)
- **Primary token**: redefine `--primary` in the `.dark` scope to an emerald-300/400 tint (≈hsl(146 64% 48%)) and bump `--primary-foreground` to near-black for bright buttons. Update `cta-glow` gradient to match the lighter shade.
- **Secondary accents**: add `--secondary`/`--secondary-foreground` overrides so icons and checklist bullets land around emerald-250–300. Optionally expose a `text-accent-emerald` utility for iconography.
- **Focus styling**: set `--ring` to a high-luminance mint (`rgba(165, 243, 252, 0.9)`) and widen the focus offset on key components (`button`, `Link`, form controls) to create a clear halo in dark mode.
- **Navigation background**: provide a dedicated dark-header token (e.g., `--header-bg`) or extend the class list with `border-white/10 shadow-[0_12px_35px_-18px_rgba(15,23,42,0.65)]` when `!isScrolled` to define the silhouette.
- **Pricing card**: tweak `.pricing-card--standard`’s dark fill to `bg-slate-800/90` with `border-white/18` and optionally add a translucent inner border for structure.

## Retest checklist – Dark theme
- After adjusting tokens, re-run Stark/DevTools contrast tests on `text-primary`, hero CTA background, and inline links to confirm ≥4.5:1 against `--background`.
- Tab through the page with `prefers-color-scheme: dark` enabled; ensure the new focus ring has ≥3:1 contrast and remains visible on frosted surfaces (hero trust strip, pricing cards, footer CTA buttons).
- Confirm feature-card icons and contact info glyphs remain legible at 100% zoom with the brighter secondary tint.
- Reload the landing page from the top: the navigation bar should be distinguishable against the hero gradient before scrolling.
- Check pricing cards in dark mode for sufficient separation (card background vs section background); adjust border/shadow strength if they still merge.