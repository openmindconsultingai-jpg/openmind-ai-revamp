export interface CityData {
  name: string;
  slug: string;
  locative: string; // Polish locative case (miejscownik)
}

export interface VoivodeshipData {
  name: string;
  slug: string;
  locativeName: string; // e.g. "kujawsko-pomorskim"
  cities: CityData[];
}

const toSlug = (name: string) =>
  name
    .toLowerCase()
    .replace(/ą/g, 'a').replace(/ć/g, 'c').replace(/ę/g, 'e')
    .replace(/ł/g, 'l').replace(/ń/g, 'n').replace(/ó/g, 'o')
    .replace(/ś/g, 's').replace(/ż/g, 'z').replace(/ź/g, 'z')
    .replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');

export const voivodeships: VoivodeshipData[] = [
  {
    name: 'Dolnośląskie', slug: 'dolnoslaskie', locativeName: 'dolnośląskim',
    cities: [
      { name: 'Wrocław', slug: toSlug('Wrocław'), locative: 'Wrocławiu' },
      { name: 'Wałbrzych', slug: toSlug('Wałbrzych'), locative: 'Wałbrzychu' },
      { name: 'Legnica', slug: toSlug('Legnica'), locative: 'Legnicy' },
      { name: 'Jelenia Góra', slug: toSlug('Jelenia Góra'), locative: 'Jeleniej Górze' },
      { name: 'Lubin', slug: toSlug('Lubin'), locative: 'Lubinie' },
      { name: 'Głogów', slug: toSlug('Głogów'), locative: 'Głogowie' },
      { name: 'Świdnica', slug: toSlug('Świdnica'), locative: 'Świdnicy' },
      { name: 'Bolesławiec', slug: toSlug('Bolesławiec'), locative: 'Bolesławcu' },
      { name: 'Oleśnica', slug: toSlug('Oleśnica'), locative: 'Oleśnicy' },
      { name: 'Oława', slug: toSlug('Oława'), locative: 'Oławie' },
    ],
  },
  {
    name: 'Kujawsko-Pomorskie', slug: 'kujawsko-pomorskie', locativeName: 'kujawsko-pomorskim',
    cities: [
      { name: 'Bydgoszcz', slug: toSlug('Bydgoszcz'), locative: 'Bydgoszczy' },
      { name: 'Toruń', slug: toSlug('Toruń'), locative: 'Toruniu' },
      { name: 'Włocławek', slug: toSlug('Włocławek'), locative: 'Włocławku' },
      { name: 'Grudziądz', slug: toSlug('Grudziądz'), locative: 'Grudziądzu' },
      { name: 'Inowrocław', slug: toSlug('Inowrocław'), locative: 'Inowrocławiu' },
      { name: 'Brodnica', slug: toSlug('Brodnica'), locative: 'Brodnicy' },
      { name: 'Świecie', slug: toSlug('Świecie'), locative: 'Świeciu' },
      { name: 'Chełmno', slug: toSlug('Chełmno'), locative: 'Chełmnie' },
      { name: 'Nakło nad Notecią', slug: toSlug('Nakło nad Notecią'), locative: 'Nakle nad Notecią' },
    ],
  },
  {
    name: 'Lubelskie', slug: 'lubelskie', locativeName: 'lubelskim',
    cities: [
      { name: 'Lublin', slug: toSlug('Lublin'), locative: 'Lublinie' },
      { name: 'Zamość', slug: toSlug('Zamość'), locative: 'Zamościu' },
      { name: 'Chełm', slug: toSlug('Chełm'), locative: 'Chełmie' },
      { name: 'Biała Podlaska', slug: toSlug('Biała Podlaska'), locative: 'Białej Podlaskiej' },
      { name: 'Puławy', slug: toSlug('Puławy'), locative: 'Puławach' },
      { name: 'Świdnik', slug: toSlug('Świdnik'), locative: 'Świdniku' },
      { name: 'Kraśnik', slug: toSlug('Kraśnik'), locative: 'Kraśniku' },
      { name: 'Łuków', slug: toSlug('Łuków'), locative: 'Łukowie' },
      { name: 'Biłgoraj', slug: toSlug('Biłgoraj'), locative: 'Biłgoraju' },
    ],
  },
  {
    name: 'Lubuskie', slug: 'lubuskie', locativeName: 'lubuskim',
    cities: [
      { name: 'Zielona Góra', slug: toSlug('Zielona Góra'), locative: 'Zielonej Górze' },
      { name: 'Gorzów Wielkopolski', slug: toSlug('Gorzów Wielkopolski'), locative: 'Gorzowie Wielkopolskim' },
      { name: 'Nowa Sól', slug: toSlug('Nowa Sól'), locative: 'Nowej Soli' },
      { name: 'Żary', slug: toSlug('Żary'), locative: 'Żarach' },
      { name: 'Żagań', slug: toSlug('Żagań'), locative: 'Żaganiu' },
      { name: 'Świebodzin', slug: toSlug('Świebodzin'), locative: 'Świebodzinie' },
      { name: 'Kostrzyn nad Odrą', slug: toSlug('Kostrzyn nad Odrą'), locative: 'Kostrzynie nad Odrą' },
      { name: 'Międzyrzecz', slug: toSlug('Międzyrzecz'), locative: 'Międzyrzeczu' },
    ],
  },
  {
    name: 'Łódzkie', slug: 'lodzkie', locativeName: 'łódzkim',
    cities: [
      { name: 'Łódź', slug: toSlug('Łódź'), locative: 'Łodzi' },
      { name: 'Pabianice', slug: toSlug('Pabianice'), locative: 'Pabianicach' },
      { name: 'Zgierz', slug: toSlug('Zgierz'), locative: 'Zgierzu' },
      { name: 'Aleksandrów Łódzki', slug: toSlug('Aleksandrów Łódzki'), locative: 'Aleksandrowie Łódzkim' },
      { name: 'Konstantynów Łódzki', slug: toSlug('Konstantynów Łódzki'), locative: 'Konstantynowie Łódzkim' },
      { name: 'Ozorków', slug: toSlug('Ozorków'), locative: 'Ozorkowie' },
      { name: 'Głowno', slug: toSlug('Głowno'), locative: 'Głownie' },
      { name: 'Kutno', slug: toSlug('Kutno'), locative: 'Kutnie' },
      { name: 'Sieradz', slug: toSlug('Sieradz'), locative: 'Sieradzu' },
    ],
  },
  {
    name: 'Małopolskie', slug: 'malopolskie', locativeName: 'małopolskim',
    cities: [
      { name: 'Kraków', slug: toSlug('Kraków'), locative: 'Krakowie' },
      { name: 'Tarnów', slug: toSlug('Tarnów'), locative: 'Tarnowie' },
      { name: 'Nowy Sącz', slug: toSlug('Nowy Sącz'), locative: 'Nowym Sączu' },
      { name: 'Oświęcim', slug: toSlug('Oświęcim'), locative: 'Oświęcimiu' },
      { name: 'Chrzanów', slug: toSlug('Chrzanów'), locative: 'Chrzanowie' },
      { name: 'Olkusz', slug: toSlug('Olkusz'), locative: 'Olkuszu' },
      { name: 'Nowy Targ', slug: toSlug('Nowy Targ'), locative: 'Nowym Targu' },
      { name: 'Bochnia', slug: toSlug('Bochnia'), locative: 'Bochni' },
      { name: 'Gorlice', slug: toSlug('Gorlice'), locative: 'Gorlicach' },
      { name: 'Zakopane', slug: toSlug('Zakopane'), locative: 'Zakopanem' },
    ],
  },
  {
    name: 'Mazowieckie', slug: 'mazowieckie', locativeName: 'mazowieckim',
    cities: [
      { name: 'Warszawa', slug: toSlug('Warszawa'), locative: 'Warszawie' },
      { name: 'Radom', slug: toSlug('Radom'), locative: 'Radomiu' },
      { name: 'Płock', slug: toSlug('Płock'), locative: 'Płocku' },
      { name: 'Siedlce', slug: toSlug('Siedlce'), locative: 'Siedlcach' },
      { name: 'Pruszków', slug: toSlug('Pruszków'), locative: 'Pruszkowie' },
      { name: 'Legionowo', slug: toSlug('Legionowo'), locative: 'Legionowie' },
      { name: 'Ostrołęka', slug: toSlug('Ostrołęka'), locative: 'Ostrołęce' },
      { name: 'Piaseczno', slug: toSlug('Piaseczno'), locative: 'Piasecznie' },
      { name: 'Otwock', slug: toSlug('Otwock'), locative: 'Otwocku' },
      { name: 'Ciechanów', slug: toSlug('Ciechanów'), locative: 'Ciechanowie' },
    ],
  },
  {
    name: 'Opolskie', slug: 'opolskie', locativeName: 'opolskim',
    cities: [
      { name: 'Opole', slug: toSlug('Opole'), locative: 'Opolu' },
      { name: 'Kędzierzyn-Koźle', slug: toSlug('Kędzierzyn-Koźle'), locative: 'Kędzierzynie-Koźlu' },
      { name: 'Nysa', slug: toSlug('Nysa'), locative: 'Nysie' },
      { name: 'Brzeg', slug: toSlug('Brzeg'), locative: 'Brzegu' },
      { name: 'Kluczbork', slug: toSlug('Kluczbork'), locative: 'Kluczborku' },
      { name: 'Prudnik', slug: toSlug('Prudnik'), locative: 'Prudniku' },
      { name: 'Strzelce Opolskie', slug: toSlug('Strzelce Opolskie'), locative: 'Strzelcach Opolskich' },
      { name: 'Namysłów', slug: toSlug('Namysłów'), locative: 'Namysłowie' },
      { name: 'Krapkowice', slug: toSlug('Krapkowice'), locative: 'Krapkowicach' },
    ],
  },
  {
    name: 'Podkarpackie', slug: 'podkarpackie', locativeName: 'podkarpackim',
    cities: [
      { name: 'Rzeszów', slug: toSlug('Rzeszów'), locative: 'Rzeszowie' },
      { name: 'Przemyśl', slug: toSlug('Przemyśl'), locative: 'Przemyślu' },
      { name: 'Stalowa Wola', slug: toSlug('Stalowa Wola'), locative: 'Stalowej Woli' },
      { name: 'Mielec', slug: toSlug('Mielec'), locative: 'Mielcu' },
      { name: 'Tarnobrzeg', slug: toSlug('Tarnobrzeg'), locative: 'Tarnobrzegu' },
      { name: 'Krosno', slug: toSlug('Krosno'), locative: 'Krośnie' },
      { name: 'Dębica', slug: toSlug('Dębica'), locative: 'Dębicy' },
      { name: 'Jarosław', slug: toSlug('Jarosław'), locative: 'Jarosławiu' },
      { name: 'Sanok', slug: toSlug('Sanok'), locative: 'Sanoku' },
      { name: 'Jasło', slug: toSlug('Jasło'), locative: 'Jaśle' },
    ],
  },
  {
    name: 'Podlaskie', slug: 'podlaskie', locativeName: 'podlaskim',
    cities: [
      { name: 'Białystok', slug: toSlug('Białystok'), locative: 'Białymstoku' },
      { name: 'Suwałki', slug: toSlug('Suwałki'), locative: 'Suwałkach' },
      { name: 'Łomża', slug: toSlug('Łomża'), locative: 'Łomży' },
      { name: 'Augustów', slug: toSlug('Augustów'), locative: 'Augustowie' },
      { name: 'Zambrów', slug: toSlug('Zambrów'), locative: 'Zambrowie' },
      { name: 'Grajewo', slug: toSlug('Grajewo'), locative: 'Grajewie' },
      { name: 'Hajnówka', slug: toSlug('Hajnówka'), locative: 'Hajnówce' },
      { name: 'Sokółka', slug: toSlug('Sokółka'), locative: 'Sokółce' },
      { name: 'Łapy', slug: toSlug('Łapy'), locative: 'Łapach' },
      { name: 'Siemiatycze', slug: toSlug('Siemiatycze'), locative: 'Siemiatyczach' },
    ],
  },
  {
    name: 'Pomorskie', slug: 'pomorskie', locativeName: 'pomorskim',
    cities: [
      { name: 'Gdańsk', slug: toSlug('Gdańsk'), locative: 'Gdańsku' },
      { name: 'Gdynia', slug: toSlug('Gdynia'), locative: 'Gdyni' },
      { name: 'Sopot', slug: toSlug('Sopot'), locative: 'Sopocie' },
      { name: 'Tczew', slug: toSlug('Tczew'), locative: 'Tczewie' },
      { name: 'Starogard Gdański', slug: toSlug('Starogard Gdański'), locative: 'Starogardzie Gdańskim' },
      { name: 'Rumia', slug: toSlug('Rumia'), locative: 'Rumi' },
      { name: 'Chojnice', slug: toSlug('Chojnice'), locative: 'Chojnicach' },
      { name: 'Malbork', slug: toSlug('Malbork'), locative: 'Malborku' },
      { name: 'Kwidzyn', slug: toSlug('Kwidzyn'), locative: 'Kwidzynie' },
      { name: 'Słupsk', slug: toSlug('Słupsk'), locative: 'Słupsku' },
    ],
  },
  {
    name: 'Śląskie', slug: 'slaskie', locativeName: 'śląskim',
    cities: [
      { name: 'Katowice', slug: toSlug('Katowice'), locative: 'Katowicach' },
      { name: 'Częstochowa', slug: toSlug('Częstochowa'), locative: 'Częstochowie' },
      { name: 'Sosnowiec', slug: toSlug('Sosnowiec'), locative: 'Sosnowcu' },
      { name: 'Gliwice', slug: toSlug('Gliwice'), locative: 'Gliwicach' },
      { name: 'Zabrze', slug: toSlug('Zabrze'), locative: 'Zabrzu' },
      { name: 'Bielsko-Biała', slug: toSlug('Bielsko-Biała'), locative: 'Bielsku-Białej' },
      { name: 'Bytom', slug: toSlug('Bytom'), locative: 'Bytomiu' },
      { name: 'Ruda Śląska', slug: toSlug('Ruda Śląska'), locative: 'Rudzie Śląskiej' },
      { name: 'Rybnik', slug: toSlug('Rybnik'), locative: 'Rybniku' },
      { name: 'Tychy', slug: toSlug('Tychy'), locative: 'Tychach' },
    ],
  },
  {
    name: 'Świętokrzyskie', slug: 'swietokrzyskie', locativeName: 'świętokrzyskim',
    cities: [
      { name: 'Kielce', slug: toSlug('Kielce'), locative: 'Kielcach' },
      { name: 'Starachowice', slug: toSlug('Starachowice'), locative: 'Starachowicach' },
      { name: 'Ostrowiec Świętokrzyski', slug: toSlug('Ostrowiec Świętokrzyski'), locative: 'Ostrowcu Świętokrzyskim' },
      { name: 'Skarżysko-Kamienna', slug: toSlug('Skarżysko-Kamienna'), locative: 'Skarżysku-Kamiennej' },
      { name: 'Sandomierz', slug: toSlug('Sandomierz'), locative: 'Sandomierzu' },
      { name: 'Końskie', slug: toSlug('Końskie'), locative: 'Końskich' },
      { name: 'Busko-Zdrój', slug: toSlug('Busko-Zdrój'), locative: 'Busku-Zdroju' },
      { name: 'Staszów', slug: toSlug('Staszów'), locative: 'Staszowie' },
    ],
  },
  {
    name: 'Warmińsko-Mazurskie', slug: 'warminsko-mazurskie', locativeName: 'warmińsko-mazurskim',
    cities: [
      { name: 'Olsztyn', slug: toSlug('Olsztyn'), locative: 'Olsztynie' },
      { name: 'Elbląg', slug: toSlug('Elbląg'), locative: 'Elblągu' },
      { name: 'Ełk', slug: toSlug('Ełk'), locative: 'Ełku' },
      { name: 'Iława', slug: toSlug('Iława'), locative: 'Iławie' },
      { name: 'Ostróda', slug: toSlug('Ostróda'), locative: 'Ostródzie' },
      { name: 'Giżycko', slug: toSlug('Giżycko'), locative: 'Giżycku' },
      { name: 'Kętrzyn', slug: toSlug('Kętrzyn'), locative: 'Kętrzynie' },
      { name: 'Mrągowo', slug: toSlug('Mrągowo'), locative: 'Mrągowie' },
      { name: 'Bartoszyce', slug: toSlug('Bartoszyce'), locative: 'Bartoszycach' },
      { name: 'Szczytno', slug: toSlug('Szczytno'), locative: 'Szczytnie' },
    ],
  },
  {
    name: 'Wielkopolskie', slug: 'wielkopolskie', locativeName: 'wielkopolskim',
    cities: [
      { name: 'Poznań', slug: toSlug('Poznań'), locative: 'Poznaniu' },
      { name: 'Kalisz', slug: toSlug('Kalisz'), locative: 'Kaliszu' },
      { name: 'Konin', slug: toSlug('Konin'), locative: 'Koninie' },
      { name: 'Piła', slug: toSlug('Piła'), locative: 'Pile' },
      { name: 'Ostrów Wielkopolski', slug: toSlug('Ostrów Wielkopolski'), locative: 'Ostrowie Wielkopolskim' },
      { name: 'Gniezno', slug: toSlug('Gniezno'), locative: 'Gnieźnie' },
      { name: 'Leszno', slug: toSlug('Leszno'), locative: 'Lesznie' },
      { name: 'Luboń', slug: toSlug('Luboń'), locative: 'Luboniu' },
      { name: 'Świdnica', slug: toSlug('Świdnica'), locative: 'Świdnicy' },
      { name: 'Śrem', slug: toSlug('Śrem'), locative: 'Śremie' },
    ],
  },
  {
    name: 'Zachodniopomorskie', slug: 'zachodniopomorskie', locativeName: 'zachodniopomorskim',
    cities: [
      { name: 'Szczecin', slug: toSlug('Szczecin'), locative: 'Szczecinie' },
      { name: 'Koszalin', slug: toSlug('Koszalin'), locative: 'Koszalinie' },
      { name: 'Stargard', slug: toSlug('Stargard'), locative: 'Stargardzie' },
      { name: 'Kołobrzeg', slug: toSlug('Kołobrzeg'), locative: 'Kołobrzegu' },
      { name: 'Świnoujście', slug: toSlug('Świnoujście'), locative: 'Świnoujściu' },
      { name: 'Szczecinek', slug: toSlug('Szczecinek'), locative: 'Szczecinku' },
      { name: 'Police', slug: toSlug('Police'), locative: 'Policach' },
      { name: 'Wałcz', slug: toSlug('Wałcz'), locative: 'Wałczu' },
      { name: 'Białogard', slug: toSlug('Białogard'), locative: 'Białogardzie' },
      { name: 'Goleniów', slug: toSlug('Goleniów'), locative: 'Goleniowie' },
    ],
  },
];

// Helper to find voivodeship & city by slugs
export const findVoivodeship = (slug: string) =>
  voivodeships.find((v) => v.slug === slug);

export const findCity = (voivodeshipSlug: string, citySlug: string) => {
  const v = findVoivodeship(voivodeshipSlug);
  if (!v) return null;
  const city = v.cities.find((c) => c.slug === citySlug);
  return city ? { voivodeship: v, city } : null;
};
