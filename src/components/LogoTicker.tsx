import { useLanguage } from '@/contexts/LanguageContext';
import santander from '@/assets/logos/santander.png';
import rzeczpospolita from '@/assets/logos/rzeczpospolita.png';
import pivotExpo from '@/assets/logos/pivot-expo.png';
import podatkowyInfo from '@/assets/logos/podatkowy-info.png';
import detektyw from '@/assets/logos/detektyw.png';
import swiadomo from '@/assets/logos/swiadomo.png';
import djsSkrobj from '@/assets/logos/djs-skrobj.jpg';
import zenGarden from '@/assets/logos/zen-garden.png';
import michalowski from '@/assets/logos/michalowski.png';
import tissese from '@/assets/logos/tissese.png';

import corallo from '@/assets/logos/corallo.png';
import fabrykaTekstow from '@/assets/logos/fabryka-tekstow.png';
import impuls from '@/assets/logos/impuls.png';

const logos = [
  { src: santander, alt: 'Santander Consumer Bank – klient OpenMind AI' },
  { src: rzeczpospolita, alt: 'Rzeczpospolita – klient OpenMind AI sztuczna inteligencja' },
  { src: pivotExpo, alt: 'Pivot Expo – klient wdrożeń AI' },
  { src: podatkowyInfo, alt: 'Podatkowy.info – automatyzacja AI' },
  { src: detektyw, alt: 'Detektyw z Służb – klient AI', scale: 1.45 },
  { src: swiadomo, alt: 'Świadomo – szkolenia SI' },
  { src: djsSkrobj, alt: "DJ's Skrobj Agency – klient AI" },
  { src: zenGarden, alt: 'Zen Garden – klient sztucznej inteligencji', noFilter: true, scale: 1.15 },
  { src: michalowski, alt: 'Usługi Księgowe Michałowski – automatyzacja AI', scale: 1.4 },
  { src: tissese, alt: 'Cooperativa Tissese – klient AI' },

  { src: corallo, alt: 'V&E Corallo – klient AI' },
  { src: fabrykaTekstow, alt: 'Fabryka Tekstów – content AI' },
  { src: impuls, alt: 'Impuls – klient sztucznej inteligencji' },
] as Array<{ src: string; alt: string; noFilter?: boolean; scale?: number }>;

// Duplicate for seamless infinite loop
const allLogos = [...logos, ...logos];

const LogoTicker = () => {
  const { t } = useLanguage();
  return (
    <div className="hero-cta mt-10 w-full max-w-5xl mx-auto px-4 sm:px-6">
      {/* Label */}
      <p className="font-sans text-xs uppercase tracking-[0.25em] text-center mb-6 text-primary/60">
        {t('logoticker.label')}
      </p>

      {/* SVG filter: removes white/light backgrounds while preserving original logo colors */}
      <svg width="0" height="0" style={{ position: 'absolute' }} aria-hidden="true">
        <defs>
          <filter id="remove-white-bg" colorInterpolationFilters="sRGB">
            <feColorMatrix in="SourceGraphic" type="luminanceToAlpha" result="lum" />
            <feComponentTransfer in="lum" result="alpha">
              <feFuncA type="linear" slope="-1.15" intercept="1.05" />
            </feComponentTransfer>
            <feComposite in="SourceGraphic" in2="alpha" operator="in" />
          </filter>
        </defs>
      </svg>

      {/* Ticker wrapper */}
      <div
        className="relative overflow-hidden py-2"
        style={{
          maskImage:
            'linear-gradient(to right, transparent 0%, black 6%, black 94%, transparent 100%)',
          WebkitMaskImage:
            'linear-gradient(to right, transparent 0%, black 6%, black 94%, transparent 100%)',
        }}
      >
        <div
          className="flex items-center"
          style={{
            animation: 'ticker-scroll 32s linear infinite',
            width: 'max-content',
            gap: 'clamp(1.5rem, 3vw, 2.5rem)',
          }}
        >
          {allLogos.map((logo, i) => (
            <div
              key={i}
              className="logo-card flex-shrink-0 flex items-center justify-center"
            >
              <img
                src={logo.src}
                alt={logo.alt}
                loading="lazy"
                className="logo-img"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LogoTicker;
