import VideoHero from '@/components/VideoHero';
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
      <CustomCursor enabled={typeof window !== 'undefined' && window.innerWidth > 768} />
      <FloatingNav />
      <VideoHero />
      <MissionSection />
      <BentoGrid />
      <ParticleFooter />
      <Chatbot />
    </div>
  );
};

export default Home;