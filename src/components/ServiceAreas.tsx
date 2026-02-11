import { useEffect, useRef } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { MapPin, ChevronRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const voivodeships = [
  { name: 'Dolnośląskie', slug: 'dolnoslaskie', cities: ['Wrocław', 'Wałbrzych', 'Legnica', 'Jelenia Góra', 'Lubin', 'Głogów', 'Świdnica', 'Bolesławiec', 'Oleśnica', 'Oława'] },
  { name: 'Kujawsko-Pomorskie', slug: 'kujawsko-pomorskie', cities: ['Bydgoszcz', 'Toruń', 'Włocławek', 'Grudziądz', 'Inowrocław', 'Brodnica', 'Świecie', 'Chełmno', 'Nakło nad Notecią'] },
  { name: 'Lubelskie', slug: 'lubelskie', cities: ['Lublin', 'Zamość', 'Chełm', 'Biała Podlaska', 'Puławy', 'Świdnik', 'Kraśnik', 'Łuków', 'Biłgoraj'] },
  { name: 'Lubuskie', slug: 'lubuskie', cities: ['Zielona Góra', 'Gorzów Wielkopolski', 'Nowa Sól', 'Żary', 'Żagań', 'Świebodzin', 'Kostrzyn nad Odrą', 'Międzyrzecz'] },
  { name: 'Łódzkie', slug: 'lodzkie', cities: ['Łódź', 'Pabianice', 'Zgierz', 'Aleksandrów Łódzki', 'Konstantynów Łódzki', 'Ozorków', 'Głowno', 'Kutno', 'Sieradz'] },
  { name: 'Małopolskie', slug: 'malopolskie', cities: ['Kraków', 'Tarnów', 'Nowy Sącz', 'Oświęcim', 'Chrzanów', 'Olkusz', 'Nowy Targ', 'Bochnia', 'Gorlice', 'Zakopane'] },
  { name: 'Mazowieckie', slug: 'mazowieckie', cities: ['Warszawa', 'Radom', 'Płock', 'Siedlce', 'Pruszków', 'Legionowo', 'Ostrołęka', 'Piaseczno', 'Otwock', 'Ciechanów'] },
  { name: 'Opolskie', slug: 'opolskie', cities: ['Opole', 'Kędzierzyn-Koźle', 'Nysa', 'Brzeg', 'Kluczbork', 'Prudnik', 'Strzelce Opolskie', 'Namysłów', 'Krapkowice'] },
  { name: 'Podkarpackie', slug: 'podkarpackie', cities: ['Rzeszów', 'Przemyśl', 'Stalowa Wola', 'Mielec', 'Tarnobrzeg', 'Krosno', 'Dębica', 'Jarosław', 'Sanok', 'Jasło'] },
  { name: 'Podlaskie', slug: 'podlaskie', cities: ['Białystok', 'Suwałki', 'Łomża', 'Augustów', 'Zambrów', 'Grajewo', 'Hajnówka', 'Sokółka', 'Łapy', 'Siemiatycze'] },
  { name: 'Pomorskie', slug: 'pomorskie', cities: ['Gdańsk', 'Gdynia', 'Sopot', 'Tczew', 'Starogard Gdański', 'Rumia', 'Chojnice', 'Malbork', 'Kwidzyn', 'Słupsk'] },
  { name: 'Śląskie', slug: 'slaskie', cities: ['Katowice', 'Częstochowa', 'Sosnowiec', 'Gliwice', 'Zabrze', 'Bielsko-Biała', 'Bytom', 'Ruda Śląska', 'Rybnik', 'Tychy'] },
  { name: 'Świętokrzyskie', slug: 'swietokrzyskie', cities: ['Kielce', 'Starachowice', 'Ostrowiec Świętokrzyski', 'Skarżysko-Kamienna', 'Sandomierz', 'Końskie', 'Busko-Zdrój', 'Staszów'] },
  { name: 'Warmińsko-Mazurskie', slug: 'warminsko-mazurskie', cities: ['Olsztyn', 'Elbląg', 'Ełk', 'Iława', 'Ostróda', 'Giżycko', 'Kętrzyn', 'Mrągowo', 'Bartoszyce', 'Szczytno'] },
  { name: 'Wielkopolskie', slug: 'wielkopolskie', cities: ['Poznań', 'Kalisz', 'Konin', 'Piła', 'Ostrów Wielkopolski', 'Gniezno', 'Leszno', 'Luboń', 'Świdnica', 'Śrem'] },
  { name: 'Zachodniopomorskie', slug: 'zachodniopomorskie', cities: ['Szczecin', 'Koszalin', 'Stargard', 'Kołobrzeg', 'Świnoujście', 'Szczecinek', 'Police', 'Wałcz', 'Białogard', 'Goleniów'] },
];

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
            <Link
              key={v.slug}
              to={`/gdzie-dzialamy/${v.slug}`}
              className="area-card group relative rounded-2xl overflow-hidden transition-all duration-500 hover:scale-[1.02] block"
              style={{
                background: 'linear-gradient(145deg, hsl(220 15% 10% / 0.8) 0%, hsl(220 15% 6% / 0.9) 100%)',
                border: '1px solid hsl(176 100% 43% / 0.12)',
                boxShadow: '0 4px 30px hsl(0 0% 0% / 0.3)',
              }}
            >
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                style={{
                  background: 'radial-gradient(300px circle at 50% 0%, hsl(176 100% 43% / 0.15), transparent 60%)',
                }}
              />

              <div className="relative z-10 p-5 md:p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-primary shrink-0" />
                    <h3 className="font-heading text-sm md:text-base font-semibold text-primary tracking-wide">
                      {language === 'pl' ? `Woj. ${v.name.toLowerCase()}` : v.name}
                    </h3>
                  </div>
                  <ChevronRight className="w-4 h-4 text-primary/50 group-hover:text-primary group-hover:translate-x-1 transition-all" />
                </div>

                <div className="w-full h-px bg-gradient-to-r from-primary/30 via-primary/10 to-transparent mb-4" />

                <ul className="space-y-1.5">
                  {v.cities.map((city) => (
                    <li key={city} className="flex items-center gap-2 text-sm text-foreground/70 font-sans">
                      <span className="w-1 h-1 rounded-full bg-primary/50 shrink-0" />
                      {city}
                    </li>
                  ))}
                </ul>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServiceAreas;
