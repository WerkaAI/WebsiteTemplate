# Mobile Review & Optimization Master Plan

## Goal
To transform the mobile version of "AutoŻaba" into a best-in-class experience. The site must be "mobile-first" in reality, not just in name. It should be fast, intuitive, and aesthetically "premium" on small screens.

## 1. Audit & Discovery
- [ ] **Technical Audit**: Run Lighthouse Mobile on all key pages. Identify CLS, LCP, and TBT bottlenecks.
- [ ] **Visual Audit**: Review all pages on iPhone SE (small), iPhone 14 (medium), and Pixel/Samsung (large) simulations.
- [ ] **UX Audit**: Check "Thumb Zone" reachability for key actions (CTAs, Navigation).
- [ ] **Input Audit**: Verify form inputs don't trigger auto-zoom (font-size < 16px issue) and have correct keyboard types.

## 2. Strategy: "Thumb-Driven & Premium"
- **"Thumb-Friendly" Navigation**: Ensure the hamburger menu and key CTAs are easily reachable.
- **"Content Breathing Room"**: Increase whitespace for mobile to prevent clutter.
- **"Adaptive Assets"**: Serve smaller, optimized images for mobile to save bandwidth.
- **"Touch-First Interactions"**: Ensure all interactive elements have a minimum touch target of 44x44px.

## 3. Implementation Plan

### Phase 1: Global Mobile Foundation
- [ ] **Typography Tuning**: Adjust `h1`-`h6` sizes for mobile to prevent awkward wrapping. Ensure body text is readable (16px+).
- [ ] **Touch Targets**: Global CSS fix to ensure buttons and links meet accessibility standards.
- [ ] **Spacing System**: Define a mobile-specific spacing scale (e.g., `gap-4` instead of `gap-8`).

### Phase 2: Navigation & Header
- [ ] **Hamburger Menu**: Refine animation and layout. Ensure it doesn't feel "cheap".
- [ ] **Sticky Header**: Optimize height and transparency on scroll.
- [ ] **Mobile Footer**: Simplify the footer layout (accordions for links if necessary, or better stacking).

### Phase 3: Page-Specific Polish
- [ ] **Homepage**:
    - Hero Section: Ensure background image/gradient doesn't obscure text on portrait.
    - Features: Verify stacking of feature cards.
- [ ] **Blog**:
    - Readability: Ensure line length and line height are optimal.
    - Images: Ensure full-width images don't break layout.
- [ ] **Tutorials**:
    - Video Embeds: Ensure 16:9 aspect ratio is maintained and responsive.
    - Code Blocks: Ensure horizontal scrolling works smoothly without breaking the page.

### Phase 4: Performance
- [ ] **Image Optimization**: Implement `sizes` attribute for `next/image` to serve mobile-sized variants.
- [ ] **Script Loading**: Defer non-critical scripts on mobile.

## 4. Verification
- [ ] **Lighthouse Mobile Score**: Target 95+ Performance, 100 Accessibility.
- [ ] **Real Device Test**: Verify on at least one actual iOS and one Android device.
- [ ] **"Fat Finger" Test**: Ensure no accidental clicks on adjacent elements.
