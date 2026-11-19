import DecodeText from '@/components/fx/DecodeText';
import { lazy, Suspense, useState } from 'react';
import { Loader2, Sparkles } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

const AIAdvisorChat = lazy(() => import('@/components/AIAdvisorChat'));

// Rozmowa startuje dopiero po kliknięciu, żeby nie wysyłać zapytań przy każdym wejściu.
const AdvisorWidget = () => {
  const { t } = useLanguage();
  const [started, setStarted] = useState(false);

  return (
    <section id="wirtualny-doradca" className="fx-trace py-16 md:py-24">
      <div className="container mx-auto max-w-4xl px-4">
        <div className="mb-8 !text-center">
          <h2 className="font-heading h-section">
            <span className="text-gradient"><DecodeText text={t('bento.advisor.title')} accentLast /></span>
          </h2>
          <p className="fx-reveal mx-auto mt-3 max-w-2xl !text-center text-muted-foreground">{t('bento.advisor.modal.subtitle')}</p>
        </div>
        <div className="overflow-hidden rounded-3xl border border-border/30 bg-card">
          {started ? (
            <div className="h-[60vh] min-h-[380px] max-h-[600px]">
              <Suspense fallback={<div className="flex h-full items-center justify-center"><Loader2 className="h-6 w-6 animate-spin text-primary" /></div>}>
                <AIAdvisorChat />
              </Suspense>
            </div>
          ) : (
            <div className="flex flex-col items-center gap-5 p-8 !text-center md:p-12">
              <p className="fx-reveal max-w-xl !text-center text-muted-foreground">{t('bento.advisor.desc')}</p>
              <button
                type="button"
                onClick={() => setStarted(true)}
                className="fx-button inline-flex items-center gap-2 px-6 py-3"
              >
                <Sparkles className="h-5 w-5" />
                {t('bento.advisor.modal.title')}
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default AdvisorWidget;
