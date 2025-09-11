# System Bloga - Instrukcja Obsługi

## Jak dodać nowy post na blog

### 1. Utwórz nowy plik MDX

Stwórz nowy plik w folderze `content/blog/` z nazwą w formacie:
```
YYYY-MM-DD-nazwa-posta.mdx
```

Przykład: `2025-01-15-nowe-przepisy-prawa-pracy.mdx`

### 2. Struktura pliku MDX

Każdy plik musi zawierać YAML front-matter na początku:

```mdx
---
title: "Tytuł posta"
description: "Krótki opis posta dla SEO i podglądów"
date: "2025-01-15"
tags: ["prawo pracy", "PIP", "przepisy"]
cover: "/images/blog/cover-image.jpg"
draft: false
---

# Tytuł artykułu

To jest treść artykułu w formacie **Markdown**.

## Podrozdział

Możesz używać wszystkich standardowych elementów Markdown:

- Listy
- **Pogrubienia**
- *Kursywy*
- `Kod inline`

```kod
Bloki kodu
```

[Linki](https://autozaba.pl)

![Alt text](/images/example.jpg)
```

### 3. Pola front-matter

- **title** (wymagane): Tytuł posta
- **description** (wymagane): Opis dla SEO (max 160 znaków)
- **date** (wymagane): Data w formacie YYYY-MM-DD
- **tags** (opcjonalne): Lista tagów w nawiasach kwadratowych
- **cover** (opcjonalne): Ścieżka do obrazka okładki (relatywna do public/)
- **draft** (opcjonalne): `true` aby ukryć post, `false` lub pominięte aby pokazać

### 4. Obrazki

- Umieść obrazki w folderze `public/images/blog/`
- Odwołuj się do nich jako `/images/blog/nazwa-obrazka.jpg`
- Jeśli nie podasz `cover`, będzie wyświetlony gradient placeholder

### 5. Automatyczne generowanie

Po dodaniu pliku:
- Blog automatycznie wykryje nowy post
- Generuje się URL: `/blog/nazwa-posta` (bez daty)
- Post pojawi się na liście `/blog`
- Działa statyczne generowanie (SSG)

### 6. URLs i dostęp

- Lista postów: `http://localhost:5000/blog`
- Pojedynczy post: `http://localhost:5000/blog/[slug]`
- Przykład: `http://localhost:5000/blog/2025-08-21-witaj-autozaba`

## Status systemu

✅ **Działające funkcje:**
- YAML front-matter
- Statyczne generowanie (SSG)
- SEO metadata
- Placeholder dla okładek
- Filtrowanie postów draft
- Sortowanie po dacie
- Tailwind Typography styling

⚠️ **Znane problemy:**
- MDX component rendering (błędy React context w server components)
- Obrazki używają `<img>` zamiast `<Image />` z Next.js

## Budowanie

- **Development**: `npm run dev`
- **Production**: `npm run build` (static generation ✅)