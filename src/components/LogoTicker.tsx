import { useLanguage } from '@/contexts/LanguageContext';

const CLIENTS = [
  'Santander Consumer Bank',
  'Rzeczpospolita',
  'Podatkowy.info',
  'SPCG Kancelaria Adwokatów i Radców Prawnych',
  "DJ Skrobi Agency",
  'Biuro Podatkowo-Księgowe Paweł Michałowski',
  'Świadomo.pl',
  'Impuls Obsługa Imprez',
  'Zen Garden Studio Masażu',
  'Pivot Expo Modular Stands',
  'P.W. Ikar',
  'Plaża Stelchno',
  'Cooperativa Agricola Tissese 1907',
  'V&E Corallo',
  'Detektyw ze służb',
  'Fabryka Tekstów',
];

// Duplicate for seamless infinite loop
const allClients = [...CLIENTS, ...CLIENTS];

const LogoTicker = () => {
  const { t } = useLanguage();
  return (
    <div className="hero-cta mt-10 w-full max-w-5xl mx-auto px-4 sm:px-6">
      {/* Label */}
      <p className="font-sans text-xs uppercase tracking-[0.25em] text-center mb-5 text-primary/60">
        {t('logoticker.label')}
      </p>

      {/* Frosted glass text ticker */}
      <div
        className="relative overflow-hidden py-4 rounded-2xl border border-border/30 bg-card/20 backdrop-blur-sm"
        style={{
          maskImage:
            'linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)',
          WebkitMaskImage:
            'linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)',
        }}
      >
        <div
          className="flex items-center whitespace-nowrap"
          style={{
            animation: 'ticker-scroll 40s linear infinite',
            width: 'max-content',
            gap: 'clamp(1.25rem, 2.5vw, 2rem)',
          }}
        >
          {allClients.map((name, i) => (
            <div
              key={i}
              className="flex items-center gap-[inherit]"
            >
              <span
                className="font-sans text-xs sm:text-sm uppercase tracking-[0.15em] text-foreground/70 hover:text-primary transition-colors duration-300 cursor-default"
                style={{ textWrap: 'nowrap' }}
              >
                {name}
              </span>
              <span
                className="w-1.5 h-1.5 rounded-full bg-primary/50 shrink-0"
                aria-hidden="true"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LogoTicker;
