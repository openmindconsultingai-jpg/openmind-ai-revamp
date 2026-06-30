import { useLanguage } from '@/contexts/LanguageContext';
import santander from '@/assets/logos/santander.webp';
import rzeczpospolita from '@/assets/logos/rzeczpospolita.webp';
import pivotExpo from '@/assets/logos/pivot-expo.webp';
import podatkowyInfo from '@/assets/logos/podatkowy-info.webp';
import detektyw from '@/assets/logos/detektyw.webp';
import swiadomo from '@/assets/logos/swiadomo.webp';
import djsSkrobj from '@/assets/logos/djs-skrobj.webp';
import zenGarden from '@/assets/logos/zen-garden.webp';
import michalowski from '@/assets/logos/michalowski.webp';
import tissese from '@/assets/logos/tissese.webp';

import corallo from '@/assets/logos/corallo.webp';
import fabrykaTekstow from '@/assets/logos/fabryka-tekstow.webp';
import impuls from '@/assets/logos/impuls.webp';

const logos = [
  { src: santander, alt: 'Santander Consumer Bank – klient OpenMind AI' },
  { src: rzeczpospolita, alt: 'Rzeczpospolita – klient OpenMind AI sztuczna inteligencja' },
  { src: pivotExpo, alt: 'Pivot Expo – klient wdrożeń AI' },
  { src: podatkowyInfo, alt: 'Podatkowy.info – automatyzacja AI' },
  { src: detektyw, alt: 'Detektyw z Służb – klient AI', scale: 1.45, darkBg: true },
  { src: swiadomo, alt: 'Świadomo – szkolenia AI' },
  { src: djsSkrobj, alt: "DJ's Skrobj Agency – klient AI", darkBg: true },
  { src: zenGarden, alt: 'Zen Garden – klient sztucznej inteligencji', darkBg: true, scale: 1.15 },
  { src: michalowski, alt: 'Usługi Księgowe Michałowski – automatyzacja AI', scale: 1.35 },
  { src: tissese, alt: 'Cooperativa Tissese – klient AI' },

  { src: corallo, alt: 'V&E Corallo – klient AI', darkBg: true },
  { src: fabrykaTekstow, alt: 'Fabryka Tekstów – content AI' },
  { src: impuls, alt: 'Impuls – klient sztucznej inteligencji', darkBg: true },
].map((l) => ({ ...l, darkBg: true })) as Array<{ src: string; alt: string; noFilter?: boolean; scale?: number; darkBg?: boolean }>;

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

      {/* SVG filters: knock out white OR black backgrounds while keeping logo colors */}
      <svg width="0" height="0" style={{ position: 'absolute' }} aria-hidden="true">
        <defs>
          <filter id="remove-white-bg" colorInterpolationFilters="sRGB">
            <feColorMatrix in="SourceGraphic" type="luminanceToAlpha" result="lum" />
            <feComponentTransfer in="lum" result="alpha">
              <feFuncA type="linear" slope="-1.15" intercept="1.05" />
            </feComponentTransfer>
            <feComposite in="SourceGraphic" in2="alpha" operator="in" />
          </filter>
          {/* For dark/black-background logos: alpha = luminance (black -> transparent),
              then keep a subtle hint of original colors (mostly desaturated + whitened) */}
          <filter id="remove-black-bg" colorInterpolationFilters="sRGB">
            <feColorMatrix in="SourceGraphic" type="luminanceToAlpha" result="alpha" />
            <feComponentTransfer in="alpha" result="alpha2">
              <feFuncA type="linear" slope="1.4" intercept="0" />
            </feComponentTransfer>
            {/* Desaturate ~75% and lift toward white so original colors only whisper through */}
            <feColorMatrix
              in="SourceGraphic"
              type="matrix"
              result="tinted"
              values="0.55 0.18 0.12 0 0.30
                      0.12 0.55 0.18 0 0.30
                      0.18 0.12 0.55 0 0.30
                      0    0    0    1 0"
            />
            <feComposite in="tinted" in2="alpha2" operator="in" />
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
                decoding="async"
                width="160"
                height="80"
                className="logo-img"
                style={{
                  filter: logo.noFilter
                    ? 'none'
                    : logo.darkBg
                    ? 'url(#remove-black-bg)'
                    : undefined,
                  mixBlendMode: logo.noFilter ? 'normal' : undefined,
                  transform: logo.scale ? `scale(${logo.scale})` : undefined,
                }}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LogoTicker;
