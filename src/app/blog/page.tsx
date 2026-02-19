import { Metadata } from 'next'
import Navigation from "@/components/layout/navigation";
import Footer from "@/components/layout/footer";
import BlogListing from "@/components/features/blog/blog-listing";
import { getAllPosts } from '@/lib/posts';

export const metadata: Metadata = {
  title: 'Blog - Porady dla Żabki | Prawo Pracy i Automatyzacja',
  description: 'Praktyczne poradniki dla franczyzobiorców Żabki. Dowiedz się jak unikać kar PIP, automatyzować grafiki i zarządzać sklepem z Cyfrowym Pomocnikiem.',
  alternates: {
    canonical: '/blog'
  },
  openGraph: {
    title: 'Blog - Porady dla Żabki | AutoŻaba',
    description: 'Praktyczne poradniki dla franczyzobiorców Żabki. Prawo pracy, automatyzacja i zarządzanie.',
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