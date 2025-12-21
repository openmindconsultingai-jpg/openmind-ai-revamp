import EtherealHero from '@/components/EtherealHero';
import MissionSection from '@/components/MissionSection';
import BentoGrid from '@/components/BentoGrid';
import ParticleFooter from '@/components/ParticleFooter';
import FloatingNav from '@/components/FloatingNav';
import CustomCursor from '@/components/CustomCursor';
import Chatbot from '@/components/Chatbot';
import useSmoothScroll from '@/hooks/useSmoothScroll';

const Home = () => {
  useSmoothScroll();

  return (
    <div className="min-h-screen bg-background">
      <CustomCursor enabled={window.innerWidth > 768} />
      <FloatingNav />
      <EtherealHero />
      <MissionSection />
      <BentoGrid />
      <ParticleFooter />
      <Chatbot />
    </div>
  );
};

export default Home;