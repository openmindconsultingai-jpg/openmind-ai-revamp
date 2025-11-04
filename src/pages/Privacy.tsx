import Navigation from '@/components/Navigation';
import Privacy from '@/components/Privacy';
import Footer from '@/components/Footer';
import Chatbot from '@/components/Chatbot';

const PrivacyPage = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <Privacy />
      <Footer />
      <Chatbot />
    </div>
  );
};

export default PrivacyPage;
