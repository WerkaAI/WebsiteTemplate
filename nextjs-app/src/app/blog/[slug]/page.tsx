import { notFound } from 'next/navigation';
import Link from 'next/link';
import Navigation from "@/components/navigation";
import Footer from "@/components/footer";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { blogPosts } from "@/data/blog-posts";
import { Calendar, Clock, ArrowLeft } from "lucide-react";

export async function generateStaticParams() {
  return blogPosts.map((post) => ({
    slug: post.slug,
  }));
}

export default function BlogPost({ params }: { params: { slug: string } }) {
  const post = blogPosts.find(p => p.slug === params.slug);
  
  if (!post) {
    notFound();
  }

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
                  <span data-testid="text-post-date">{post.date}</span>
                </div>
                <div className="flex items-center">
                  <Clock className="w-4 h-4 mr-2" />
                  <span data-testid="text-read-time">{post.readTime}</span>
                </div>
              </div>
              
              <h1 className="text-4xl lg:text-5xl font-bold text-foreground leading-tight" data-testid="text-post-title">
                {post.title}
              </h1>
              
              <p className="text-xl text-muted-foreground leading-relaxed" data-testid="text-post-excerpt">
                {post.excerpt}
              </p>
              
              <Badge variant="secondary" data-testid="badge-post-category">{post.category}</Badge>
            </header>
            
            <div className="w-full h-64 lg:h-96 bg-muted rounded-2xl overflow-hidden">
              <img 
                src={post.image} 
                alt={post.title}
                className="w-full h-full object-cover"
                data-testid="img-post-featured"
              />
            </div>
            
            <div className="prose prose-lg max-w-none" data-testid="content-post-body">
              <div dangerouslySetInnerHTML={{ __html: post.content }} />
            </div>
          </article>
        </div>
      </main>
      <Footer />
    </div>
  );
}