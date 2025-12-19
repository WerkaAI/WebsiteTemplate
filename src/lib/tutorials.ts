import {
  getAllEntries,
  getCollectionSlugs,
  loadEntry,
  type CollectionEntry,
} from '@/lib/mdx-collection'
import { TutorialSchema, type TutorialFrontmatter } from '@/lib/mdx/schemas'

export const TUTORIAL_DIR = 'tutorials' as const

export type TutorialMeta = TutorialFrontmatter


export async function getAllTutorialSlugs(): Promise<string[]> {
  return getCollectionSlugs(TUTORIAL_DIR)
}

export async function loadTutorial(slug: string) {
  const { Component, meta } = await loadEntry<TutorialMeta>(slug, {
    dir: TUTORIAL_DIR,
    schema: TutorialSchema,
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
    schema: TutorialSchema,
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
