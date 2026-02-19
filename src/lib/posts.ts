import {
  getAllEntries,
  getCollectionSlugs,
  loadEntry,
  type CollectionEntry,
} from '@/lib/mdx-collection'
import { BlogPostSchema, type BlogPostFrontmatter } from '@/lib/mdx/schemas'

const BLOG_DIR = 'blog'

export type BlogMeta = BlogPostFrontmatter


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
    schema: BlogPostSchema,
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
    schema: BlogPostSchema,
  })
}