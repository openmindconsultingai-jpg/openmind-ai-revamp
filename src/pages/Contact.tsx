import Navigation from '@/components/Navigation';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';
import Chatbot from '@/components/Chatbot';

const ContactPage = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <Contact />
      <Footer />
      <Chatbot />
    </div>
  );
};

export default ContactPage;
