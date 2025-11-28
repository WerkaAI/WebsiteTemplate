# Mobile Audit Findings

**Date:** 2025-11-28
**Device:** Mobile Viewport (375x667 - iPhone SE equivalent)

## 1. Global Issues
- **Typography:** `h1` headings on some pages (e.g., Blog Post) are too large, causing excessive wrapping (4+ lines).
- **Spacing:** Vertical rhythm is generally good, but some sections feel tight (Hero text padding) or too loose (Search bar to content gap).
- **Touch Targets:** Most buttons are full-width, which is good. Need to verify specific link targets in the footer.

## 2. Page-Specific Findings

### Homepage
- **Hero Section:** Text padding on the sides is tight. "Twój Cyfrowy Pomocnik..." feels cramped against the screen edges.
- **Features:** Card internal padding could be increased slightly for a more "premium" feel.
- **Footer:** Link list is very long. Consider an accordion layout or better grouping for mobile to reduce scrolling.

### Blog
- **Index:** Post cards look good. Images are full-width.
- **Post Detail:**
    - **Title:** The `h1` is massive. Needs scaling down for mobile (e.g., `text-3xl` instead of `text-5xl`).
    - **Readability:** Line height is good.
    - **Images:** Ensure all images inside posts have `max-width: 100%` and `height: auto`.

### Tutorials
- **Index:**
    - **Search/Filter:** Gap between search/filter and the first card is inconsistent.
    - **Cards:** Layout is solid.

### Contact
- **Form:**
    - **Inputs:** Check input height. Should be at least 44px for easy tapping.
    - **Spacing:** Ensure enough space between the last input and the "Send" button.

## 3. Technical Observations
- **Hamburger Menu:** Icon size looks standard but could be slightly larger for easier access.
- **Performance:** (To be verified with Lighthouse) Images loaded fast, but need to ensure `sizes` prop is used to avoid downloading desktop images on mobile.

## 4. Action Items for Phase 2 (Global UI/UX)
1.  **Fix Typography:** Create a mobile type scale in `globals.css` or `tailwind.config.ts`.
2.  **Adjust Spacing:** Standardize container padding (e.g., `px-4` vs `px-6`).
3.  **Refine Header:** Optimize Hamburger menu size and animation.
