import Navigation from '@/components/Navigation';
import Hero from '@/components/Hero';
import Features from '@/components/Features';
import Footer from '@/components/Footer';
import Chatbot from '@/components/Chatbot';

const Home = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <Hero />
      <Features />
      <Footer />
      <Chatbot />
    </div>
  );
};

export default Home;
