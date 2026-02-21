import React from 'react'
import { ChecklistItem } from '@/components/mdx/checklist-item'
import { BlogHero } from '@/components/features/blog/blog-hero'
import { BlogSection } from '@/components/features/blog/blog-section'
import { BlogChecklist } from '@/components/features/blog/blog-checklist'
import { BlogCallout } from '@/components/features/blog/blog-callout'
import { TLDR } from '@/components/features/blog/tldr'
import { BlogGrid } from '@/components/features/blog/blog-grid'
import { BlogGridCard } from '@/components/features/blog/blog-grid-card'

import { TutorialStep } from '@/components/features/tutorial/tutorial-step'
import { InteractiveChecklist } from '@/components/mdx/interactive-checklist'
import { ProgressBar } from '@/components/mdx/progress-bar'
import { FAQAccordion } from '@/components/mdx/faq-accordion'
import { Tip } from '@/components/mdx/tip'
import { VideoPlayer } from '@/components/mdx/video-player'
import { MDXTabs } from '@/components/mdx/tabs'
import { Callout } from '@/components/mdx/callout'
import { ABTest } from '@/components/mdx/ab-test'

function Anchor(props: React.ComponentProps<'a'>) {
  const { href = '', ...rest } = props
  const isExternal = /^https?:\/\//i.test(href)
  return (
    <a
      href={href}
      target={isExternal ? '_blank' : rest.target}
      rel={isExternal ? 'noopener noreferrer' : rest.rel}
      {...rest}
    />
  )
}

function Img(props: React.ComponentProps<'img'>) {
  // Keep native img in MDX to avoid hydration mismatch; set sensible defaults
  const { loading = 'lazy', decoding = 'async', alt = '', ...rest } = props
  return <img loading={loading} decoding={decoding} alt={alt} {...rest} />
}

export function useMDXComponents(components: any) {
  return {
    h1: (props: any) => <h1 {...props} />,
    h2: (props: any) => <h2 {...props} />,
    h3: (props: any) => <h3 {...props} />,
    h4: (props: any) => <h4 {...props} />,
    h5: (props: any) => <h5 {...props} />,
    h6: (props: any) => <h6 {...props} />,
    p: (props: any) => <p {...props} />,
    a: (props: any) => <Anchor {...props} />,
    ul: (props: any) => <ul {...props} />,
    ol: (props: any) => <ol {...props} />,
    li: (props: any) => <ChecklistItem {...props} />,
    img: (props: any) => <Img {...props} />,
    pre: (props: any) => <pre {...props} />,
    code: (props: any) => <code {...props} />,
    BlogHero,
    BlogSection,
    BlogChecklist,
    BlogCallout,
    TLDR,
    BlogGrid,
    BlogGridCard,
    TutorialStep,
    InteractiveChecklist,
    ProgressBar,
    FAQAccordion,
    Tip,
    VideoPlayer,
    Tabs: MDXTabs,
    Callout,
    ABTest,
    ...components,
  };
}