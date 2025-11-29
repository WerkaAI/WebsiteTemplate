"use client";

import Link from 'next/link'
import Image from 'next/image'
import { format } from 'date-fns'
import { pl } from 'date-fns/locale'
import { Calendar, Clock, ArrowRight } from 'lucide-react'
import { motion } from 'framer-motion'

interface BlogPost {
    slug: string;
    meta: {
        title: string;
        date: string;
        description?: string;
        cover?: string;
        readTime?: string;
        draft?: boolean;
    };
}

interface BlogGridProps {
    posts: BlogPost[];
}

export default function BlogGrid({ posts }: BlogGridProps) {
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.15
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.6,
                ease: "easeOut"
            }
        }
    };

    return (
        <motion.div
            className="grid gap-8 md:grid-cols-2 lg:grid-cols-3"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={containerVariants}
        >
            {posts.map((post) => (
                <motion.div key={post.slug} variants={itemVariants} className="h-full">
                    <Link href={`/blog/${post.slug}`} className="group h-full block">
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
                </motion.div>
            ))}
        </motion.div>
    );
}
