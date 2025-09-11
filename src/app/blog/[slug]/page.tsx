export const runtime = 'nodejs';
export const dynamic = 'error'; // wymagamy SSG
import { Metadata } from 'next'
import { notFound } from 'next/navigation';
import Image from 'next/image';
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock } from "lucide-react";
import { format } from 'date-fns';
import { pl } from 'date-fns/locale';
import { getAllSlugs, loadPost } from '@/lib/posts';

interface BlogPostPageProps {
  params: {
    slug: string
  }
}

export async function generateStaticParams() {
  return (await getAllSlugs()).map(slug => ({ slug }));
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const mod = await loadPost(params.slug).catch(() => null);
  if (!mod) return {};
  const { title, description } = mod.meta ?? {};
  return { title, description };
}

export default async function Page({ params }: BlogPostPageProps) {
  const mod = await loadPost(params.slug).catch(() => null);
  if (!mod) return notFound();
  const { Component: Post, meta } = mod;

  return (
    <main className="container mx-auto max-w-3xl px-4 md:px-6 py-8 lg:py-12">
      {/* Nagłówek artykułu z metadanymi */}
      <div className="mb-8 space-y-4">
        {/* Placeholder okładki */}
        {meta.cover
          ? <Image src={meta.cover} alt={meta.title} width={1280} height={720} className="rounded-xl aspect-[16/9] object-cover" />
          : <div className="aspect-[16/9] rounded-xl bg-gradient-to-br from-slate-100 to-slate-200 flex items-center justify-center text-slate-400" aria-label="Brak okładki dla artykułu">
              <span className="text-sm">Brak okładki</span>
            </div>
        }
        
        {/* Metadane artykułu */}
        <div className="flex items-center text-sm text-muted-foreground">
          <Calendar className="w-4 h-4 mr-2" />
          <span>
            {format(new Date(meta.date), 'dd MMMM yyyy', { locale: pl })}
          </span>
          <span className="mx-2">•</span>
          <Clock className="w-4 h-4 mr-2" />
          <span>~5 min czytania</span>
        </div>
        
        {/* Tagi */}
        {meta.tags && meta.tags.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {meta.tags.map((tag: string, index: number) => (
              <Badge key={index} variant="secondary">
                {tag}
              </Badge>
            ))}
          </div>
        )}
      </div>

      <article className="prose prose-slate max-w-none md:prose-lg lg:prose-xl prose-headings:font-semibold prose-headings:scroll-mt-28 prose-a:underline-offset-4 hover:prose-a:text-emerald-700 prose-img:rounded-xl prose-pre:rounded-xl">
        <Post />
      </article>
    </main>
  );
}