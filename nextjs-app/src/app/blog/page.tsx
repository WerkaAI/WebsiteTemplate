import Navigation from "@/components/navigation";
import Footer from "@/components/footer";
import BlogListing from "@/components/blog-listing";

export default function BlogPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main className="section-padding">
        <BlogListing />
      </main>
      <Footer />
    </div>
  );
}