import createMDX from '@next/mdx'
import bundleAnalyzer from '@next/bundle-analyzer'
import remarkGfm from 'remark-gfm'
import remarkFrontmatter from 'remark-frontmatter'
import remarkMdxFrontmatter from 'remark-mdx-frontmatter'
import rehypeSlug from 'rehype-slug'
import rehypeAutolinkHeadings from 'rehype-autolink-headings'
import rehypeSanitize, { defaultSchema } from 'rehype-sanitize'

const withMDX = createMDX({
  options: {
    providerImportSource: '../../mdx-components',
    remarkPlugins: [
      remarkGfm,
      remarkFrontmatter,
      [remarkMdxFrontmatter, { name: 'meta' }]
    ],
    rehypePlugins: [
      rehypeSlug,
      [rehypeAutolinkHeadings, { behavior: 'wrap' }],
      [
        rehypeSanitize,
        {
          ...defaultSchema,
          attributes: {
            ...defaultSchema.attributes,
            // Allow common attributes on anchors and images inside MDX content
            a: [
              ...(defaultSchema.attributes?.a || []),
              ['target'],
              ['rel'],
            ],
            img: [
              ...(defaultSchema.attributes?.img || []),
              ['src'],
              ['alt'],
              ['loading'],
              ['decoding'],
            ],
            code: [
              ...(defaultSchema.attributes?.code || []),
              ['className'],
            ],
            pre: [
              ...(defaultSchema.attributes?.pre || []),
              ['className'],
            ],
          },
        },
      ],
    ]
  }
})

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  pageExtensions: ['ts', 'tsx', 'mdx'],
  env: {
    NEXT_PUBLIC_TURNSTILE_SITE_KEY: '1x00000000000000000000AA',
    TURNSTILE_SECRET_KEY: '1x0000000000000000000000000000000AA',
    RESEND_API_KEY: 're_test_key_placeholder',
    TURNSTILE_BYPASS: 'true',
    CONTACT_TO_EMAIL: 'kontakt@autozaba.pl',
    CONTACT_FROM_EMAIL: 'AutoŻaba Formularz <no-reply@autozaba.pl>',
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
    ],
  },
  async rewrites() {
    return [
      // Serve dynamic OG image for existing references to /og-image.jpg
      { source: '/og-image.jpg', destination: '/opengraph-image' },
    ]
  },
  async headers() {
    const isProd = process.env.NODE_ENV === 'production'
    return [
      {
        source: '/:path*',
        headers: [
          { key: 'Referrer-Policy', value: 'no-referrer-when-downgrade' },
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
          { key: 'Permissions-Policy', value: 'geolocation=(), microphone=(), camera=()' },
          ...(isProd
            ? [
                { key: 'Strict-Transport-Security', value: 'max-age=63072000; includeSubDomains; preload' },
                {
                  key: 'Content-Security-Policy',
                  value: [
                    "default-src 'self'",
                    "base-uri 'self'",
                    "form-action 'self'",
                    "frame-ancestors 'self'",
                    // Allow YouTube embeds
                    "frame-src 'self' https://www.youtube.com https://www.youtube-nocookie.com",
                    // Allow images from self and https (Unsplash, etc.) and data URIs
                    "img-src 'self' https: data:",
                    // Inline styles are common with CSS-in-JS and Tailwind preflight
                    "style-src 'self' 'unsafe-inline'",
                    // Next.js may use inline scripts; keep reasonably permissive while avoiding remote code
                    "script-src 'self' 'unsafe-inline' 'unsafe-eval'",
                    // Fonts
                    "font-src 'self' data:",
                    // XHR/Web fetch
                    "connect-src 'self'",
                    'upgrade-insecure-requests',
                  ].join('; '),
                },
              ]
            : []),
        ],
      },
    ]
  },
}
const withBundleAnalyzer = bundleAnalyzer({ enabled: process.env.ANALYZE === 'true' })
export default withBundleAnalyzer(withMDX(nextConfig))