# Design System

## Colors
| Name | Value | Usage |
| :--- | :--- | :--- |
| `brand-green` | `#006625` | Primary brand color, links, accents |
| `brand-green-secondary` | `#16A34A` | Hover states, secondary accents |
| `blackout` | `#090909` | Dark backgrounds, main headings |
| `stone` | `#313847` | Secondary text, code blocks |
| `almost-white` | `#F9FAFB` | Light backgrounds |
| `accent-orange` | `#FD7E14` | Call to action, highlights |

## Typography
- **Sans**: `var(--font-sans)` (Default UI font)
- **Serif**: `var(--font-serif)` (Headings, accents)
- **Mono**: `var(--font-mono)` (Code, technical data)

## Spacing & Layout
- **Container**: Centered with padding (standard Tailwind `container` class).
- **Custom Spacing**:
    - `18`: `4.5rem`
    - `88`: `22rem`
- **Radius**: `var(--radius)` based (likely `0.5rem` or `0.75rem`).

## Animations
- `fade-in`: `0.6s ease-out` (Entry animations)
- `slide-up`: `0.4s ease-out` (Entry animations)
- `accordion-down/up`: `0.2s ease-out` (Radix Accordion)

## UI Patterns
- **Cards**: `bg-card` with `border` and shadow.
- **Buttons**: Primary (solid), Secondary (outline), Ghost (text only).
- **Inputs**: Standard Radix/Tailwind inputs with focus rings.
