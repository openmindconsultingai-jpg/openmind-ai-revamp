import { useEffect, useRef } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
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

gsap.registerPlugin(ScrollTrigger);

const ServiceAreas = () => {
  const { language } = useLanguage();
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.area-card',
        { opacity: 0, y: 40, scale: 0.97 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          stagger: 0.06,
          duration: 0.6,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 75%',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const title = language === 'pl' ? 'Gdzie Działamy' : 'Where We Operate';
  const subtitle = language === 'pl'
    ? 'Świadczymy usługi doradztwa i wdrożeń AI na terenie całej Polski – zdalnie i stacjonarnie.'
    : 'We provide AI consulting and implementation services across all of Poland – remotely and on-site.';

  return (
    <section ref={sectionRef} id="gdzie-dzialamy" className="relative py-20 md:py-28 overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="text-center mb-14 md:mb-20">
          <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            <span className="text-gradient">{title}</span>
          </h2>
          <p className="font-sans text-base sm:text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            {subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 md:gap-6">
          {voivodeships.map((v) => (
            <div
              key={v.slug}
              className="area-card group relative rounded-2xl overflow-hidden transition-all duration-500 hover:scale-[1.02]"
              style={{
                border: '1px solid hsl(176 100% 43% / 0.12)',
                boxShadow: '0 4px 30px hsl(0 0% 0% / 0.3)',
              }}
            >
              <div
                className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                style={{ backgroundImage: `url(${voivodeshipImages[v.slug]})` }}
                aria-hidden="true"
              />
              <div
                className="absolute inset-0"
                style={{
                  background:
                    'linear-gradient(145deg, hsl(220 15% 8% / 0.86) 0%, hsl(220 15% 5% / 0.94) 100%)',
                }}
                aria-hidden="true"
              />
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                style={{
                  background:
                    'radial-gradient(300px circle at 50% 0%, hsl(176 100% 43% / 0.18), transparent 60%)',
                }}
              />

              <div className="relative z-10 p-5 md:p-6">
                <div className="flex items-center justify-between mb-4">
                  <Link
                    to={`/gdzie-dzialamy/${v.slug}/${v.cities[0].slug}`}
                    className="flex items-center gap-2 min-w-0"
                    aria-label={
                      language === 'pl'
                        ? `Przejdź do podstron miast w województwie ${v.name}`
                        : `Open cities in ${v.name}`
                    }
                  >
                    <MapPin className="w-4 h-4 text-primary shrink-0" />
                    <h3 className="font-heading text-sm md:text-base font-semibold text-primary tracking-wide truncate">
                      {language === 'pl' ? `Woj. ${v.name.toLowerCase()}` : v.name}
                    </h3>
                  </Link>

                  <ChevronRight className="w-4 h-4 text-primary/50 group-hover:text-primary group-hover:translate-x-1 transition-all" />
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
                        {city.name}
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
