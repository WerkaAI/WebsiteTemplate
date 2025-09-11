import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

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

export interface MDXPost {
  default: React.ComponentType
  meta: BlogPost
}

export function getBlogPosts(): BlogPost[] {
  // Check if directory exists
  if (!fs.existsSync(postsDirectory)) {
    return []
  }

  const fileNames = fs.readdirSync(postsDirectory)
  
  const allPostsData = fileNames
    .filter(fileName => fileName.endsWith('.mdx'))
    .map(fileName => {
      // Remove ".mdx" from file name to get slug
      const slug = fileName.replace(/\.mdx$/, '')

      try {
        // Read file and parse frontmatter
        const fullPath = path.join(postsDirectory, fileName)
        const fileContents = fs.readFileSync(fullPath, 'utf8')
        const matterResult = matter(fileContents)
        
        const post: BlogPost = {
          slug,
          title: matterResult.data.title || '',
          description: matterResult.data.description || '',
          date: matterResult.data.date || '',
          tags: matterResult.data.tags || [],
          cover: matterResult.data.cover,
          draft: matterResult.data.draft || false
        }
        
        return post
      } catch (error) {
        console.warn(`Failed to parse ${fileName}:`, error)
        return null
      }
    })

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

export function getBlogPost(slug: string): BlogPost | null {
  try {
    const fullPath = path.join(postsDirectory, `${slug}.mdx`)
    
    if (!fs.existsSync(fullPath)) {
      return null
    }

    // Read file and parse frontmatter
    const fileContents = fs.readFileSync(fullPath, 'utf8')
    const matterResult = matter(fileContents)
    
    return {
      slug,
      title: matterResult.data.title || '',
      description: matterResult.data.description || '',
      date: matterResult.data.date || '',
      tags: matterResult.data.tags || [],
      cover: matterResult.data.cover,
      draft: matterResult.data.draft || false
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
    const mdxModule = await import(`../../content/blog/${slug}.mdx`) as MDXPost
    
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