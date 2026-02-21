# System bloga — instrukcja obsługi

## Jak dodać nowy post

1. Utwórz plik w `content/blog/` w formacie:
   - `YYYY-MM-DD-nazwa-posta.mdx`
2. Dodaj frontmatter:

```mdx
---
title: "Tytuł posta"
description: "Krótki opis SEO"
date: "2026-02-21"
tags: ["tag1", "tag2"]
cover: "https://example.com/og-image-placeholder.png"
draft: false
---
```

## Wymagane pola frontmatter

- `title`
- `description`
- `date`

## Opcjonalne

- `tags`
- `cover` (pełny URL, np. `https://example.com/og-image-placeholder.png`)
- `draft`

## Obrazki

- Preferuj lokalne zasoby z `public/`.
- Dla template używaj neutralnych grafik (`/images/placeholders/*`, `/illustrations/*`).

## Efekt po dodaniu pliku

- Post automatycznie trafia do listingu `/blog`.
- Tworzy się strona `/blog/[slug]`.
- Build SSG uwzględnia wpis, o ile `draft !== true`.

## Komendy

```bash
npm run dev
npm run lint
npm run typecheck
npm run build
```
