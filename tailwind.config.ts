import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./mdx-components.tsx",
    "./content/**/*.mdx"
  ],
  theme: {
    extend: {
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      colors: {
        // AutoŻaba Brand Colors
        "brand-green": "#006625",
        "brand-green-secondary": "#16A34A",
        "blackout": "#090909",
        "stone": "#313847",
        "almost-white": "#F9FAFB",
        "accent-orange": "#FD7E14",

        background: "var(--background)",
        foreground: "var(--foreground)",
        card: {
          DEFAULT: "var(--card)",
          foreground: "var(--card-foreground)",
        },
        popover: {
          DEFAULT: "var(--popover)",
          foreground: "var(--popover-foreground)",
        },
        primary: {
          DEFAULT: "var(--primary)",
          foreground: "var(--primary-foreground)",
        },
        secondary: {
          DEFAULT: "var(--secondary)",
          foreground: "var(--secondary-foreground)",
        },
        muted: {
          DEFAULT: "var(--muted)",
          foreground: "var(--muted-foreground)",
        },
        accent: {
          DEFAULT: "var(--accent)",
          foreground: "var(--accent-foreground)",
        },
        destructive: {
          DEFAULT: "var(--destructive)",
          foreground: "var(--destructive-foreground)",
        },
        border: "var(--border)",
        input: "var(--input)",
        ring: "var(--ring)",
        chart: {
          "1": "var(--chart-1)",
          "2": "var(--chart-2)",
          "3": "var(--chart-3)",
          "4": "var(--chart-4)",
          "5": "var(--chart-5)",
        },
        sidebar: {
          DEFAULT: "var(--sidebar)",
          foreground: "var(--sidebar-foreground)",
          primary: "var(--sidebar-primary)",
          "primary-foreground": "var(--sidebar-primary-foreground)",
          accent: "var(--sidebar-accent)",
          "accent-foreground": "var(--sidebar-accent-foreground)",
          border: "var(--sidebar-border)",
          ring: "var(--sidebar-ring)",
        },
      },
      fontFamily: {
        sans: ["var(--font-sans)"],
        serif: ["var(--font-serif)"],
        mono: ["var(--font-mono)"],
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
      },
      keyframes: {
        "accordion-down": {
          from: {
            height: "0",
          },
          to: {
            height: "var(--radix-accordion-content-height)",
          },
        },
        "accordion-up": {
          from: {
            height: "var(--radix-accordion-content-height)",
          },
          to: {
            height: "0",
          },
        },
        "fade-in": {
          from: {
            opacity: "0",
            transform: "translateY(20px)",
          },
          to: {
            opacity: "1",
            transform: "translateY(0)",
          },
        },
        "slide-up": {
          from: {
            transform: "translateY(100%)",
          },
          to: {
            transform: "translateY(0)",
          },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "fade-in": "fade-in 0.6s ease-out",
        "slide-up": "slide-up 0.4s ease-out",
      },
      typography: (theme: any) => ({
        DEFAULT: {
          css: {
            // Brand colors dla prose
            '--tw-prose-links': theme('colors.brand-green'),
            '--tw-prose-headings': theme('colors.blackout'),
            '--tw-prose-body': theme('colors.stone'),
            '--tw-prose-bold': theme('colors.blackout'),
            '--tw-prose-code': theme('colors.stone'),
            '--tw-prose-pre-bg': theme('colors.muted.DEFAULT'),

            // Dark mode (invert)
            '--tw-prose-invert-links': theme('colors.brand-green-secondary'),
            '--tw-prose-invert-headings': '#ffffff',
            '--tw-prose-invert-body': '#cbd5e1', // slate-300
            '--tw-prose-invert-bold': '#ffffff',
            '--tw-prose-invert-code': '#ffffff',
            '--tw-prose-invert-pre-bg': 'rgba(0,0,0,0.5)',

            // Custom styling
            code: {
              backgroundColor: theme('colors.muted.DEFAULT'),
              padding: '0.2rem 0.4rem',
              borderRadius: '0.375rem',
              fontWeight: '500',
            },
            'code::before': {
              content: '""',
            },
            'code::after': {
              content: '""',
            },
            'h1, h2, h3, h4, h5, h6': {
              scrollMarginTop: '7rem',
              fontFamily: theme('fontFamily.sans'),
            },
            a: {
              textUnderlineOffset: '4px',
              '&:hover': {
                color: theme('colors.brand-green-secondary'),
              },
            },
          },
        },
      }),
    },
  },
  plugins: [require("tailwindcss-animate"), require("@tailwindcss/typography")],
} satisfies Config;
