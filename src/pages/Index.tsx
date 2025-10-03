import Navigation from '@/components/Navigation';
import Hero from '@/components/Hero';
import Features from '@/components/Features';
import Services from '@/components/Services';
import About from '@/components/About';
import Contact from '@/components/Contact';
import Privacy from '@/components/Privacy';
import Footer from '@/components/Footer';

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <Hero />
      <Features />
      <Services />
      <About />
      <Contact />
      <Privacy />
      <Footer />
    </div>
  );
};

export default Index;
