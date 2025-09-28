import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Calendar, Clock } from "lucide-react";
import Link from "next/link";
import Image from 'next/image';
import { getAllPosts } from "@/lib/posts";
import { format } from "date-fns";
import { pl } from "date-fns/locale";

export default async function BlogSection() {
  const posts = await getAllPosts();
  const featuredPosts = posts.slice(0, 3);

  return (
  <section id="blog" className="section-padding bg-white dark:bg-background">
      <div className="container-spacing">
        <div className="text-center space-y-4 mb-16" data-animate>
          <h2 className="text-3xl lg:text-4xl font-bold text-foreground" data-testid="text-blog-section-title">
            Blog: <span className="text-primary">Prawo Pracy w Pigułce</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto copy-max" data-testid="text-blog-section-subtitle">
            Praktyczne poradniki o Kodeksie Pracy napisane prostym językiem. 
            Bez żargonu prawniczego, same konkretne wskazówki.
          </p>
        </div>
        
  <div className="grid md:grid-cols-3 gap-8 mb-12">
          {featuredPosts.length === 0 && (
            <div className="col-span-full text-center text-muted-foreground">
              Pierwsze artykuły są w drodze. Zajrzyj do nas wkrótce!
            </div>
          )}
          {featuredPosts.map((post, index) => {
            const { slug, meta } = post;
            const cover = meta.cover as string | undefined;
            const formattedDate = meta.date ? format(new Date(meta.date), "d MMMM yyyy", { locale: pl }) : null;
            const tag = Array.isArray(meta.tags) && meta.tags.length > 0 ? meta.tags[0] : "Prawo pracy";
            const readTime = meta.readTime ?? "~5 min czytania";

            return (
            <Card 
              key={slug} 
              data-animate="rise"
              data-animate-delay={`${index * 120}`}
              className="hover:calm-shadow-lg transition-shadow bg-card dark:bg-slate-900/70 border border-border/70 dark:border-white/10"
              data-testid={`card-blog-preview-${slug}`}
            >
              <div className="tinted-media relative w-full h-48 bg-muted rounded-t-xl overflow-hidden">
                {cover ? (
                  <Image
                    src={cover}
                    alt={meta.title}
                    fill
                    className="object-cover"
                    sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                    data-testid={`img-blog-preview-${slug}`}
                  />
                ) : (
                  <div className="h-full w-full bg-gradient-to-br from-slate-200 via-slate-300 to-slate-400 dark:from-slate-800 dark:via-slate-900 dark:to-slate-950 flex items-center justify-center text-sm font-medium text-slate-500 dark:text-slate-300">
                    Brak okładki
                  </div>
                )}
              </div>
              <CardHeader className="space-y-3">
                <div className="flex items-center text-sm text-muted-foreground">
                  <Calendar className="w-4 h-4 mr-2" />
                  {formattedDate ? (
                    <span data-testid={`text-blog-date-${slug}`}>{formattedDate}</span>
                  ) : (
                    <span data-testid={`text-blog-date-${slug}`}>Bez daty</span>
                  )}
                  <span className="mx-2">•</span>
                  <Clock className="w-4 h-4 mr-2" />
                  <span data-testid={`text-blog-read-time-${slug}`}>{readTime}</span>
                </div>
                <h3 className="text-xl font-semibold text-foreground hover:text-primary transition-colors" data-testid={`text-blog-title-${slug}`}>
                  <Link href={`/blog/${slug}`}>
                    {meta.title}
                  </Link>
                </h3>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground copy-max" data-testid={`text-blog-excerpt-${slug}`}>
                  {meta.description ?? "Dowiedz się więcej o prawie pracy z AutoŻaba."}
                </p>
                <div className="flex items-center justify-between">
                  <Badge variant="secondary" className="dark:bg-slate-800 dark:text-slate-100" data-testid={`badge-blog-category-${slug}`}>
                    {tag}
                  </Badge>
                  <Link href={`/blog/${slug}`}>
                    <Button variant="ghost" size="sm" data-testid={`button-blog-read-more-${slug}`}>
                      Czytaj więcej →
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
            );
          })}
        </div>
        
        <div className="text-center mb-12" data-animate>
          <Link href="/blog">
            <Button variant="outline" size="lg" data-testid="button-view-all-blog-posts">
              Zobacz wszystkie artykuły
            </Button>
          </Link>
        </div>
        
        {/* Newsletter signup */}
  <div className="bg-muted rounded-2xl p-8 text-center" data-animate="rise" data-animate-delay="120">
          <h3 className="text-2xl font-semibold text-foreground mb-4" data-testid="text-newsletter-section-title">
            Bądź na bieżąco z prawem pracy
          </h3>
          <p className="text-muted-foreground mb-6 max-w-2xl mx-auto copy-max" data-testid="text-newsletter-section-description">
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
            Wyślemy Ci darmowy e-book &quot;10 Najczęstszych Błędów w Grafikach&quot;
          </p>
        </div>
      </div>
    </section>
  );
}
