import createMDX from '@next/mdx'
import bundleAnalyzer from '@next/bundle-analyzer'
import remarkGfm from 'remark-gfm'
import remarkFrontmatter from 'remark-frontmatter'
import remarkMdxFrontmatter from 'remark-mdx-frontmatter'
import rehypeSlug from 'rehype-slug'
import rehypeAutolinkHeadings from 'rehype-autolink-headings'
import rehypeSanitize, { defaultSchema } from 'rehype-sanitize'

const allowGenericClassName = (entries = []) => {
  const filtered = []

  for (const entry of entries) {
    if (!entry) continue
    const name = typeof entry === 'string' ? entry : entry[0]
    if (name && name !== 'className') {
      filtered.push(entry)
    }
  }

  filtered.push('className')
  return filtered
}

const rehypeMdxJsxToElements = () => (tree) => {
  const convertNode = (node) => {
    if (!node || typeof node !== 'object') return

    if (
      (node.type === 'mdxJsxFlowElement' || node.type === 'mdxJsxTextElement') &&
      typeof node.name === 'string' &&
      /^[a-z]/.test(node.name)
    ) {
      const properties = {}

      if (Array.isArray(node.attributes)) {
        for (const attribute of node.attributes) {
          if (!attribute || typeof attribute !== 'object') continue
          if (attribute.type === 'mdxJsxAttribute' && typeof attribute.name === 'string') {
            if (attribute.value === null || attribute.value === undefined) {
              properties[attribute.name] = true
            } else if (typeof attribute.value === 'string') {
              properties[attribute.name] = attribute.value
            } else if (typeof attribute.value === 'object' && 'value' in attribute.value && typeof attribute.value.value === 'string') {
              properties[attribute.name] = attribute.value.value
            }
          }
        }
      }

      node.type = 'element'
      node.tagName = node.name
      node.properties = properties
      delete node.name
      delete node.attributes
    }

    if (Array.isArray(node.children)) {
      for (const child of node.children) {
        convertNode(child)
      }
    }
  }

  convertNode(tree)
}

const clonedSchema = structuredClone(defaultSchema)

const mdxSanitizeSchema = {
  ...clonedSchema,
  tagNames: Array.from(
    new Set([...(clonedSchema.tagNames || []), 'section', 'div', 'span', 'article', 'iframe'])
  ),
  attributes: {
    ...clonedSchema.attributes,
    '*': [
      ...(clonedSchema.attributes?.['*'] || []),
      'className',
    ],
    iframe: [
      ...(clonedSchema.attributes?.iframe || []),
      ['src'],
      ['title'],
      ['allow'],
      ['allowFullScreen'],
      ['referrerPolicy'],
      ['width'],
      ['height'],
      ['loading'],
    ],
    // Allow common attributes on anchors and images inside MDX content
    a: [
      ...(clonedSchema.attributes?.a || []),
      ['target'],
      ['rel'],
      ['className'],
    ],
    img: [
      ...(clonedSchema.attributes?.img || []),
      ['src'],
      ['alt'],
      ['loading'],
      ['decoding'],
      ['className'],
    ],
    code: [
      ...(clonedSchema.attributes?.code || []),
      ['className'],
    ],
    pre: [
      ...(clonedSchema.attributes?.pre || []),
      ['className'],
    ],
    section: allowGenericClassName(clonedSchema.attributes?.section),
    ul: allowGenericClassName(clonedSchema.attributes?.ul),
    ol: allowGenericClassName(clonedSchema.attributes?.ol),
    li: allowGenericClassName(clonedSchema.attributes?.li),
  },
}

const buildContentSecurityPolicy = (includeUpgradeInsecureRequests = true) => {
  const directives = [
    "default-src 'self'",
    "base-uri 'self'",
    "form-action 'self'",
    "frame-ancestors 'self'",
    "frame-src 'self' https://www.youtube.com https://www.youtube-nocookie.com",
    "img-src 'self' https: data:",
    "style-src 'self' 'unsafe-inline'",
    "script-src 'self' 'unsafe-inline' 'unsafe-eval'",
    "font-src 'self' data:",
    "connect-src 'self'",
  ]

  if (includeUpgradeInsecureRequests) {
    directives.push('upgrade-insecure-requests')
  }

  return directives.join('; ')
}

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
      rehypeMdxJsxToElements,
      [rehypeSanitize, mdxSanitizeSchema],
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
      {
        protocol: 'https',
        hostname: 'autozaba-app-storage.fra1.cdn.digitaloceanspaces.com',
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
    const disableStrictSecurityHeaders = process.env.NEXT_DISABLE_STRICT_SECURITY_HEADERS === '1'
    const securityHeaders = !isProd
      ? []
      : [
          ...(disableStrictSecurityHeaders
            ? []
            : [{ key: 'Strict-Transport-Security', value: 'max-age=63072000; includeSubDomains; preload' }]),
          {
            key: 'Content-Security-Policy',
            value: buildContentSecurityPolicy(!disableStrictSecurityHeaders),
          },
        ]

    return [
      {
        source: '/:path*',
        headers: [
          { key: 'Referrer-Policy', value: 'no-referrer-when-downgrade' },
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
          { key: 'Permissions-Policy', value: 'geolocation=(), microphone=(), camera=()' },
          ...securityHeaders,
        ],
      },
    ]
  },
}
const withBundleAnalyzer = bundleAnalyzer({ enabled: process.env.ANALYZE === 'true' })
export default withBundleAnalyzer(withMDX(nextConfig))