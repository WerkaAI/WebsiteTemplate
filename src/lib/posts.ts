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
  content: string
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

      // Read markdown file as string
      const fullPath = path.join(postsDirectory, fileName)
      const fileContents = fs.readFileSync(fullPath, 'utf8')

      // Use gray-matter to parse the post metadata section
      const matterResult = matter(fileContents)

      // Extract meta from content if it exists as export
      let meta = matterResult.data
      if (Object.keys(meta).length === 0) {
        // Try to extract meta from export statement
        const metaMatch = fileContents.match(/export const meta = ({[\s\S]*?})/m)
        if (metaMatch) {
          try {
            // Simple eval of the meta object (safe in this context)
            meta = eval(`(${metaMatch[1]})`)
          } catch (error) {
            console.warn(`Failed to parse meta from ${fileName}:`, error)
          }
        }
      }

      return {
        slug,
        title: meta.title || '',
        description: meta.description || '',
        date: meta.date || '',
        tags: meta.tags || [],
        cover: meta.cover,
        content: matterResult.content
      } as BlogPost
    })

  // Sort posts by date in descending order
  return allPostsData.sort((a, b) => {
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

    const fileContents = fs.readFileSync(fullPath, 'utf8')
    const matterResult = matter(fileContents)

    // Extract meta from export statement
    let meta = matterResult.data
    if (Object.keys(meta).length === 0) {
      const metaMatch = fileContents.match(/export const meta = ({[\s\S]*?})/m)
      if (metaMatch) {
        try {
          meta = eval(`(${metaMatch[1]})`)
        } catch (error) {
          console.warn(`Failed to parse meta from ${slug}.mdx:`, error)
        }
      }
    }

    return {
      slug,
      title: meta.title || '',
      description: meta.description || '',
      date: meta.date || '',
      tags: meta.tags || [],
      cover: meta.cover,
      content: matterResult.content
    }
  } catch (error) {
    console.error(`Error reading blog post ${slug}:`, error)
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