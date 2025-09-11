export const runtime = 'nodejs';
export const dynamic = 'error'; // wymagamy SSG
import { Metadata } from 'next'
import { notFound } from 'next/navigation';
import Image from 'next/image';
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
    <article className="prose mx-auto">
      {meta.cover
        ? <Image src={meta.cover} alt={meta.title} width={1280} height={720} className="rounded-xl" />
        : <div className="aspect-[16/9] rounded-xl bg-gradient-to-br from-slate-100 to-slate-200 flex items-center justify-center text-slate-400">Brak okładki</div>}
      <Post />
    </article>
  );
}