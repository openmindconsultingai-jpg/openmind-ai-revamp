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

const LogoTicker = () => {
  return (
    <div className="hero-cta mt-10 w-full max-w-3xl mx-auto">
      {/* Label */}
      <p className="font-sans text-xs text-foreground/40 uppercase tracking-[0.25em] text-center mb-5">
        Zaufali nam
      </p>

      {/* Ticker wrapper */}
      <div
        className="relative overflow-hidden"
        style={{
          maskImage: 'linear-gradient(to right, transparent 0%, black 15%, black 85%, transparent 100%)',
          WebkitMaskImage: 'linear-gradient(to right, transparent 0%, black 15%, black 85%, transparent 100%)',
        }}
      >
        <div
          className="flex gap-10 items-center"
          style={{
            animation: 'ticker-scroll 28s linear infinite',
            width: 'max-content',
          }}
        >
          {allLogos.map((logo, i) => (
            <div
              key={i}
              className="flex-shrink-0 h-10 flex items-center justify-center"
              style={{ minWidth: '100px' }}
            >
              <img
                src={logo.src}
                alt={logo.alt}
                className="max-h-10 max-w-[120px] w-auto object-contain rounded"
                style={{
                  opacity: 0.6,
                  transition: 'opacity 0.3s ease',
                }}
                onMouseEnter={e => ((e.currentTarget as HTMLImageElement).style.opacity = '1')}
                onMouseLeave={e => ((e.currentTarget as HTMLImageElement).style.opacity = '0.6')}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LogoTicker;
