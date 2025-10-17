"use client";

import { useState } from "react";
import Link from "next/link";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Image from 'next/image';
// No import needed
import { Calendar, Clock, Search } from "lucide-react";
import { format } from 'date-fns';
import { pl } from 'date-fns/locale';

interface BlogListingProps {
  posts: Array<{ slug: string; meta: any }>
}

export default function BlogListing({ posts }: BlogListingProps) {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredPosts = posts.filter(post =>
    post.meta.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (post.meta.description && post.meta.description.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="container-spacing">
      <div className="text-center space-y-4 mb-16">
        <h1 className="text-4xl lg:text-5xl font-bold text-foreground" data-testid="text-blog-title">
          Blog: <span className="text-primary dark:text-primary-foreground">Prawo Pracy w Pigułce</span>
        </h1>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto" data-testid="text-blog-description">
          Praktyczne poradniki o Kodeksie Pracy napisane prostym językiem. 
          Bez żargonu prawniczego, same konkretne wskazówki.
        </p>
      </div>
      
      {/* Search */}
      <div className="max-w-md mx-auto mb-12">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
          <Input 
            placeholder="Szukaj artykułów..." 
            className="pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            data-testid="input-blog-search"
          />
        </div>
      </div>
      
      {/* Blog Posts Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredPosts.map((post) => (
          <Card key={post.slug} className="hover:shadow-lg transition-shadow" data-testid={`card-post-${post.slug}`}>
            {post.meta.cover && (
              <div className="relative w-full h-48 bg-muted rounded-t-xl overflow-hidden">
                <Image
                  src={post.meta.cover}
                  alt={post.meta.title}
                  fill
                  className="object-cover"
                  sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                  data-testid={`img-post-${post.slug}`}
                />
              </div>
            )}
            <CardHeader className="space-y-3">
              <div className="flex items-center text-sm text-muted-foreground">
                <Calendar className="w-4 h-4 mr-2" />
                <span data-testid={`text-date-${post.slug}`}>
                  {format(new Date(post.meta.date), 'dd MMMM yyyy', { locale: pl })}
                </span>
                <span className="mx-2">•</span>
                <Clock className="w-4 h-4 mr-2" />
                <span data-testid={`text-read-time-${post.slug}`}>~5 min czytania</span>
              </div>
              <h2 className="text-xl font-semibold text-foreground" data-testid={`text-title-${post.slug}`}>
                <Link href={`/blog/${post.slug}`}>
                  {post.meta.title}
                </Link>
              </h2>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground" data-testid={`text-excerpt-${post.slug}`}>
                {post.meta.description}
              </p>
              <div className="flex items-center justify-between">
                {post.meta.tags && post.meta.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {post.meta.tags.slice(0, 2).map((tag: string) => (
                      <Badge key={tag} variant="secondary" data-testid={`badge-tag-${tag}`}>
                        {tag}
                      </Badge>
                    ))}
                  </div>
                )}
                <Link href={`/blog/${post.slug}`}>
                  <Button variant="ghost" size="sm" data-testid={`button-read-more-${post.slug}`}>
                    Czytaj więcej →
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      
      {/* Newsletter Signup */}
      <div className="bg-muted rounded-2xl p-8 text-center mt-16">
        <h3 className="text-2xl font-semibold text-foreground mb-4" data-testid="text-newsletter-title">
          Bądź na bieżąco z prawem pracy
        </h3>
        <p className="text-muted-foreground mb-6 max-w-2xl mx-auto" data-testid="text-newsletter-description">
          Otrzymuj najnowsze artykuły o Kodeksie Pracy, praktyczne checklisty i ostrzeżenia 
          o zmianach w prawie. Bez spamu, tylko wartościowe treści.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
          <Input 
            type="email" 
            placeholder="Twój adres email" 
            className="flex-1"
            data-testid="input-newsletter-email"
          />
          <Button className="bg-primary text-primary-foreground hover:bg-primary/90" data-testid="button-newsletter-signup">
            Zapisz się
          </Button>
        </div>
        
        <p className="text-sm text-muted-foreground mt-4" data-testid="text-newsletter-bonus">
          Wyślemy Ci darmowy e-book &quot;10 Najczęstszych Błędów w Grafikach&quot;
        </p>
      </div>
    </div>
  );
}