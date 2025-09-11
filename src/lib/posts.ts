import fs from 'fs'
import path from 'path'

const postsDirectory = path.join(process.cwd(), 'content/blog')

export interface BlogPost {
  slug: string
  title: string
  description: string
  date: string
  tags?: string[]
  cover?: string
  draft?: boolean
}

export interface MDXPost extends BlogPost {
  default: React.ComponentType
  meta: BlogPost
}

export async function getBlogPosts(): Promise<BlogPost[]> {
  // Check if directory exists
  if (!fs.existsSync(postsDirectory)) {
    return []
  }

  const fileNames = fs.readdirSync(postsDirectory)
  
  const allPostsData = await Promise.all(
    fileNames
      .filter(fileName => fileName.endsWith('.mdx'))
      .map(async fileName => {
        // Remove ".mdx" from file name to get slug
        const slug = fileName.replace(/\.mdx$/, '')

        try {
          // Dynamic import of MDX file
          const mdxModule = await import(`../../../content/blog/${fileName}`) as MDXPost
          
          const post: BlogPost = {
            slug,
            title: mdxModule.meta.title || '',
            description: mdxModule.meta.description || '',
            date: mdxModule.meta.date || '',
            tags: mdxModule.meta.tags || [],
            cover: mdxModule.meta.cover,
            draft: mdxModule.meta.draft || false
          }
          
          return post
        } catch (error) {
          console.warn(`Failed to import ${fileName}:`, error)
          return null
        }
      })
  )

  // Filter out null results and draft posts, then sort by date
  return allPostsData
    .filter((post): post is BlogPost => post !== null && !post.draft)
    .sort((a, b) => {
      if (!a || !b) return 0
      if (a.date < b.date) {
        return 1
      } else {
        return -1
      }
    })
}

export async function getBlogPost(slug: string): Promise<BlogPost | null> {
  try {
    const fullPath = path.join(postsDirectory, `${slug}.mdx`)
    
    if (!fs.existsSync(fullPath)) {
      return null
    }

    // Dynamic import of MDX file
    const mdxModule = await import(`../../../content/blog/${slug}.mdx`) as MDXPost
    
    return {
      slug,
      title: mdxModule.meta.title || '',
      description: mdxModule.meta.description || '',
      date: mdxModule.meta.date || '',
      tags: mdxModule.meta.tags || [],
      cover: mdxModule.meta.cover,
      draft: mdxModule.meta.draft || false
    }
  } catch (error) {
    console.error(`Error reading blog post ${slug}:`, error)
    return null
  }
}

export async function getBlogPostComponent(slug: string): Promise<React.ComponentType | null> {
  try {
    const fullPath = path.join(postsDirectory, `${slug}.mdx`)
    
    if (!fs.existsSync(fullPath)) {
      return null
    }

    // Dynamic import of MDX file
    const mdxModule = await import(`../../../content/blog/${slug}.mdx`) as MDXPost
    
    return mdxModule.default
  } catch (error) {
    console.error(`Error importing blog post component ${slug}:`, error)
    return null
  }
}

export function getBlogPostSlugs(): string[] {
  if (!fs.existsSync(postsDirectory)) {
    return []
  }

  const fileNames = fs.readdirSync(postsDirectory)
  return fileNames
    .filter(fileName => fileName.endsWith('.mdx'))
    .map(fileName => fileName.replace(/\.mdx$/, ''))
}