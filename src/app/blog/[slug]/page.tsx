import { Metadata } from 'next'
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Navigation from "@/components/navigation";
import Footer from "@/components/footer";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { getBlogPost, getBlogPostSlugs, getBlogPostComponent } from "@/lib/posts";
import { Calendar, Clock, ArrowLeft } from "lucide-react";
import { format } from 'date-fns';
import { pl } from 'date-fns/locale';
import Image from 'next/image';
import fs from 'fs';
import path from 'path';

interface BlogPostPageProps {
  params: {
    slug: string
  }
}

export async function generateStaticParams() {
  const slugs = getBlogPostSlugs();
  return slugs.map((slug) => ({
    slug: slug,
  }));
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const post = await getBlogPost(params.slug);

  if (!post) {
    return {
      title: 'Post nie znaleziony - AutoŻaba',
      description: 'Szukany post nie istnieje.'
    };
  }

  return {
    title: `${post.title} | AutoŻaba Blog`,
    description: post.description,
    openGraph: {
      title: post.title,
      description: post.description,
      type: 'article',
      publishedTime: post.date,
      images: post.cover ? [post.cover] : undefined,
    }
  };
}

export default async function BlogPost({ params }: BlogPostPageProps) {
  const post = await getBlogPost(params.slug);
  const PostComponent = await getBlogPostComponent(params.slug);
  
  if (!post || !PostComponent) {
    notFound();
  }

  // Check if cover image exists
  const coverImageExists = post.cover && fs.existsSync(path.join(process.cwd(), 'public', post.cover));

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main className="section-padding">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link href="/blog">
            <Button variant="ghost" className="mb-8" data-testid="button-back-to-blog">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Powrót do bloga
            </Button>
          </Link>
          
          <article className="space-y-8">
            <header className="space-y-4">
              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <div className="flex items-center">
                  <Calendar className="w-4 h-4 mr-2" />
                  <time dateTime={post.date} data-testid="text-post-date">
                    {format(new Date(post.date), 'dd MMMM yyyy', { locale: pl })}
                  </time>
                </div>
                <div className="flex items-center">
                  <Clock className="w-4 h-4 mr-2" />
                  <span data-testid="text-read-time">~5 min czytania</span>
                </div>
              </div>
              
              <h1 className="text-4xl lg:text-5xl font-bold text-foreground leading-tight" data-testid="text-post-title">
                {post.title}
              </h1>
              
              <p className="text-xl text-muted-foreground leading-relaxed" data-testid="text-post-description">
                {post.description}
              </p>
              
              {post.tags && post.tags.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {post.tags.map((tag: string) => (
                    <Badge key={tag} variant="secondary" data-testid={`badge-post-tag-${tag}`}>
                      {tag}
                    </Badge>
                  ))}
                </div>
              )}
            </header>
            
            {/* Cover Image or Placeholder */}
            <div className="w-full h-64 lg:h-96 rounded-2xl overflow-hidden">
              {coverImageExists && post.cover ? (
                <Image
                  src={post.cover}
                  alt={post.title}
                  width={800}
                  height={400}
                  className="w-full h-full object-cover"
                  data-testid="img-post-cover"
                />
              ) : (
                <div className="w-full h-full aspect-[16/9] bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-800 dark:to-slate-900 flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-slate-400 dark:text-slate-600 text-lg font-medium">
                      Brak okładki
                    </div>
                  </div>
                </div>
              )}
            </div>
            
            <div className="prose prose-lg max-w-none" data-testid="content-post-body">
              <PostComponent />
            </div>
          </article>
        </div>
      </main>
      <Footer />
    </div>
  );
}