import fs from 'fs'
import path from 'path'

const BLOG_DIR = path.join(process.cwd(), 'content', 'blog')

// Legacy interface for compatibility
export interface BlogPost {
  slug: string
  title: string
  description?: string
  date: string
  tags?: string[]
  cover?: string
  draft?: boolean
}

export async function getAllSlugs(): Promise<string[]> {
  if (!fs.existsSync(BLOG_DIR)) {
    return []
  }

  const fileNames = fs.readdirSync(BLOG_DIR)
  return fileNames
    .filter(fileName => fileName.endsWith('.mdx'))
    .map(fileName => fileName.replace(/\.mdx$/, ''))
}

export async function loadPost(slug: string) {
  try {
    const mod = await import(`../../content/blog/${slug}.mdx`)
    return { 
      Component: mod.default, 
      meta: mod.meta 
    }
  } catch (error) {
    console.error(`Error loading post ${slug}:`, error)
    throw error
  }
}

export async function getAllPosts() {
  const slugs = await getAllSlugs()
  const posts = []
  
  for (const slug of slugs) {
    try {
      const { meta } = await loadPost(slug)
      if (!meta.draft) {
        posts.push({ slug, meta })
      }
    } catch (error) {
      console.warn(`Failed to load post ${slug}:`, error)
    }
  }
  
  // Sort by date (ISO format)
  return posts.sort((a, b) => {
    if (a.meta.date < b.meta.date) {
      return 1
    } else {
      return -1
    }
  })
}