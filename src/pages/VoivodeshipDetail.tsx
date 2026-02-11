import { useParams, Navigate } from 'react-router-dom';
import PageLayout from '@/components/PageLayout';
import ContactForm from '@/components/ContactForm';
import { useLanguage } from '@/contexts/LanguageContext';
import { MapPin, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const voivodeships: Record<string, { name: string; cities: string[] }> = {
  'dolnoslaskie': { name: 'Dolnośląskie', cities: ['Wrocław', 'Wałbrzych', 'Legnica', 'Jelenia Góra', 'Lubin', 'Głogów', 'Świdnica', 'Bolesławiec', 'Oleśnica', 'Oława'] },
  'kujawsko-pomorskie': { name: 'Kujawsko-Pomorskie', cities: ['Bydgoszcz', 'Toruń', 'Włocławek', 'Grudziądz', 'Inowrocław', 'Brodnica', 'Świecie', 'Chełmno', 'Nakło nad Notecią'] },
  'lubelskie': { name: 'Lubelskie', cities: ['Lublin', 'Zamość', 'Chełm', 'Biała Podlaska', 'Puławy', 'Świdnik', 'Kraśnik', 'Łuków', 'Biłgoraj'] },
  'lubuskie': { name: 'Lubuskie', cities: ['Zielona Góra', 'Gorzów Wielkopolski', 'Nowa Sól', 'Żary', 'Żagań', 'Świebodzin', 'Kostrzyn nad Odrą', 'Międzyrzecz'] },
  'lodzkie': { name: 'Łódzkie', cities: ['Łódź', 'Pabianice', 'Zgierz', 'Aleksandrów Łódzki', 'Konstantynów Łódzki', 'Ozorków', 'Głowno', 'Kutno', 'Sieradz'] },
  'malopolskie': { name: 'Małopolskie', cities: ['Kraków', 'Tarnów', 'Nowy Sącz', 'Oświęcim', 'Chrzanów', 'Olkusz', 'Nowy Targ', 'Bochnia', 'Gorlice', 'Zakopane'] },
  'mazowieckie': { name: 'Mazowieckie', cities: ['Warszawa', 'Radom', 'Płock', 'Siedlce', 'Pruszków', 'Legionowo', 'Ostrołęka', 'Piaseczno', 'Otwock', 'Ciechanów'] },
  'opolskie': { name: 'Opolskie', cities: ['Opole', 'Kędzierzyn-Koźle', 'Nysa', 'Brzeg', 'Kluczbork', 'Prudnik', 'Strzelce Opolskie', 'Namysłów', 'Krapkowice'] },
  'podkarpackie': { name: 'Podkarpackie', cities: ['Rzeszów', 'Przemyśl', 'Stalowa Wola', 'Mielec', 'Tarnobrzeg', 'Krosno', 'Dębica', 'Jarosław', 'Sanok', 'Jasło'] },
  'podlaskie': { name: 'Podlaskie', cities: ['Białystok', 'Suwałki', 'Łomża', 'Augustów', 'Zambrów', 'Grajewo', 'Hajnówka', 'Sokółka', 'Łapy', 'Siemiatycze'] },
  'pomorskie': { name: 'Pomorskie', cities: ['Gdańsk', 'Gdynia', 'Sopot', 'Tczew', 'Starogard Gdański', 'Rumia', 'Chojnice', 'Malbork', 'Kwidzyn', 'Słupsk'] },
  'slaskie': { name: 'Śląskie', cities: ['Katowice', 'Częstochowa', 'Sosnowiec', 'Gliwice', 'Zabrze', 'Bielsko-Biała', 'Bytom', 'Ruda Śląska', 'Rybnik', 'Tychy'] },
  'swietokrzyskie': { name: 'Świętokrzyskie', cities: ['Kielce', 'Starachowice', 'Ostrowiec Świętokrzyski', 'Skarżysko-Kamienna', 'Sandomierz', 'Końskie', 'Busko-Zdrój', 'Staszów'] },
  'warminsko-mazurskie': { name: 'Warmińsko-Mazurskie', cities: ['Olsztyn', 'Elbląg', 'Ełk', 'Iława', 'Ostróda', 'Giżycko', 'Kętrzyn', 'Mrągowo', 'Bartoszyce', 'Szczytno'] },
  'wielkopolskie': { name: 'Wielkopolskie', cities: ['Poznań', 'Kalisz', 'Konin', 'Piła', 'Ostrów Wielkopolski', 'Gniezno', 'Leszno', 'Luboń', 'Świdnica', 'Śrem'] },
  'zachodniopomorskie': { name: 'Zachodniopomorskie', cities: ['Szczecin', 'Koszalin', 'Stargard', 'Kołobrzeg', 'Świnoujście', 'Szczecinek', 'Police', 'Wałcz', 'Białogard', 'Goleniów'] },
};

const VoivodeshipDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const { language } = useLanguage();

  const data = slug ? voivodeships[slug] : null;
  if (!data) return <Navigate to="/" replace />;

  const heading = language === 'pl'
    ? `Szkolenia, wdrażanie i agencja kreatywna AI w województwie ${data.name.toLowerCase()}`
    : `AI Training, Implementation & Creative Agency in ${data.name}`;

  const description = language === 'pl'
    ? `Oferujemy kompleksowe usługi sztucznej inteligencji dla firm z województwa ${data.name.toLowerCase()}. Szkolenia AI, automatyzacja procesów, generatywne media i doradztwo strategiczne – zdalnie lub stacjonarnie w Twoim mieście.`
    : `We offer comprehensive AI services for businesses in the ${data.name} voivodeship. AI training, process automation, generative media, and strategic consulting – remotely or on-site in your city.`;

  return (
    <PageLayout>
      <section className="pt-28 md:pt-36 pb-20 md:pb-28">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            {/* Back link */}
            <Link to="/#gdzie-dzialamy">
              <Button variant="ghost" className="mb-8 gap-2 text-muted-foreground hover:text-foreground">
                <ArrowLeft className="w-4 h-4" />
                {language === 'pl' ? 'Powrót' : 'Back'}
              </Button>
            </Link>

            {/* Header */}
            <div className="mb-12 md:mb-16">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <MapPin className="w-5 h-5 text-primary" />
                </div>
                <span className="text-sm font-medium text-primary tracking-wider uppercase">
                  {language === 'pl' ? `Województwo ${data.name.toLowerCase()}` : data.name}
                </span>
              </div>

              <h1 className="font-heading text-3xl sm:text-4xl md:text-5xl font-bold mb-6 leading-tight">
                <span className="text-gradient">{heading}</span>
              </h1>

              <p className="text-base sm:text-lg text-muted-foreground leading-relaxed max-w-3xl">
                {description}
              </p>
            </div>

            {/* Cities */}
            <div className="mb-14 md:mb-20">
              <h2 className="font-heading text-xl md:text-2xl font-semibold mb-6 text-foreground">
                {language === 'pl' ? 'Miasta, w których działamy' : 'Cities we serve'}
              </h2>
              <div className="flex flex-wrap gap-2">
                {data.cities.map((city) => (
                  <span
                    key={city}
                    className="px-4 py-2 rounded-full text-sm font-medium bg-primary/10 text-primary border border-primary/20 hover:bg-primary/20 transition-colors"
                  >
                    {city}
                  </span>
                ))}
              </div>
            </div>

            {/* Services summary */}
            <div className="mb-14 md:mb-20 grid sm:grid-cols-3 gap-4">
              {[
                {
                  title: language === 'pl' ? 'Szkolenia AI' : 'AI Training',
                  desc: language === 'pl' ? 'Warsztaty i kursy dopasowane do Twojego zespołu' : 'Workshops and courses tailored to your team',
                },
                {
                  title: language === 'pl' ? 'Wdrożenia AI' : 'AI Implementation',
                  desc: language === 'pl' ? 'Automatyzacja i integracja rozwiązań AI w firmie' : 'Automation and integration of AI solutions',
                },
                {
                  title: language === 'pl' ? 'Agencja Kreatywna' : 'Creative Agency',
                  desc: language === 'pl' ? 'Generatywne media, branding i content AI' : 'Generative media, branding & AI content',
                },
              ].map((service) => (
                <div
                  key={service.title}
                  className="p-5 rounded-xl border border-border bg-card hover:border-primary/40 transition-colors"
                >
                  <h3 className="font-semibold text-foreground mb-2">{service.title}</h3>
                  <p className="text-sm text-muted-foreground">{service.desc}</p>
                </div>
              ))}
            </div>

            {/* Contact Form */}
            <div className="max-w-2xl mx-auto">
              <h2 className="font-heading text-2xl md:text-3xl font-bold mb-2 text-center">
                <span className="text-gradient">
                  {language === 'pl' ? 'Skontaktuj się z nami' : 'Get in Touch'}
                </span>
              </h2>
              <p className="text-center text-muted-foreground mb-8">
                {language === 'pl'
                  ? 'Napisz do nas – odpowiemy w ciągu 24 godzin'
                  : "Write to us – we'll respond within 24 hours"}
              </p>
              <ContactForm />
            </div>
          </div>
        </div>
      </section>
    </PageLayout>
  );
};

export default VoivodeshipDetail;
