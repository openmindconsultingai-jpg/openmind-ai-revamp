import PageLayout from '@/components/PageLayout';
import Footer from '@/components/Footer';
import AIAdvisorChat from '@/components/AIAdvisorChat';
import VideoSectionBackground from '@/components/VideoSectionBackground';
import { useLanguage } from '@/contexts/LanguageContext';

const AIAdvisorPage = () => {
  const { t } = useLanguage();

  return (
    <PageLayout>
      <section className="relative min-h-screen pt-20 pb-32 overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0">
          <VideoSectionBackground opacity={0.4} blurPx={4} overlayOpacity={0.6} />
          <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/50 to-background" />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto">
            {/* Header */}
            <div className="text-center mb-8">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
                <span className="text-gradient text-glow">{t('bento.advisor.title')}</span>
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
                {t('bento.advisor.modal.subtitle')}
              </p>
            </div>

            {/* Chat Container */}
            <div 
              className="glass rounded-3xl overflow-hidden border border-border/30"
              style={{
                boxShadow: '0 0 60px hsl(176 100% 43% / 0.1), 0 25px 60px -20px hsl(0 0% 0% / 0.5)',
              }}
            >
              <div className="p-6 border-b border-border/30">
                <h2 className="font-heading text-xl md:text-2xl text-gradient font-semibold">
                  {t('bento.advisor.modal.title')}
                </h2>
                <p className="text-muted-foreground mt-2 text-sm md:text-base">
                  {t('bento.advisor.desc')}
                </p>
              </div>
              
              <div className="h-[60vh] min-h-[400px] max-h-[600px]">
                <AIAdvisorChat />
              </div>
            </div>

            {/* Info Cards */}
            <div className="grid md:grid-cols-3 gap-6 mt-12">
              <div className="glass rounded-2xl p-6 text-center">
                <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">🎯</span>
                </div>
                <h3 className="font-semibold mb-2">
                  {t('language') === 'pl' ? 'Spersonalizowane propozycje' : 'Personalized proposals'}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {t('language') === 'pl' 
                    ? 'Otrzymaj propozycje dopasowane do Twojej branży i potrzeb' 
                    : 'Get proposals tailored to your industry and needs'}
                </p>
              </div>
              
              <div className="glass rounded-2xl p-6 text-center">
                <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">📄</span>
                </div>
                <h3 className="font-semibold mb-2">
                  {t('language') === 'pl' ? 'Pobierz podsumowanie' : 'Download summary'}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {t('language') === 'pl' 
                    ? 'Zapisz propozycje zastosowań AI w formacie HTML' 
                    : 'Save AI application proposals in HTML format'}
                </p>
              </div>
              
              <div className="glass rounded-2xl p-6 text-center">
                <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">💬</span>
                </div>
                <h3 className="font-semibold mb-2">
                  {t('language') === 'pl' ? 'Umów konsultację' : 'Book consultation'}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {t('language') === 'pl' 
                    ? 'Po rozmowie z AI umów się na bezpłatną konsultację' 
                    : 'After chatting with AI, book a free consultation'}
                </p>
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
