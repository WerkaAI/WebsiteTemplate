import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Calendar, Clock } from "lucide-react";
import { Link } from "wouter";
import { blogPosts } from "@/data/blog-posts";

export default function BlogSection() {
  // Get first 3 posts for preview
  const featuredPosts = blogPosts.slice(0, 3);

  return (
    <section id="blog" className="section-padding bg-white">
      <div className="container-spacing">
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-foreground" data-testid="text-blog-section-title">
            Blog: <span className="text-primary">Prawo Pracy w Pigułce</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto" data-testid="text-blog-section-subtitle">
            Praktyczne poradniki o Kodeksie Pracy napisane prostym językiem. 
            Bez żargonu prawniczego, same konkretne wskazówki.
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {featuredPosts.map((post) => (
            <Card key={post.slug} className="hover:calm-shadow-lg transition-shadow" data-testid={`card-blog-preview-${post.slug}`}>
              <div className="w-full h-48 bg-muted rounded-t-xl overflow-hidden">
                <img 
                  src={post.image} 
                  alt={post.title}
                  className="w-full h-full object-cover"
                  data-testid={`img-blog-preview-${post.slug}`}
                />
              </div>
              <CardHeader className="space-y-3">
                <div className="flex items-center text-sm text-muted-foreground">
                  <Calendar className="w-4 h-4 mr-2" />
                  <span data-testid={`text-blog-date-${post.slug}`}>{post.date}</span>
                  <span className="mx-2">•</span>
                  <Clock className="w-4 h-4 mr-2" />
                  <span data-testid={`text-blog-read-time-${post.slug}`}>{post.readTime}</span>
                </div>
                <h3 className="text-xl font-semibold text-foreground hover:text-primary transition-colors" data-testid={`text-blog-title-${post.slug}`}>
                  <Link href={`/blog/${post.slug}`}>
                    {post.title}
                  </Link>
                </h3>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground" data-testid={`text-blog-excerpt-${post.slug}`}>
                  {post.excerpt}
                </p>
                <div className="flex items-center justify-between">
                  <Badge variant="secondary" data-testid={`badge-blog-category-${post.slug}`}>
                    {post.category}
                  </Badge>
                  <Link href={`/blog/${post.slug}`}>
                    <Button variant="ghost" size="sm" data-testid={`button-blog-read-more-${post.slug}`}>
                      Czytaj więcej →
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        
        <div className="text-center mb-12">
          <Link href="/blog">
            <Button variant="outline" size="lg" data-testid="button-view-all-blog-posts">
              Zobacz wszystkie artykuły
            </Button>
          </Link>
        </div>
        
        {/* Newsletter signup */}
        <div className="bg-muted rounded-2xl p-8 text-center">
          <h3 className="text-2xl font-semibold text-foreground mb-4" data-testid="text-newsletter-section-title">
            Bądź na bieżąco z prawem pracy
          </h3>
          <p className="text-muted-foreground mb-6 max-w-2xl mx-auto" data-testid="text-newsletter-section-description">
            Otrzymuj najnowsze artykuły o Kodeksie Pracy, praktyczne checklisty i ostrzeżenia 
            o zmianach w prawie. Bez spamu, tylko wartościowe treści.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <Input 
              type="email" 
              placeholder="Twój adres email" 
              className="flex-1"
              data-testid="input-newsletter-section-email"
            />
            <Button 
              className="bg-primary text-primary-foreground hover:bg-primary/90"
              data-testid="button-newsletter-section-signup"
            >
              Zapisz się
            </Button>
          </div>
          
          <p className="text-sm text-muted-foreground mt-4" data-testid="text-newsletter-section-bonus">
            Wyślemy Ci darmowy e-book "10 Najczęstszych Błędów w Grafikach"
          </p>
        </div>
      </div>
    </section>
  );
}
