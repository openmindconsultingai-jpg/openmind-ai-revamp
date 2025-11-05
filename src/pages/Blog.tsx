import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import BlogContent from '@/components/Blog';

const Blog = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <BlogContent />
      <Footer />
    </div>
  );
};

export default Blog;
