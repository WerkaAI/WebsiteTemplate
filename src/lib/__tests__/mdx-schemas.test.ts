import { describe, expect, it } from 'vitest'
import { BlogPostSchema, TutorialSchema } from '@/lib/mdx/schemas'

describe('MDX frontmatter schemas', () => {
  it('accepts absolute cover URL for blog post', () => {
    const parsed = BlogPostSchema.parse({
      title: 'Test blog',
      description: 'Opis',
      date: '2026-02-21',
      cover: 'https://example.com/og-image-placeholder.png',
      tags: ['test'],
    })

    expect(parsed.cover).toBe('https://example.com/og-image-placeholder.png')
    expect(parsed.draft).toBe(false)
  })

  it('rejects relative cover path', () => {
    const result = BlogPostSchema.safeParse({
      title: 'Test blog',
      date: '2026-02-21',
      cover: '/og-image-placeholder.png',
    })

    expect(result.success).toBe(false)
  })

  it('normalizes nullable arrays in tutorial schema', () => {
    const parsed = TutorialSchema.parse({
      title: 'Tutorial',
      date: '2026-02-21',
      tags: null,
      persona: null,
      relatedTutorials: null,
    })

    expect(parsed.tags).toEqual([])
    expect(parsed.persona).toEqual([])
    expect(parsed.relatedTutorials).toEqual([])
  })

  it('enforces YYYY-MM-DD date format', () => {
    const result = TutorialSchema.safeParse({
      title: 'Tutorial',
      date: '21-02-2026',
    })

    expect(result.success).toBe(false)
  })
})
