# Blog Post Blueprint (360×740 focus)

## Layout Intent
- Narrative shell with navigation + article hero card, followed by content/aside split that stacks on small screens.
- Hero card uses overlay gradient on cover image to maintain contrast for title/metadata.
- Article body uses `prose` with Calm Control tokens; aside blocks provide social + CTA context.

## Priority Content Blocks
1. **Breadcrumb header** — links back to home/blog.
2. **Article hero** — primary tag badge, title, standfirst copy, metadata row, tag chips, CTA pair.
3. **Article content** — MDX-rendered body inside `prose` with balanced typography.
4. **Aside utilities** — share block with `ShareButtons`, conversion CTA (`Wypróbuj AutoŻaba`).
5. **Global chrome** — navigation + footer.

## Interaction Goals
- Anchor link `#treść-artykułu` scrolls to article body with smooth behavior.
- Share buttons provide instant copy/link/LinkedIn/Twitter/email actions; copy shows success state.
- CTA button opens registration in new tab; return button moves back to blog index.

## Constraint Summary
- Ensure hero overlay preserves AA contrast at 360px; text width ≤ 32ch.
- Buttons and share icons respect 48px tap targets.
- Prose content must avoid horizontal scroll (images auto-fit, tables responsive).
- Sticky aside only engages ≥1024px; on mobile, aside falls below article content.

## Calm Control Cues
- Deep emerald gradient overlay with soft shadows for hero card.
- Prose styling uses brand link colors and rounded code blocks.
- Tag badges and metadata rely on muted emerald/stone palette.

## Known Dependencies & Reuse Patterns
- `ShareButtons` reused from blog cards; ensures consistent icon sizing (`touchIcon`).
- CTA button leverages global `Button` component; hero uses `Badge` from UI kit.
- Layout shares navigation/footer with home, so existing IDs apply.

## Open Questions
- Evaluate MDX content for components that may exceed viewport (tables, code blocks) and add wrappers if needed.
- Confirm JSON-LD scripts do not impact DOM snapshot sanitization.
- Determine if additional in-article CTA (mid-content) is needed for longer posts.
