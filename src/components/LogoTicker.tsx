import pivotExpo from '@/assets/logos/pivot-expo.png';
import podatkowyInfo from '@/assets/logos/podatkowy-info.png';
import detektyw from '@/assets/logos/detektyw.png';
import swiadomo from '@/assets/logos/swiadomo.png';
import djsSkrobj from '@/assets/logos/djs-skrobj.jpg';
import zenGarden from '@/assets/logos/zen-garden.png';
import michalowski from '@/assets/logos/michalowski.png';

const logos = [
  { src: pivotExpo, alt: 'Pivot Expo Modular Stands' },
  { src: podatkowyInfo, alt: 'Podatkowy.info – Księgowość dla firm' },
  { src: detektyw, alt: 'Detektyw z Służb' },
  { src: swiadomo, alt: 'Świadomo' },
  { src: djsSkrobj, alt: "DJ's Skrobj Agency" },
  { src: zenGarden, alt: 'Studio Masażu Zen Garden' },
  { src: michalowski, alt: 'Usługi Podatkowo-Księgowe Paweł Michałowski' },
];

// Duplicate for seamless infinite loop
const allLogos = [...logos, ...logos];

// CSS filter that converts any logo to dark/black + green-cyan tint matching the brand palette
// 1. grayscale → removes original colors
// 2. sepia → warm base tone needed for hue-rotate
// 3. saturate → boosts colour intensity
// 4. hue-rotate(130deg) → shifts warm yellow into teal/green (hsl ~176)
// 5. brightness(0.8) contrast(1.3) → makes it darker / more contrasty (black-green look)
const LOGO_FILTER =
  'grayscale(1) sepia(1) saturate(6) hue-rotate(130deg) brightness(0.75) contrast(1.4)';
const LOGO_FILTER_HOVER =
  'grayscale(1) sepia(1) saturate(8) hue-rotate(130deg) brightness(1) contrast(1.3)';

const LogoTicker = () => {
  return (
    <div className="hero-cta mt-10 w-full max-w-3xl mx-auto">
      {/* Label */}
      <p
        className="font-sans text-xs uppercase tracking-[0.25em] text-center mb-5"
        style={{ color: 'hsl(176 100% 43% / 0.45)' }}
      >
        Zaufali nam
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
            gap: '48px',
          }}
        >
          {allLogos.map((logo, i) => (
            <div
              key={i}
              className="flex-shrink-0 flex items-center justify-center"
              style={{
                /* Fixed slot size so every logo occupies the same area */
                width: '120px',
                height: '52px',
              }}
            >
              <img
                src={logo.src}
                alt={logo.alt}
                className="w-full h-full object-contain"
                style={{
                  filter: LOGO_FILTER,
                  opacity: 0.75,
                  transition: 'filter 0.35s ease, opacity 0.35s ease',
                }}
                onMouseEnter={e => {
                  const img = e.currentTarget as HTMLImageElement;
                  img.style.filter = LOGO_FILTER_HOVER;
                  img.style.opacity = '1';
                }}
                onMouseLeave={e => {
                  const img = e.currentTarget as HTMLImageElement;
                  img.style.filter = LOGO_FILTER;
                  img.style.opacity = '0.75';
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
