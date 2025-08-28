import { useParams } from "wouter";
import Navigation from "@/components/navigation";
import Footer from "@/components/footer";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { blogPosts } from "@/data/blog-posts";
import { Calendar, Clock, ArrowLeft, Search } from "lucide-react";
import { Link } from "wouter";

export default function Blog() {
  const params = useParams();
  const slug = params.slug;

  // If we have a slug, show single post
  if (slug) {
    const post = blogPosts.find(p => p.slug === slug);
    if (!post) {
      return (
        <div className="min-h-screen bg-background">
          <Navigation />
          <main className="section-padding">
            <div className="container-spacing">
              <div className="text-center">
                <h1 className="text-4xl font-bold text-foreground mb-4">Artykuł nie znaleziony</h1>
                <Link href="/blog">
                  <Button variant="outline">
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Powrót do bloga
                  </Button>
                </Link>
              </div>
            </div>
          </main>
          <Footer />
        </div>
      );
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

  // Show blog listing
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main className="section-padding">
        <div className="container-spacing">
          <div className="text-center space-y-4 mb-16">
            <h1 className="text-4xl lg:text-5xl font-bold text-foreground" data-testid="text-blog-title">
              Blog: <span className="text-primary">Prawo Pracy w Pigułce</span>
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
                data-testid="input-blog-search"
              />
            </div>
          </div>
          
          {/* Blog Posts Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogPosts.map((post) => (
              <Card key={post.slug} className="hover:shadow-lg transition-shadow" data-testid={`card-post-${post.slug}`}>
                <div className="w-full h-48 bg-muted rounded-t-xl overflow-hidden">
                  <img 
                    src={post.image} 
                    alt={post.title}
                    className="w-full h-full object-cover"
                    data-testid={`img-post-${post.slug}`}
                  />
                </div>
                <CardHeader className="space-y-3">
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Calendar className="w-4 h-4 mr-2" />
                    <span data-testid={`text-date-${post.slug}`}>{post.date}</span>
                    <span className="mx-2">•</span>
                    <Clock className="w-4 h-4 mr-2" />
                    <span data-testid={`text-read-time-${post.slug}`}>{post.readTime}</span>
                  </div>
                  <h3 className="text-xl font-semibold text-foreground hover:text-primary transition-colors" data-testid={`text-title-${post.slug}`}>
                    <Link href={`/blog/${post.slug}`}>
                      {post.title}
                    </Link>
                  </h3>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-muted-foreground" data-testid={`text-excerpt-${post.slug}`}>
                    {post.excerpt}
                  </p>
                  <div className="flex items-center justify-between">
                    <Badge variant="secondary" data-testid={`badge-category-${post.slug}`}>
                      {post.category}
                    </Badge>
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
              Wyślemy Ci darmowy e-book "10 Najczęstszych Błędów w Grafikach"
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
