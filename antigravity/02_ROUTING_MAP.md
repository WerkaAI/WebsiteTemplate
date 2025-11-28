# Routing Map

## Main Routes
| Path | Purpose | Main Components |
| :--- | :--- | :--- |
| `/` | Landing Page | `HeroSection`, `ProblemSection`, `SolutionSection`, `DemoSection`, `CalculatorSection`, `TestimonialsSection`, `PricingSection`, `BlogSection`, `ContactSection` |
| `/blog` | Blog Listing | `BlogListing` (implied) |
| `/blog/[slug]` | Blog Post | MDX Content Renderer |
| `/cennik` | Pricing Page | `PricingSection` (likely reused or specific page content) |
| `/funkcje` | Features Page | Feature details |
| `/kontakt` | Contact Page | `ContactForm` |
| `/polityka-prywatnosci` | Privacy Policy | Static Content |
| `/tutoriale` | Tutorials Listing | Tutorial Listing |
| `/tutoriale/[slug]` | Tutorial Post | MDX Content Renderer |

## API Routes
- `/api/send`: Email sending endpoint (implied by `resend` dependency and contact form).

## Special Files
- `layout.tsx`: Root layout (Navigation, Footer, Providers).
- `not-found.tsx`: 404 Page.
- `robots.ts`: SEO robots configuration.
- `sitemap.ts`: Sitemap generation.
- `opengraph-image`: OG Image generation.
