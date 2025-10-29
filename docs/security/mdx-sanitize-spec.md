# MDX Sanitation Contract

_Version 1.0 — Drafted 2025-10-27_

## Goals
- Guarantee that authorable MDX content cannot inject executable script or style payloads.
- Preserve marketing-author flexibility for layout components (checklists, callouts, tutorial embeds) without broadening the attack surface.
- Provide a single schema definition consumed by `rehype-sanitize` and mirrored in documentation for future edits.

## Pipeline Overview
1. Markdown files under `content/**` are parsed with `remark-frontmatter`, `remark-mdx-frontmatter`, and `remark-gfm`.
2. Custom transformer `rehypeMdxJsxToElements` rewrites lowercase JSX tags to HTML elements, enabling sanitation rules to apply.
3. `rehype-sanitize` executes with the schema defined in `src/lib/security/mdx-policy.mjs` (to be created) sourced from this spec.

## Allowed HTML Elements
```
blockquote, code, div, em, h1, h2, h3, h4, h5, h6, hr, iframe,
img, li, ol, p, pre, section, span, strong, table, tbody, td,
th, thead, tr, ul
```
- **Additions vs. default schema:** `section`, `div`, `span`, `article` (if needed), `iframe` to support tutorial videos.
- **Disallowed:** `script`, `style`, `audio`, `video`, `object`, `embed`, `form`, `input` (except checklists), custom event handler attributes.

## Global Attribute Policy
- Allow `className`, `id`, `aria-*`, and `data-*` attributes across elements.
- Strip any attribute starting with `on` (e.g., `onclick`, `onload`).
- Reject `style` attributes to prevent inline CSS.

## Element-Specific Attributes
| Element | Allowed Attributes | Notes |
| --- | --- | --- |
| `a` | `href`, `title`, `target`, `rel`, `className` | Force `rel="noopener noreferrer"` when `target="_blank"` |
| `img` | `src`, `alt`, `title`, `loading`, `decoding`, `width`, `height`, `className` | Validate that `src` is HTTPS and within CSP `img-src` allow-list |
| `iframe` | `src`, `title`, `allow`, `allowFullScreen`, `loading`, `referrerPolicy`, `width`, `height`, `className` | Restrict `src` host to YouTube/YouTube-nocookie |
| `input` | `type`, `checked`, `disabled`, `value`, `className` | Limited to checklist component; only `type="checkbox"` accepted |
| `code`, `pre` | `className` | Classes used for syntax highlighting |
| `table`, `thead`, `tbody`, `tr`, `th`, `td` | `className`, `scope` | Support MDX tables |
| `section`, `ul`, `ol`, `li`, `span`, `div` | `className`, `id`, `data-*` | Provide styling hooks |

## URL Validation Rules
- `href` / `src` attributes must match `/^(https?:\/\/|\/)/` and reject `javascript:` schemes.
- `iframe.src` limited to hosts present in `docs/security/headers-spec.md` -> `frame-src` list.
- Provide helper `assertAllowedUrl(url, type)` inside `mdx-policy.mjs` to throw during build when violations occur; integrate with MDX compilation to fail builds early.

## Serialization Guards
- All MDX front matter strings pass through `gray-matter` — ensure no direct interpolation into HTML without escaping.
- When `dangerouslySetInnerHTML` is used to render MDX (currently false), require explicit review; default rendering via `@mdx-js/react` remains safe.

## Testing Strategy
1. Unit tests for `src/lib/security/mdx-policy.mjs` verifying allow/deny cases using sample HTML snippets.
2. Snapshot test for representative tutorial MDX file to ensure sanitized output preserves layout.
3. Add lint rule (custom or remark plugin) to fail PRs introducing disallowed tags/attributes.

## Change Management
- Any future request to embed new providers (e.g., Vimeo, Loom) must update:
  1. This document
  2. `mdx-policy.mjs`
  3. CSP allow-lists & `inventory.json`
- Document change date and owner in a running changelog appended to this spec.
