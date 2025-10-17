import { Metadata } from 'next'
import Navigation from "@/components/navigation";
import Footer from "@/components/footer";
import BlogListing from "@/components/blog-listing";
import { getAllPosts } from '@/lib/posts';

export const metadata: Metadata = {
  title: 'Blog - Prawo Pracy w Pigułce',
  description: 'Praktyczne poradniki o Kodeksie Pracy napisane prostym językiem. Bez żargonu prawniczego, same konkretne wskazówki.',
  alternates: {
    canonical: '/blog'
  },
  openGraph: {
    title: 'Blog - AutoŻaba | Prawo Pracy w Pigułce',
    description: 'Praktyczne poradniki o Kodeksie Pracy napisane prostym językiem.',
    type: 'website',
    url: '/blog'
  }
}

export default async function BlogPage() {
  const posts = await getAllPosts();

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <div className="section-padding">
        <BlogListing posts={posts} />
      </div>
      <Footer />
    </div>
  );
}