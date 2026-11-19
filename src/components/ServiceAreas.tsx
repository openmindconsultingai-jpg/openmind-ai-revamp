import DecodeText from '@/components/fx/DecodeText';
import { useLanguage } from '@/contexts/LanguageContext';
import { Link } from 'react-router-dom';
import { MapPin, ChevronRight } from 'lucide-react';
import { voivodeships } from '@/data/voivodeships';

import imgDolnoslaskie from '@/assets/voivodeship-dolnoslaskie.jpg';
import imgKujawskoPomorskie from '@/assets/voivodeship-kujawsko-pomorskie.jpg';
import imgLubelskie from '@/assets/voivodeship-lubelskie.jpg';
import imgLubuskie from '@/assets/voivodeship-lubuskie.jpg';
import imgLodzkie from '@/assets/voivodeship-lodzkie.jpg';
import imgMalopolskie from '@/assets/voivodeship-malopolskie.jpg';
import imgMazowieckie from '@/assets/voivodeship-mazowieckie.jpg';
import imgOpolskie from '@/assets/voivodeship-opolskie.jpg';
import imgPodkarpackie from '@/assets/voivodeship-podkarpackie.jpg';
import imgPodlaskie from '@/assets/voivodeship-podlaskie.jpg';
import imgPomorskie from '@/assets/voivodeship-pomorskie.jpg';
import imgSlaskie from '@/assets/voivodeship-slaskie.jpg';
import imgSwietokrzyskie from '@/assets/voivodeship-swietokrzyskie.jpg';
import imgWarminskoMazurskie from '@/assets/voivodeship-warminsko-mazurskie.jpg';
import imgWielkopolskie from '@/assets/voivodeship-wielkopolskie.jpg';
import imgZachodniopomorskie from '@/assets/voivodeship-zachodniopomorskie.jpg';

const voivodeshipImages: Record<string, string> = {
  'dolnoslaskie': imgDolnoslaskie,
  'kujawsko-pomorskie': imgKujawskoPomorskie,
  'lubelskie': imgLubelskie,
  'lubuskie': imgLubuskie,
  'lodzkie': imgLodzkie,
  'malopolskie': imgMalopolskie,
  'mazowieckie': imgMazowieckie,
  'opolskie': imgOpolskie,
  'podkarpackie': imgPodkarpackie,
  'podlaskie': imgPodlaskie,
  'pomorskie': imgPomorskie,
  'slaskie': imgSlaskie,
  'swietokrzyskie': imgSwietokrzyskie,
  'warminsko-mazurskie': imgWarminskoMazurskie,
  'wielkopolskie': imgWielkopolskie,
  'zachodniopomorskie': imgZachodniopomorskie,
};

export interface ServiceAreasProps {
  /** Optional H2 override. Defaults to "Gdzie Działamy" / "Where We Operate". */
  heading?: string;
  /** Optional subtitle override. */
  sub?: string;
  /** Prefix prepended to each city link text (e.g. "Szkolenia AI"). If omitted, only the city name is shown. */
  anchorPrefix?: string;
  /** Section id (for anchor links). Defaults to "gdzie-dzialamy". */
  id?: string;
}

const ServiceAreas = ({ heading, sub, anchorPrefix, id = 'gdzie-dzialamy' }: ServiceAreasProps = {}) => {
  const { language } = useLanguage();
  const title = heading ?? (language === 'pl' ? 'Gdzie Działamy' : 'Where We Operate');
  const subtitle = sub ?? (language === 'pl'
    ? 'Świadczymy usługi doradztwa i wdrożeń AI na terenie całej Polski – zdalnie i stacjonarnie.'
    : 'We provide AI consulting and implementation services across all of Poland – remotely and on-site.');

  return (
    <section id={id} className="fx-trace relative py-20 md:py-28 overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="text-center mb-14 md:mb-20">
          <h2 className="font-heading h-section mb-6">
            <span className="text-gradient"><DecodeText text={title} accentLast /></span>
          </h2>
          <p className="fx-reveal font-sans text-base sm:text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            {subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 md:gap-6">
          {voivodeships.map((v) => (
            <div
              key={v.slug}
              className="area-card fx-card fx-reveal group overflow-hidden"
            >
              <img
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                src={voivodeshipImages[v.slug]}
                loading="lazy" decoding="async" alt=""
                aria-hidden="true"
              />
              <div
                className="absolute inset-0"
                aria-hidden="true"
              />
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
              />

              <div className="relative z-10 p-5 md:p-6">
                <div className="flex items-center justify-between mb-4">
                  <Link
                    to={`/gdzie-dzialamy/${v.slug}`}
                    className="flex items-center gap-2 min-w-0"
                    aria-label={
                      language === 'pl'
                        ? `Przejdź do podstron miast w województwie ${v.name}`
                        : `Open cities in ${v.name}`
                    }
                  >
                    <MapPin className="w-4 h-4 text-primary shrink-0" />
                    <h3 className="font-heading text-sm md:text-base font-semibold text-primary min-w-0 break-words">
                      <DecodeText text={language === 'pl' ? `Woj. ${v.name.toLowerCase()}` : v.name} />
                    </h3>
                  </Link>

                  <ChevronRight className="w-4 h-4 text-primary/50 group-hover:text-primary group-hover:translate-x-1 transition-transform" />
                </div>

                <div className="w-full h-px bg-gradient-to-r from-primary/30 via-primary/10 to-transparent mb-4" />

                <ul className="space-y-1.5">
                  {v.cities.map((city) => (
                    <li key={city.slug}>
                      <Link
                        to={`/gdzie-dzialamy/${v.slug}/${city.slug}`}
                        className="flex items-center gap-2 text-sm text-foreground/70 font-sans hover:text-foreground transition-colors"
                      >
                        <span className="w-1 h-1 rounded-full bg-primary/50 shrink-0" />
                        <DecodeText text={anchorPrefix ? `${anchorPrefix} ${city.name}` : city.name} />
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServiceAreas;
