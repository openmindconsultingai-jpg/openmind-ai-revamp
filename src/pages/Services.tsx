import Navigation from '@/components/Navigation';
import Services from '@/components/Services';
import Footer from '@/components/Footer';
import Chatbot from '@/components/Chatbot';

const ServicesPage = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <Services />
      <Footer />
      <Chatbot />
    </div>
  );
};

export default ServicesPage;
