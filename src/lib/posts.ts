import { z } from 'zod'
import {
  getAllEntries,
  getCollectionSlugs,
  loadEntry,
  type BaseMeta,
  type CollectionEntry,
} from '@/lib/mdx-collection'

const BLOG_DIR = 'blog'

const BlogMetaSchema = z.object({
  title: z.string(),
  description: z.string().optional(),
  date: z.string(),
  tags: z.array(z.string()).optional(),
  cover: z.string().optional(),
  draft: z.boolean().optional(),
  readTime: z.string().optional(),
})

export type BlogMeta = z.infer<typeof BlogMetaSchema>

// Legacy interface for compatibility with older imports
export interface BlogPost extends BlogMeta {
  slug: string
}

export async function getAllSlugs(): Promise<string[]> {
  return getCollectionSlugs(BLOG_DIR)
}

export async function loadPost(slug: string) {
  const { Component, meta } = await loadEntry<BlogMeta>(slug, {
    dir: BLOG_DIR,
    schema: BlogMetaSchema,
    importModule: async currentSlug => {
      try {
        const mod = await import(`../../content/${BLOG_DIR}/${currentSlug}.mdx`)
        return mod as Record<string, unknown>
      } catch (error) {
        console.warn(`MDX import fallback triggered for blog/${currentSlug}.mdx`, error)
        return null
      }
    },
  })

  if (!Component) {
    throw new Error(`Unable to resolve MDX component for blog/${slug}`)
  }

  return {
    Component,
    meta,
  }
}

export async function getAllPosts(): Promise<Array<CollectionEntry<BlogMeta>>> {
  return getAllEntries<BlogMeta>(BLOG_DIR, {
    schema: BlogMetaSchema,
  })
}