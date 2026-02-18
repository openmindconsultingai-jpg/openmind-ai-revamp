import { useLanguage } from '@/contexts/LanguageContext';
import pivotExpo from '@/assets/logos/pivot-expo.png';
import podatkowyInfo from '@/assets/logos/podatkowy-info.png';
import detektyw from '@/assets/logos/detektyw.png';
import swiadomo from '@/assets/logos/swiadomo.png';
import djsSkrobj from '@/assets/logos/djs-skrobj.jpg';
import zenGarden from '@/assets/logos/zen-garden.png';
import michalowski from '@/assets/logos/michalowski.png';
import tissese from '@/assets/logos/tissese.png';
import cwt from '@/assets/logos/cwt.png';
import corallo from '@/assets/logos/corallo.png';
import fabrykaTekstow from '@/assets/logos/fabryka-tekstow.png';
import impuls from '@/assets/logos/impuls.png';

const logos = [
  { src: pivotExpo, alt: 'Pivot Expo Modular Stands' },
  { src: podatkowyInfo, alt: 'Podatkowy.info' },
  { src: detektyw, alt: 'Detektyw z Służb' },
  { src: swiadomo, alt: 'Świadomo' },
  { src: djsSkrobj, alt: "DJ's Skrobj Agency" },
  { src: zenGarden, alt: 'Studio Masażu Zen Garden' },
  { src: michalowski, alt: 'Usługi Podatkowo-Księgowe Michałowski' },
  { src: tissese, alt: 'Cooperativa Agricola Tissese' },
  { src: cwt, alt: 'CWT' },
  { src: corallo, alt: 'V&E Corallo – Your Sardinian Experience' },
  { src: fabrykaTekstow, alt: 'Fabryka Tekstów 24/7' },
  { src: impuls, alt: 'Impuls – Obsługa Imprez' },
];

// Duplicate for seamless infinite loop
const allLogos = [...logos, ...logos];

const LogoTicker = () => {
  const { t } = useLanguage();
  return (
    <div className="hero-cta mt-10 w-full max-w-4xl mx-auto">
      {/* Label */}
      <p
        className="font-sans text-xs uppercase tracking-[0.25em] text-center mb-6"
        style={{ color: 'hsl(176 100% 43% / 0.5)' }}
      >
        {t('logoticker.label')}
      </p>

      {/* Ticker wrapper */}
      <div
        className="relative overflow-hidden"
        style={{
          maskImage:
            'linear-gradient(to right, transparent 0%, black 12%, black 88%, transparent 100%)',
          WebkitMaskImage:
            'linear-gradient(to right, transparent 0%, black 12%, black 88%, transparent 100%)',
        }}
      >
        <div
          className="flex items-center"
          style={{
            animation: 'ticker-scroll 32s linear infinite',
            width: 'max-content',
            gap: '56px',
          }}
        >
          {allLogos.map((logo, i) => (
            <div
              key={i}
              className="flex-shrink-0 flex items-center justify-center"
              style={{
                width: '160px',
                height: '72px',
              }}
            >
              <img
                src={logo.src}
                alt={logo.alt}
                className="w-full h-full object-contain"
                style={{
                  opacity: 0.4,
                  transition: 'opacity 0.3s ease',
                }}
                onMouseEnter={e => { (e.currentTarget as HTMLImageElement).style.opacity = '1'; }}
                onMouseLeave={e => { (e.currentTarget as HTMLImageElement).style.opacity = '0.4'; }}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LogoTicker;
