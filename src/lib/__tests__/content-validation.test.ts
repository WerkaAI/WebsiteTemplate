import { describe, expect, it } from 'vitest'
import { getCollectionSlugs, loadEntry } from '@/lib/mdx-collection'
import { BlogPostSchema, TutorialSchema } from '@/lib/mdx/schemas'

describe('content frontmatter validation', () => {
  it('validates all blog entries against BlogPostSchema', async () => {
    const slugs = getCollectionSlugs('blog')
    expect(slugs.length).toBeGreaterThan(0)

    for (const slug of slugs) {
      const { meta } = await loadEntry(slug, {
        dir: 'blog',
        schema: BlogPostSchema,
      })

      expect(meta.title.length).toBeGreaterThan(0)
      expect(meta.date).toMatch(/^\d{4}-\d{2}-\d{2}$/)
    }
  })

  it('validates all tutorial entries against TutorialSchema', async () => {
    const slugs = getCollectionSlugs('tutorials')
    expect(slugs.length).toBeGreaterThan(0)

    for (const slug of slugs) {
      const { meta } = await loadEntry(slug, {
        dir: 'tutorials',
        schema: TutorialSchema,
      })

      expect(meta.title.length).toBeGreaterThan(0)
      expect(meta.date).toMatch(/^\d{4}-\d{2}-\d{2}$/)
    }
  })
})
