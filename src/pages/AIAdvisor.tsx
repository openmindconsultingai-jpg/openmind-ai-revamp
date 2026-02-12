import PageLayout from '@/components/PageLayout';
import Footer from '@/components/Footer';
import AIAdvisorChat from '@/components/AIAdvisorChat';
import usePageMeta from '@/hooks/usePageMeta';
import { useLanguage } from '@/contexts/LanguageContext';

const AIAdvisorPage = () => {
  const { t } = useLanguage();

  usePageMeta({
    title: 'Kreator Zastosowań AI – Darmowy Doradca Sztucznej Inteligencji | OpenMind AI',
    description: 'Bezpłatny kreator zastosowań AI. Odpowiedz na kilka pytań, a nasz inteligentny doradca zaproponuje optymalne rozwiązania AI dla Twojego biznesu, edukacji lub życia codziennego. Odkryj potencjał sztucznej inteligencji.',
    keywords: 'kreator AI, doradca AI, zastosowania sztucznej inteligencji, AI dla biznesu, AI dla edukacji, darmowe narzędzie AI, chatbot doradczy, automatyzacja, optymalizacja procesów',
    path: '/ai-advisor',
  });

  return (
    <PageLayout>
      <section className="relative min-h-screen pt-16 sm:pt-20 pb-20 sm:pb-32 overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/50 to-background" />
        </div>

        <div className="container mx-auto px-3 sm:px-4 relative z-10">
          <div className="max-w-4xl mx-auto">
            {/* Header */}
            <div className="text-center mb-4 sm:mb-8">
              <h1 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-2 sm:mb-4">
                <span className="text-gradient text-glow">{t('bento.advisor.title')}</span>
              </h1>
              <p className="text-sm sm:text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto px-2">
                {t('bento.advisor.modal.subtitle')}
              </p>
            </div>

            {/* Chat Container */}
            <div 
              className="glass rounded-2xl sm:rounded-3xl overflow-hidden border border-border/30"
              style={{
                boxShadow: '0 0 60px hsl(176 100% 43% / 0.1), 0 25px 60px -20px hsl(0 0% 0% / 0.5)',
              }}
            >
              <div className="p-4 sm:p-6 border-b border-border/30">
                <h2 className="font-heading text-lg sm:text-xl md:text-2xl text-gradient font-semibold">
                  {t('bento.advisor.modal.title')}
                </h2>
                <p className="text-muted-foreground mt-1 sm:mt-2 text-xs sm:text-sm md:text-base">
                  {t('bento.advisor.desc')}
                </p>
              </div>
              
              <div className="h-[55vh] sm:h-[60vh] min-h-[350px] sm:min-h-[400px] max-h-[500px] sm:max-h-[600px]">
                <AIAdvisorChat />
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </PageLayout>
  );
};

export default AIAdvisorPage;
