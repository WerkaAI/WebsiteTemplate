import { describe, expect, it } from 'vitest'
import { getCollectionSlugs, getAllEntries, loadEntry } from '@/lib/mdx-collection'
import { BaseFrontmatterSchema } from '@/lib/mdx/schemas'

describe('MDX collection slugs and parser', () => {
  it('returns deterministic, extension-less slugs for blog and tutorials', () => {
    const blogSlugs = getCollectionSlugs('blog')
    const tutorialSlugs = getCollectionSlugs('tutorials')

    expect(blogSlugs.length).toBeGreaterThan(0)
    expect(tutorialSlugs.length).toBeGreaterThan(0)

    expect(blogSlugs.every((slug) => !slug.endsWith('.mdx'))).toBe(true)
    expect(tutorialSlugs.every((slug) => !slug.endsWith('.mdx'))).toBe(true)

    const sortedBlogSlugs = [...blogSlugs].sort((a, b) => a.localeCompare(b))
    const sortedTutorialSlugs = [...tutorialSlugs].sort((a, b) => a.localeCompare(b))

    expect(blogSlugs).toEqual(sortedBlogSlugs)
    expect(tutorialSlugs).toEqual(sortedTutorialSlugs)
  })

  it('parses frontmatter via file fallback loader', async () => {
    const sampleBlogSlug = getCollectionSlugs('blog')[0]

    const { meta, Component } = await loadEntry(sampleBlogSlug, {
      dir: 'blog',
      schema: BaseFrontmatterSchema,
      importModule: async () => null,
    })

    expect(Component).toBeUndefined()
    expect(meta.title).toBeTruthy()
    expect(meta.date).toMatch(/^\d{4}-\d{2}-\d{2}$/)
  })

  it('sorts entries descending by date and filters drafts when includeDrafts=false', async () => {
    const entries = await getAllEntries('blog', {
      schema: BaseFrontmatterSchema,
      includeDrafts: false,
    })

    expect(entries.length).toBeGreaterThan(0)

    for (let i = 0; i < entries.length - 1; i += 1) {
      const current = new Date(entries[i].meta.date).getTime()
      const next = new Date(entries[i + 1].meta.date).getTime()
      expect(current).toBeGreaterThanOrEqual(next)
      expect(entries[i].meta.draft ?? false).toBe(false)
    }
  })
})
