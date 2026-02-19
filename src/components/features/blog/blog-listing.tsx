"use client";

import { useState } from "react";
import Link from "next/link";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Image from 'next/image';
import { Calendar, Clock, Search, Mail, ArrowRight, BookOpen } from "lucide-react";
import { format } from 'date-fns';
import { pl } from 'date-fns/locale';
import { cn } from "@/lib/utils";

interface BlogListingProps {
  posts: Array<{ slug: string; meta: any }>
}

export default function BlogListing({ posts }: BlogListingProps) {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredPosts = posts.filter(post =>
    post.meta.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (post.meta.description && post.meta.description.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const featuredPost = filteredPosts.length > 0 && !searchTerm ? filteredPosts[0] : null;
  const gridPosts = featuredPost ? filteredPosts.slice(1) : filteredPosts;

  return (
    <div className="container-spacing">
      <div className="text-center space-y-6 mb-16 relative">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-emerald-500/10 blur-[100px] rounded-full pointer-events-none" />

        <div className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-4 py-1.5 text-sm font-medium text-emerald-800 dark:border-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-200 relative z-10">
          <BookOpen className="h-4 w-4" />
          <span>Baza wiedzy</span>
        </div>

        <h1 className="text-4xl lg:text-5xl font-bold text-foreground relative z-10" data-testid="text-blog-title">
          Prawo Pracy w <span className="text-emerald-600 dark:text-emerald-400">Pigułce</span>
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto relative z-10 leading-relaxed" data-testid="text-blog-description">
          Praktyczne poradniki o Kodeksie Pracy napisane prostym językiem.
          Bez żargonu prawniczego, same konkretne wskazówki.
        </p>
      </div>

      {/* Search */}
      <div className="max-w-md mx-auto mb-16 relative z-10">
        <div className="relative group">
          <div className="absolute -inset-0.5 bg-gradient-to-r from-emerald-500 to-blue-500 rounded-lg blur opacity-20 group-hover:opacity-40 transition duration-1000 group-hover:duration-200" />
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <Input
              placeholder="Czego szukasz? np. 'grafik', 'urlop'..."
              className="pl-10 h-12 bg-white/80 dark:bg-slate-900/80 border-slate-200 dark:border-slate-800 backdrop-blur-sm transition-all focus:ring-2 focus:ring-emerald-500/20"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              data-testid="input-blog-search"
            />
          </div>
        </div>
      </div>

      {/* Featured Post */}
      {featuredPost && (
        <div className="mb-16">
          <Link href={`/blog/${featuredPost.slug}`} className="group block">
            <article className="relative overflow-hidden rounded-3xl glass-premium transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 grid md:grid-cols-2 gap-8 p-0">
              <div className="relative h-64 md:h-full min-h-[300px] overflow-hidden">
                {featuredPost.meta.cover ? (
                  <Image
                    src={featuredPost.meta.cover}
                    alt={featuredPost.meta.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="(min-width: 1024px) 50vw, 100vw"
                    priority
                  />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-emerald-100 to-blue-50 dark:from-emerald-900/20 dark:to-blue-900/20" />
                )}
                <div className="absolute top-4 left-4">
                  <Badge className="bg-emerald-500 hover:bg-emerald-600 text-white border-0 shadow-lg">
                    Najnowszy
                  </Badge>
                </div>
              </div>
              <div className="p-8 md:py-12 md:pr-12 flex flex-col justify-center">
                <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
                  <span className="flex items-center gap-1.5">
                    <Calendar className="w-4 h-4" />
                    {format(new Date(featuredPost.meta.date), 'dd MMM yyyy', { locale: pl })}
                  </span>
                  <span className="w-1 h-1 rounded-full bg-emerald-500" />
                  <span className="flex items-center gap-1.5">
                    <Clock className="w-4 h-4" />
                    ~5 min
                  </span>
                </div>

                <h2 className="text-3xl font-bold text-foreground mb-4 group-hover:text-emerald-600 transition-colors">
                  {featuredPost.meta.title}
                </h2>

                <p className="text-lg text-muted-foreground mb-6 line-clamp-3">
                  {featuredPost.meta.description}
                </p>

                <div className="flex items-center gap-2 mt-auto">
                  <span className="text-sm font-semibold text-emerald-600 group-hover:underline underline-offset-4">
                    Czytaj artykuł
                  </span>
                  <ArrowRight className="w-4 h-4 text-emerald-600 transition-transform group-hover:translate-x-1" />
                </div>
              </div>
            </article>
          </Link>
        </div>
      )}

      {/* Blog Posts Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {gridPosts.map((post, index) => (
          <Link key={post.slug} href={`/blog/${post.slug}`} className="group h-full">
            <article
              className="flex flex-col h-full rounded-2xl glass-premium overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
              data-animate="rise"
              data-animate-delay={`${index * 100}`}
            >
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
                  <span className="w-1 h-1 rounded-full bg-emerald-500/50" />
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5" />
                    5 min
                  </span>
                </div>

                <h3 className="text-xl font-bold text-foreground mb-3 group-hover:text-emerald-600 transition-colors line-clamp-2">
                  {post.meta.title}
                </h3>

                <p className="text-sm text-muted-foreground mb-4 line-clamp-3 flex-1">
                  {post.meta.description}
                </p>

                <div className="flex items-center justify-between mt-4 pt-4 border-t border-border/50">
                  <div className="flex flex-wrap gap-2">
                    {post.meta.tags?.slice(0, 2).map((tag: string) => (
                      <span key={tag} className="text-xs px-2 py-1 rounded-md bg-secondary text-secondary-foreground font-medium">
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </article>
          </Link>
        ))}
      </div>

      {gridPosts.length === 0 && !featuredPost && (
        <div className="text-center py-20">
          <p className="text-lg text-muted-foreground">Nie znaleziono artykułów pasujących do wyszukiwania.</p>
        </div>
      )}


    </div>
  );
}