# Plan for New Marketing Pages

## 1. Scope Alignment
- Confirm target tone, CTAs, and brand language for `Funkcje`, `Cennik`, and `Polityka prywatności` with stakeholders.
- Gather any legal-approved copy or constraints for privacy policy and pricing disclosures.
- Acquire the final `Regulamin serwisu` PDF (or source doc) plus guidance on hosting location and update cadence.

## 2. Content Preparation
- Draft structured outlines for each page, highlighting reusable sections (hero, social proof, CTA blocks, FAQ).
- Canonical feature copy already lives in `src/data/features.ts` for the `Funkcje` page; pricing tiers (Free trial, Pierwszy sklep, Pełna automatyzacja), dodatki i FAQ opisano w module `src/data/pricing.ts` i są gotowe do ponownego użycia.
- Normalize legal content into Markdown/MDX (maintain headings/anchors) for `Polityka prywatności`.
- Translate or adapt copy to match the Polish locale used on the rest of the site.

## 3. Routing & File Structure
- `src/app/funkcje/page.tsx` implemented with full layout, metadata, and reusable data hooks.
- `src/app/cennik/page.tsx` zaimplementowana (hero, plany, dodatki, gwarancja, FAQ, CTA) i wykorzystuje dane z `src/data/pricing.ts`.
- `src/app/polityka-prywatnosci/page.tsx` dodana — wykorzystuje layout z nawigacją i stopką, eksportuje metadane oraz renderuje pełną treść dokumentu w stylu `prose`.
- Plik `public/Regulamin_Serwisu_Autozaba.pdf` dodany i podlinkowany w stopce jako zasób do pobrania.
- Ensure all new pages export metadata (title, description, OpenGraph).

## 4. Layout & Components
- Map required sections to existing components (hero, feature grid, pricing tables, accordions). Identify gaps needing new components and spec them in `docs/` before implementation.
- Feature grids, benefits, and onboarding timeline already reuse data from `src/data/features.ts`; pricing tables i FAQ korzystają teraz z `src/data/pricing.ts`, a layout `/cennik` został przeprojektowany (hero onboarding, 3 karty, moduły dodatków i CTA).
- Prepare props/data typing updates for any shared components (e.g., pricing table) under `src/types`.
- Validate Tailwind tokens support required styling; extend theme if needed in `tailwind.config.ts`.

## 5. Navigation & Cross-Linking
- Primary navigation/header i stopka linkują do `/funkcje`, `/cennik`, `/polityka-prywatnosci`; stopka zawiera teraz odnośnik do `Regulamin_Serwisu_Autozaba.pdf`, a link RODO zostanie zaktualizowany po przygotowaniu materiału.
- Add contextual CTAs across existing pages pointing to the new subpages (e.g., homepage banners linking to pricing).
- Adjust sitemap generation and robots meta if automated to ensure the new URLs are indexable.

## 6. Assets & SEO
- Generate hero/OG imagery for each page and place in `public/` (or use existing placeholder if acceptable).
- Add structured data snippets if relevant (FAQ schema for common questions, pricing schema for plans).
- Confirm localization: page slugs, metadata, and alt text in Polish.

## 7. QA & Launch Checklist
- Run visual regression or manual responsive review for desktop, tablet, mobile breakpoints.
- Execute accessibility checks using `npm run lint` and `scripts/run-axe.mjs` for key pages (lint + build already verified for `/funkcje`).
- Verify PDF download works, is cached correctly, and has an accessible link description.
- Update documentation in `docs/` and note content ownership for future revisions.
