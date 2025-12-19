import { describe, expect, it, beforeEach, vi } from 'vitest'

vi.mock('@/lib/mdx-collection', () => {
  const getAllEntries = vi.fn()
  const loadEntry = vi.fn()
  const getCollectionSlugs = vi.fn()
  return { getAllEntries, loadEntry, getCollectionSlugs }
})

import { getAllTutorials, getAllTutorialSlugs, loadTutorial, type TutorialMeta } from '@/lib/tutorials'
import * as mdxCollection from '@/lib/mdx-collection'

const mockedMdx = vi.mocked(mdxCollection)

describe('tutorials data accessors', () => {
  const sampleMeta: TutorialMeta = {
    title: 'Sample',
    description: 'Opis',
    date: '2025-10-18',
    persona: ['właściciel'],
    difficulty: 'podstawowy',
    durationMinutes: 10,
    tags: ['start'],
    draft: false,
    relatedTutorials: [],
  }

  beforeEach(() => {
    mockedMdx.getAllEntries.mockReset()
    mockedMdx.loadEntry.mockReset()
    mockedMdx.getCollectionSlugs.mockReset()
  })

  it('returns tutorials without drafts', async () => {
    mockedMdx.getAllEntries.mockResolvedValue([
      { slug: 'live-entry', meta: sampleMeta },
      { slug: 'draft-entry', meta: { ...sampleMeta, draft: true } },
    ])

    const tutorials = await getAllTutorials()

    expect(mockedMdx.getAllEntries).toHaveBeenCalledWith('tutorials', expect.objectContaining({ schema: expect.anything() }))
    expect(tutorials).toEqual([
      { slug: 'live-entry', meta: sampleMeta },
      { slug: 'draft-entry', meta: { ...sampleMeta, draft: true } },
    ])
  })

  it('exposes loadTutorial with schema validation', async () => {
    mockedMdx.loadEntry.mockResolvedValue({ Component: () => null, meta: sampleMeta })

    const result = await loadTutorial('sample')

    expect(mockedMdx.loadEntry).toHaveBeenCalledWith('sample', expect.objectContaining({ dir: 'tutorials' }))
    expect(result.meta.title).toBe('Sample')
  })

  it('throws when component is missing', async () => {
    mockedMdx.loadEntry.mockResolvedValue({ Component: undefined, meta: sampleMeta })

    await expect(loadTutorial('missing')).rejects.toThrow(/Unable to resolve MDX component/)
  })

  it('delegates slug listing', async () => {
    mockedMdx.getCollectionSlugs.mockReturnValue(['one', 'two'])

    const slugs = await getAllTutorialSlugs()

    expect(slugs).toEqual(['one', 'two'])
    expect(mockedMdx.getCollectionSlugs).toHaveBeenCalledWith('tutorials')
  })
})
