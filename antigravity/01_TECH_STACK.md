# Tech Stack

## Core Framework
- **Framework**: Next.js 14.2.5 (App Router)
- **Language**: TypeScript 5.6.3
- **Runtime**: Node.js (implied)

## Styling & UI
- **CSS Framework**: Tailwind CSS 3.4.17
- **Component Primitives**: Radix UI (Accordion, Dialog, Dropdown, etc.)
- **Icons**: Lucide React, React Icons
- **Animations**: Tailwind Animate, Framer Motion (implied by dependencies)
- **Utilities**: `clsx`, `tailwind-merge`, `class-variance-authority` (cva)

## Content Management
- **Format**: MDX (`@next/mdx`, `next-mdx-remote` or similar via `mdx-components.tsx`)
- **Processing**: `gray-matter`, `remark-gfm`, `rehype-slug`, `rehype-autolink-headings`

## Forms & Validation
- **Form Management**: React Hook Form
- **Validation**: Zod
- **UI Components**: `input-otp`

## Backend & Services
- **Email**: Resend
- **Security**: `react-turnstile` (Cloudflare Turnstile)

## Testing & Quality
- **Unit/Integration**: Vitest, React Testing Library
- **E2E**: Puppeteer
- **Linting**: ESLint
- **Hooks**: Husky, Lint-staged

## Conventions
- **Path Aliases**: Likely `@/*` pointing to `./src/*` (standard Next.js).
- **Component Structure**: `src/components/ui` for primitives, `src/components/*-section.tsx` for page sections.
