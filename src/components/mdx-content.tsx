import { getBlogPost } from '@/lib/posts'
import { notFound } from 'next/navigation'

interface MDXContentProps {
  slug: string
}

export function MDXContent({ slug }: MDXContentProps) {
  const post = getBlogPost(slug)

  if (!post) {
    notFound()
  }

  // For now, render the content as markdown-like text
  // In a full implementation, this would dynamically import and render the MDX file
  return (
    <div className="prose prose-lg max-w-none">
      <div dangerouslySetInnerHTML={{ __html: post.content.replace(/\n/g, '<br/>').replace(/^# /gm, '<h1>').replace(/^## /gm, '<h2>').replace(/^### /gm, '<h3>') }} />
    </div>
  )
}