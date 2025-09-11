import { Metadata } from 'next'
import Navigation from "@/components/navigation";
import Footer from "@/components/footer";
import BlogListing from "@/components/blog-listing";
import { getBlogPosts } from '@/lib/posts';

export const metadata: Metadata = {
  title: 'Blog - AutoŻaba | Zarządzanie personelem w sklepach Żabka',
  description: 'Poznaj najlepsze praktyki zarządzania zespołem, prawo pracy i automatyzację procesów kadrowych w sklepach Żabka.',
  openGraph: {
    title: 'Blog - AutoŻaba',
    description: 'Poznaj najlepsze praktyki zarządzania zespołem, prawo pracy i automatyzację procesów kadrowych w sklepach Żabka.',
    type: 'website',
  }
}

export default async function BlogPage() {
  const posts = await getBlogPosts();

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main className="section-padding">
        <BlogListing posts={posts} />
      </main>
      <Footer />
    </div>
  );
}