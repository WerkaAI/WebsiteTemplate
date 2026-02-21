import Link from 'next/link'
import { getAllPosts } from '@/lib/posts'
import { Button } from '@/components/ui/button'
import BlogGrid from './blog-grid'

export async function BlogSection() {
    const posts = await getAllPosts()
    const latestPosts = posts
        .filter(post => !post.meta.draft)
        .sort((a, b) => new Date(b.meta.date).getTime() - new Date(a.meta.date).getTime())
        .slice(0, 3)

    return (
        <section className="py-24 bg-slate-50 dark:bg-slate-900/50 flex flex-col items-center">
            <div className="container-spacing w-full">
                <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
                    <div className="inline-flex items-center rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-sm font-medium text-emerald-800 dark:border-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-200">
                        <span className="flex h-2 w-2 rounded-full bg-emerald-600 mr-2"></span>
                        Baza wiedzy
                    </div>
                    <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                        Najnowsze z bloga
                    </h2>
                    <p className="max-w-[900px] text-slate-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-slate-400">
                        Praktyczne poradniki i aktualności z zakresu operacji, planowania i rozwoju produktu.
                    </p>
                </div>

                <BlogGrid posts={latestPosts} />

                <div className="mt-12 text-center">
                    <Button asChild variant="outline" size="lg" className="rounded-full px-8">
                        <Link href="/blog">
                            Zobacz wszystkie artykuły
                        </Link>
                    </Button>
                </div>
            </div>
        </section>
    )
}
