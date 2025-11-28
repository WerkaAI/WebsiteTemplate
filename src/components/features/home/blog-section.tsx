import Link from 'next/link'
import Image from 'next/image'
import { format } from 'date-fns'
import { pl } from 'date-fns/locale'
import { Calendar, Clock, ArrowRight } from 'lucide-react'
import { getAllPosts } from '@/lib/posts'
import { Button } from '@/components/ui/button'

export async function BlogSection() {
    const posts = await getAllPosts()
    const latestPosts = posts
        .filter(post => !post.meta.draft)
        .sort((a, b) => new Date(b.meta.date).getTime() - new Date(a.meta.date).getTime())
        .slice(0, 3)

    return (
        <section className="py-24 bg-slate-50 dark:bg-slate-900/50">
            <div className="container px-4 md:px-6">
                <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
                    <div className="inline-flex items-center rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-sm font-medium text-emerald-800 dark:border-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-200">
                        <span className="flex h-2 w-2 rounded-full bg-emerald-600 mr-2"></span>
                        Baza wiedzy
                    </div>
                    <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                        Najnowsze z bloga
                    </h2>
                    <p className="max-w-[900px] text-slate-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-slate-400">
                        Praktyczne poradniki i aktualności z zakresu prawa pracy i zarządzania w Żabce.
                    </p>
                </div>

                <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                    {latestPosts.map((post) => (
                        <Link key={post.slug} href={`/blog/${post.slug}`} className="group h-full">
                            <article className="flex flex-col h-full rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
                                <div className="relative w-full h-52 overflow-hidden bg-muted">
                                    {post.meta.cover ? (
                                        <Image
                                            src={post.meta.cover}
                                            alt={post.meta.title}
                                            fill
                                            className="object-cover transition-transform duration-500 group-hover:scale-105"
                                            sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                                        />
                                    ) : (
                                        <div className="w-full h-full bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-800 dark:to-slate-900" />
                                    )}
                                </div>

                                <div className="flex flex-col flex-1 p-6">
                                    <div className="flex items-center gap-3 text-xs text-muted-foreground mb-3">
                                        <span className="flex items-center gap-1">
                                            <Calendar className="w-3.5 h-3.5" />
                                            {format(new Date(post.meta.date), 'dd MMM', { locale: pl })}
                                        </span>
                                        {post.meta.readTime && (
                                            <>
                                                <span className="w-1 h-1 rounded-full bg-emerald-500/50" />
                                                <span className="flex items-center gap-1">
                                                    <Clock className="w-3.5 h-3.5" />
                                                    {post.meta.readTime}
                                                </span>
                                            </>
                                        )}
                                    </div>

                                    <h3 className="text-xl font-bold text-foreground mb-3 group-hover:text-emerald-600 transition-colors line-clamp-2">
                                        {post.meta.title}
                                    </h3>

                                    <p className="text-sm text-muted-foreground mb-4 line-clamp-3 flex-1">
                                        {post.meta.description}
                                    </p>

                                    <div className="flex items-center justify-between mt-4 pt-4 border-t border-border/50">
                                        <span className="text-sm font-semibold text-emerald-600 group-hover:underline underline-offset-4 flex items-center gap-1">
                                            Czytaj więcej <ArrowRight className="w-4 h-4" />
                                        </span>
                                    </div>
                                </div>
                            </article>
                        </Link>
                    ))}
                </div>

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
