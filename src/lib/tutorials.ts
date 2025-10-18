import { z } from 'zod'
import {
  getAllEntries,
  getCollectionSlugs,
  loadEntry,
  type CollectionEntry,
} from '@/lib/mdx-collection'

export const TUTORIAL_DIR = 'tutorials' as const

const TutorialMetaSchema = z.object({
  title: z.string(),
  description: z.string(),
  date: z.string(),
  persona: z.array(z.string()).min(1),
  difficulty: z.enum(['podstawowy', 'średniozaawansowany', 'zaawansowany']).or(z.string()),
  durationMinutes: z.number().int().positive(),
  tags: z.array(z.string()).default([]),
  draft: z.boolean().optional(),
  cover: z.string().optional(),
  relatedTutorials: z.array(z.string()).optional(),
})

export type TutorialMeta = z.infer<typeof TutorialMetaSchema>

export async function getAllTutorialSlugs(): Promise<string[]> {
  return getCollectionSlugs(TUTORIAL_DIR)
}

export async function loadTutorial(slug: string) {
  const { Component, meta } = await loadEntry<TutorialMeta>(slug, {
    dir: TUTORIAL_DIR,
    schema: TutorialMetaSchema,
    importModule: async currentSlug => {
      try {
        const mod = await import(`../../content/${TUTORIAL_DIR}/${currentSlug}.mdx`)
        return mod as Record<string, unknown>
      } catch (error) {
        console.warn(`MDX import fallback triggered for tutorials/${currentSlug}.mdx`, error)
        return null
      }
    },
  })

  if (!Component) {
    throw new Error(`Unable to resolve MDX component for tutorials/${slug}`)
  }

  return {
    Component,
    meta,
  }
}

export async function getAllTutorials(): Promise<Array<CollectionEntry<TutorialMeta>>> {
  return getAllEntries<TutorialMeta>(TUTORIAL_DIR, {
    schema: TutorialMetaSchema,
    importModule: async currentSlug => {
      try {
        const mod = await import(`../../content/${TUTORIAL_DIR}/${currentSlug}.mdx`)
        return mod as Record<string, unknown>
      } catch (error) {
        console.warn(`MDX import fallback triggered for tutorials/${currentSlug}.mdx`, error)
        return null
      }
    },
  })
}
