export const runtime = "nodejs";
export const dynamic = "error"; // wymagamy SSG
import { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Navigation from "@/components/layout/navigation";
import Footer from "@/components/layout/footer";
import Link from "next/link";
import { Calendar, Clock, ArrowLeft, Share2 } from "lucide-react";
import { format } from "date-fns";
import { pl } from "date-fns/locale";
import { getAllSlugs, loadPost } from "@/lib/posts";
import ShareButtons from "@/components/features/blog/share-buttons";
import { getCspNonce } from "@/lib/security/csp";
import { APP_URLS } from "@/lib/config";
import { ReadingProgress } from "@/components/features/blog/reading-progress";
import { TableOfContents } from "@/components/features/blog/table-of-contents";

interface BlogPostPageProps {
  params: {
    slug: string;
  };
}

export async function generateStaticParams() {
  return (await getAllSlugs()).map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: BlogPostPageProps): Promise<Metadata> {
  const mod = await loadPost(params.slug).catch(() => null);
  if (!mod) return {};
  const { title, description, date, cover, tags } = mod.meta ?? {};
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:5000";

  return {
    title,
    description,
    alternates: {
      canonical: `/blog/${params.slug}`,
    },
    openGraph: {
      title,
      description,
      type: "article",
      publishedTime: date,
      url: `${baseUrl}/blog/${params.slug}`,
      images: cover ? [cover] : ["/og-image.jpg"],
      tags,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: cover ? [cover] : ["/og-image.jpg"],
    },
  };
}

export default async function Page({ params }: BlogPostPageProps) {
  const mod = await loadPost(params.slug).catch(() => null);
  if (!mod) return notFound();
  const { Component: Post, meta } = mod;
  const { title, description, cover, tags = [], readTime } = meta;
  const formattedDate = meta.date
    ? format(new Date(meta.date), "dd MMMM yyyy", { locale: pl })
    : null;
  const primaryTag =
    Array.isArray(tags) && tags.length > 0 ? tags[0] : undefined;
  const fallbackDescription =
    description ??
    "Praktyczne wskazówki ze świata organizacji pracy i prowadzenia zespołu.";

  const readLength =
    typeof readTime === "string" && readTime.trim().length > 0
      ? readTime
      : "~5 min czytania";

  const nonce = getCspNonce();

  // JSON-LD structured data
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:5000";
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: title,
    datePublished: meta.date,
    image: cover || "/og-image.jpg",
    author: {
      "@type": "Organization",
      name: "CoreStarter",
    },
    url: `${baseUrl}/blog/${params.slug}`,
  };

  // BreadcrumbList JSON-LD for SEO
  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Blog",
        item: `${baseUrl}/blog`,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: title,
        item: `${baseUrl}/blog/${params.slug}`,
      },
    ],
  };

  return (
    <div className="bg-background dark:bg-slate-950 min-h-screen flex flex-col">
      <ReadingProgress />
      <Navigation />
      <script
        nonce={nonce}
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        nonce={nonce}
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <div className="container mx-auto max-w-5xl px-4 md:px-6 py-8 lg:py-12 flex-1 w-full space-y-10">
        <div className="space-y-4">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Link href="/" className="inline-flex items-center gap-1">
              <ArrowLeft className="h-4 w-4" />
              Strona główna
            </Link>
            <span className="text-muted-foreground">/</span>
            <Link href="/blog">Blog</Link>
          </div>
          <section className="relative overflow-hidden rounded-3xl border border-border/60 dark:border-white/10 bg-slate-900 text-slate-50 shadow-xl">
            {cover && (
              <Image
                src={cover}
                alt={title}
                fill
                priority
                className="absolute inset-0 h-full w-full object-cover opacity-60"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 90vw, 1024px"
              />
            )}
            <div className="absolute inset-0 bg-gradient-to-br from-slate-900/95 via-slate-900/70 to-slate-900/80 dark:from-slate-950/95 dark:via-slate-950/75 dark:to-slate-950/90" />
            <div className="relative z-10 p-8 md:p-12 space-y-6">
              {primaryTag && (
                <Badge
                  variant="secondary"
                  className="bg-emerald-500/20 text-emerald-100 border border-emerald-400/30 w-fit"
                >
                  {primaryTag}
                </Badge>
              )}
              <div className="space-y-4 max-w-3xl">
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight tracking-tight text-white dark:text-white">
                  {title}
                </h1>
                <p className="text-base md:text-lg text-slate-200/90">
                  {fallbackDescription}
                </p>
              </div>
              <div className="flex flex-wrap items-center gap-4 text-sm text-slate-200/80">
                {formattedDate && (
                  <span className="inline-flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    {formattedDate}
                  </span>
                )}
                <span className="inline-flex items-center gap-2">
                  <Clock className="h-4 w-4" />
                  {readLength}
                </span>
                <span className="inline-flex items-center gap-2">
                  <Share2 className="h-4 w-4" />
                  Udostępnij
                </span>
              </div>
              {tags && tags.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {tags.map((tag: string) => (
                    <Badge
                      key={tag}
                      variant="outline"
                      className="border-white/30 text-slate-100/90 bg-white/10"
                    >
                      #{tag}
                    </Badge>
                  ))}
                </div>
              )}
              <div className="flex flex-wrap gap-3 pt-2">
                <Link href="/blog">
                  <Button
                    variant="secondary"
                    size="sm"
                    className="bg-white/15 text-white hover:bg-white/25"
                  >
                    Wróć do bloga
                  </Button>
                </Link>
                <Link href="#treść-artykułu">
                  <Button
                    size="sm"
                    className="bg-emerald-500 hover:bg-emerald-500/90 text-emerald-950"
                  >
                    Przejdź do treści
                  </Button>
                </Link>
              </div>
            </div>
          </section>
        </div>

        <div
          id="treść-artykułu"
          className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_250px]"
        >
          <article className="blog-prose prose prose-slate dark:prose-invert max-w-none md:prose-lg lg:prose-xl prose-headings:font-semibold prose-headings:scroll-mt-32 prose-a:no-underline prose-a:text-primary prose-a:font-semibold dark:prose-a:text-emerald-200 prose-img:rounded-2xl prose-pre:rounded-2xl prose-blockquote:border-l-4 prose-blockquote:border-emerald-400/70 prose-blockquote:bg-emerald-500/5 prose-blockquote:py-1 prose-blockquote:px-6 prose-blockquote:rounded-xl prose-code:text-emerald-600 dark:prose-code:text-emerald-300">
            <Post />
          </article>

          <aside className="lg:sticky lg:top-32 space-y-6">
            <div className="hidden lg:block rounded-2xl border border-border/60 dark:border-white/10 bg-card/60 dark:bg-slate-900/70 p-5 shadow-sm">
              <TableOfContents />
            </div>
            <div className="rounded-2xl border border-border/60 dark:border-white/10 bg-card/60 dark:bg-slate-900/70 p-5 shadow-sm">
              <h3 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
                Udostępnij artykuł
              </h3>
              <p className="mt-2 text-sm text-muted-foreground/80">
                Podziel się z zespołem lub innymi managerami.
              </p>
              <ShareButtons title={title} slug={params.slug} />
            </div>
            <div className="rounded-2xl border border-border/60 dark:border-white/10 bg-card/60 dark:bg-slate-900/70 p-5 shadow-sm">
              <h3 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
                Następny krok
              </h3>
              <p className="mt-2 text-sm text-muted-foreground/80">
                Przetestuj system i zobacz jak automatyzacja grafiku działa w
                praktyce.
              </p>
              <Button asChild className="w-full mt-3">
                <Link
                  href={APP_URLS.register}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Wypróbuj system
                </Link>
              </Button>
            </div>
          </aside>
        </div>
      </div>
      <Footer />
    </div>
  );
}
