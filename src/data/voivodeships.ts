export interface CityData {
  name: string;
  slug: string;
  locative: string; // Polish locative case (miejscownik)
  genitive: string; // Polish genitive case (dopełniacz, 'z ...')
}

export interface VoivodeshipData {
  name: string;
  slug: string;
  locativeName: string; // e.g. "kujawsko-pomorskim"
  genitiveName: string; // e.g. "kujawsko-pomorskiego" (z województwa ...)
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
    name: 'Dolnośląskie', slug: 'dolnoslaskie', locativeName: 'dolnośląskim', genitiveName: 'dolnośląskiego',
    cities: [
      { name: 'Wrocław', slug: toSlug('Wrocław'), locative: 'Wrocławiu', genitive: 'Wrocławia' },
      { name: 'Wałbrzych', slug: toSlug('Wałbrzych'), locative: 'Wałbrzychu', genitive: 'Wałbrzycha' },
      { name: 'Legnica', slug: toSlug('Legnica'), locative: 'Legnicy', genitive: 'Legnicy' },
      { name: 'Jelenia Góra', slug: toSlug('Jelenia Góra'), locative: 'Jeleniej Górze', genitive: 'Jeleniej Góry' },
      { name: 'Lubin', slug: toSlug('Lubin'), locative: 'Lubinie', genitive: 'Lubina' },
      { name: 'Głogów', slug: toSlug('Głogów'), locative: 'Głogowie', genitive: 'Głogowa' },
      { name: 'Świdnica', slug: toSlug('Świdnica'), locative: 'Świdnicy', genitive: 'Świdnicy' },
      { name: 'Bolesławiec', slug: toSlug('Bolesławiec'), locative: 'Bolesławcu', genitive: 'Bolesławca' },
      { name: 'Oleśnica', slug: toSlug('Oleśnica'), locative: 'Oleśnicy', genitive: 'Oleśnicy' },
      { name: 'Oława', slug: toSlug('Oława'), locative: 'Oławie', genitive: 'Oławy' },
      { name: 'Dzierżoniów', slug: 'dzierzoniow', locative: 'Dzierżoniowie', genitive: 'Dzierżoniowa' },
      { name: 'Zgorzelec', slug: 'zgorzelec', locative: 'Zgorzelcu', genitive: 'Zgorzelca' },
    ],
  },
  {
    name: 'Kujawsko-Pomorskie', slug: 'kujawsko-pomorskie', locativeName: 'kujawsko-pomorskim', genitiveName: 'kujawsko-pomorskiego',
    cities: [
      { name: 'Bydgoszcz', slug: toSlug('Bydgoszcz'), locative: 'Bydgoszczy', genitive: 'Bydgoszczy' },
      { name: 'Toruń', slug: toSlug('Toruń'), locative: 'Toruniu', genitive: 'Torunia' },
      { name: 'Włocławek', slug: toSlug('Włocławek'), locative: 'Włocławku', genitive: 'Włocławka' },
      { name: 'Grudziądz', slug: toSlug('Grudziądz'), locative: 'Grudziądzu', genitive: 'Grudziądza' },
      { name: 'Inowrocław', slug: toSlug('Inowrocław'), locative: 'Inowrocławiu', genitive: 'Inowrocławia' },
      { name: 'Brodnica', slug: toSlug('Brodnica'), locative: 'Brodnicy', genitive: 'Brodnicy' },
      { name: 'Świecie', slug: toSlug('Świecie'), locative: 'Świeciu', genitive: 'Świecia' },
      { name: 'Chełmno', slug: toSlug('Chełmno'), locative: 'Chełmnie', genitive: 'Chełmna' },
      { name: 'Nakło nad Notecią', slug: toSlug('Nakło nad Notecią'), locative: 'Nakle nad Notecią', genitive: 'Nakła nad Notecią' },
      { name: 'Rypin', slug: 'rypin', locative: 'Rypinie', genitive: 'Rypina' },
      { name: 'Tuchola', slug: 'tuchola', locative: 'Tucholi', genitive: 'Tucholi' },
      { name: 'Aleksandrów Kujawski', slug: 'aleksandrow-kujawski', locative: 'Aleksandrowie Kujawskim', genitive: 'Aleksandrowa Kujawskiego' },
    ],
  },
  {
    name: 'Lubelskie', slug: 'lubelskie', locativeName: 'lubelskim', genitiveName: 'lubelskiego',
    cities: [
      { name: 'Lublin', slug: toSlug('Lublin'), locative: 'Lublinie', genitive: 'Lublina' },
      { name: 'Zamość', slug: toSlug('Zamość'), locative: 'Zamościu', genitive: 'Zamościa' },
      { name: 'Chełm', slug: toSlug('Chełm'), locative: 'Chełmie', genitive: 'Chełma' },
      { name: 'Biała Podlaska', slug: toSlug('Biała Podlaska'), locative: 'Białej Podlaskiej', genitive: 'Białej Podlaskiej' },
      { name: 'Puławy', slug: toSlug('Puławy'), locative: 'Puławach', genitive: 'Puław' },
      { name: 'Świdnik', slug: toSlug('Świdnik'), locative: 'Świdniku', genitive: 'Świdnika' },
      { name: 'Kraśnik', slug: toSlug('Kraśnik'), locative: 'Kraśniku', genitive: 'Kraśnika' },
      { name: 'Łuków', slug: toSlug('Łuków'), locative: 'Łukowie', genitive: 'Łukowa' },
      { name: 'Biłgoraj', slug: toSlug('Biłgoraj'), locative: 'Biłgoraju', genitive: 'Biłgoraja' },
      { name: 'Lubartów', slug: 'lubartow', locative: 'Lubartowie', genitive: 'Lubartowa' },
      { name: 'Tomaszów Lubelski', slug: 'tomaszow-lubelski', locative: 'Tomaszowie Lubelskim', genitive: 'Tomaszowa Lubelskiego' },
      { name: 'Hrubieszów', slug: 'hrubieszow', locative: 'Hrubieszowie', genitive: 'Hrubieszowa' },
    ],
  },
  {
    name: 'Lubuskie', slug: 'lubuskie', locativeName: 'lubuskim', genitiveName: 'lubuskiego',
    cities: [
      { name: 'Zielona Góra', slug: toSlug('Zielona Góra'), locative: 'Zielonej Górze', genitive: 'Zielonej Góry' },
      { name: 'Gorzów Wielkopolski', slug: toSlug('Gorzów Wielkopolski'), locative: 'Gorzowie Wielkopolskim', genitive: 'Gorzowa Wielkopolskiego' },
      { name: 'Nowa Sól', slug: toSlug('Nowa Sól'), locative: 'Nowej Soli', genitive: 'Nowej Soli' },
      { name: 'Żary', slug: toSlug('Żary'), locative: 'Żarach', genitive: 'Żar' },
      { name: 'Żagań', slug: toSlug('Żagań'), locative: 'Żaganiu', genitive: 'Żagania' },
      { name: 'Świebodzin', slug: toSlug('Świebodzin'), locative: 'Świebodzinie', genitive: 'Świebodzina' },
      { name: 'Kostrzyn nad Odrą', slug: toSlug('Kostrzyn nad Odrą'), locative: 'Kostrzynie nad Odrą', genitive: 'Kostrzyna nad Odrą' },
      { name: 'Międzyrzecz', slug: toSlug('Międzyrzecz'), locative: 'Międzyrzeczu', genitive: 'Międzyrzecza' },
      { name: 'Słubice', slug: 'slubice', locative: 'Słubicach', genitive: 'Słubic' },
      { name: 'Sulechów', slug: 'sulechow', locative: 'Sulechowie', genitive: 'Sulechowa' },
      { name: 'Gubin', slug: 'gubin', locative: 'Gubinie', genitive: 'Gubina' },
      { name: 'Szprotawa', slug: 'szprotawa', locative: 'Szprotawie', genitive: 'Szprotawy' },
    ],
  },
  {
    name: 'Łódzkie', slug: 'lodzkie', locativeName: 'łódzkim', genitiveName: 'łódzkiego',
    cities: [
      { name: 'Łódź', slug: toSlug('Łódź'), locative: 'Łodzi', genitive: 'Łodzi' },
      { name: 'Pabianice', slug: toSlug('Pabianice'), locative: 'Pabianicach', genitive: 'Pabianic' },
      { name: 'Zgierz', slug: toSlug('Zgierz'), locative: 'Zgierzu', genitive: 'Zgierza' },
      { name: 'Aleksandrów Łódzki', slug: toSlug('Aleksandrów Łódzki'), locative: 'Aleksandrowie Łódzkim', genitive: 'Aleksandrowa Łódzkiego' },
      { name: 'Konstantynów Łódzki', slug: toSlug('Konstantynów Łódzki'), locative: 'Konstantynowie Łódzkim', genitive: 'Konstantynowa Łódzkiego' },
      { name: 'Ozorków', slug: toSlug('Ozorków'), locative: 'Ozorkowie', genitive: 'Ozorkowa' },
      { name: 'Głowno', slug: toSlug('Głowno'), locative: 'Głownie', genitive: 'Głowna' },
      { name: 'Kutno', slug: toSlug('Kutno'), locative: 'Kutnie', genitive: 'Kutna' },
      { name: 'Sieradz', slug: toSlug('Sieradz'), locative: 'Sieradzu', genitive: 'Sieradza' },
      { name: 'Piotrków Trybunalski', slug: 'piotrkow-trybunalski', locative: 'Piotrkowie Trybunalskim', genitive: 'Piotrkowa Trybunalskiego' },
      { name: 'Tomaszów Mazowiecki', slug: 'tomaszow-mazowiecki', locative: 'Tomaszowie Mazowieckim', genitive: 'Tomaszowa Mazowieckiego' },
      { name: 'Bełchatów', slug: 'belchatow', locative: 'Bełchatowie', genitive: 'Bełchatowa' },
    ],
  },
  {
    name: 'Małopolskie', slug: 'malopolskie', locativeName: 'małopolskim', genitiveName: 'małopolskiego',
    cities: [
      { name: 'Kraków', slug: toSlug('Kraków'), locative: 'Krakowie', genitive: 'Krakowa' },
      { name: 'Tarnów', slug: toSlug('Tarnów'), locative: 'Tarnowie', genitive: 'Tarnowa' },
      { name: 'Nowy Sącz', slug: toSlug('Nowy Sącz'), locative: 'Nowym Sączu', genitive: 'Nowego Sącza' },
      { name: 'Oświęcim', slug: toSlug('Oświęcim'), locative: 'Oświęcimiu', genitive: 'Oświęcimia' },
      { name: 'Chrzanów', slug: toSlug('Chrzanów'), locative: 'Chrzanowie', genitive: 'Chrzanowa' },
      { name: 'Olkusz', slug: toSlug('Olkusz'), locative: 'Olkuszu', genitive: 'Olkusza' },
      { name: 'Nowy Targ', slug: toSlug('Nowy Targ'), locative: 'Nowym Targu', genitive: 'Nowego Targu' },
      { name: 'Bochnia', slug: toSlug('Bochnia'), locative: 'Bochni', genitive: 'Bochni' },
      { name: 'Gorlice', slug: toSlug('Gorlice'), locative: 'Gorlicach', genitive: 'Gorlic' },
      { name: 'Zakopane', slug: toSlug('Zakopane'), locative: 'Zakopanem', genitive: 'Zakopanego' },
      { name: 'Wieliczka', slug: 'wieliczka', locative: 'Wieliczce', genitive: 'Wieliczki' },
      { name: 'Andrychów', slug: 'andrychow', locative: 'Andrychowie', genitive: 'Andrychowa' },
    ],
  },
  {
    name: 'Mazowieckie', slug: 'mazowieckie', locativeName: 'mazowieckim', genitiveName: 'mazowieckiego',
    cities: [
      { name: 'Warszawa', slug: toSlug('Warszawa'), locative: 'Warszawie', genitive: 'Warszawy' },
      { name: 'Radom', slug: toSlug('Radom'), locative: 'Radomiu', genitive: 'Radomia' },
      { name: 'Płock', slug: toSlug('Płock'), locative: 'Płocku', genitive: 'Płocka' },
      { name: 'Siedlce', slug: toSlug('Siedlce'), locative: 'Siedlcach', genitive: 'Siedlec' },
      { name: 'Pruszków', slug: toSlug('Pruszków'), locative: 'Pruszkowie', genitive: 'Pruszkowa' },
      { name: 'Legionowo', slug: toSlug('Legionowo'), locative: 'Legionowie', genitive: 'Legionowa' },
      { name: 'Ostrołęka', slug: toSlug('Ostrołęka'), locative: 'Ostrołęce', genitive: 'Ostrołęki' },
      { name: 'Piaseczno', slug: toSlug('Piaseczno'), locative: 'Piasecznie', genitive: 'Piaseczna' },
      { name: 'Otwock', slug: toSlug('Otwock'), locative: 'Otwocku', genitive: 'Otwocka' },
      { name: 'Ciechanów', slug: toSlug('Ciechanów'), locative: 'Ciechanowie', genitive: 'Ciechanowa' },
      { name: 'Mińsk Mazowiecki', slug: 'minsk-mazowiecki', locative: 'Mińsku Mazowieckim', genitive: 'Mińska Mazowieckiego' },
      { name: 'Wyszków', slug: 'wyszkow', locative: 'Wyszkowie', genitive: 'Wyszkowa' },
    ],
  },
  {
    name: 'Opolskie', slug: 'opolskie', locativeName: 'opolskim', genitiveName: 'opolskiego',
    cities: [
      { name: 'Opole', slug: toSlug('Opole'), locative: 'Opolu', genitive: 'Opola' },
      { name: 'Kędzierzyn-Koźle', slug: toSlug('Kędzierzyn-Koźle'), locative: 'Kędzierzynie-Koźlu', genitive: 'Kędzierzyna-Koźla' },
      { name: 'Nysa', slug: toSlug('Nysa'), locative: 'Nysie', genitive: 'Nysy' },
      { name: 'Brzeg', slug: toSlug('Brzeg'), locative: 'Brzegu', genitive: 'Brzegu' },
      { name: 'Kluczbork', slug: toSlug('Kluczbork'), locative: 'Kluczborku', genitive: 'Kluczborka' },
      { name: 'Prudnik', slug: toSlug('Prudnik'), locative: 'Prudniku', genitive: 'Prudnika' },
      { name: 'Strzelce Opolskie', slug: toSlug('Strzelce Opolskie'), locative: 'Strzelcach Opolskich', genitive: 'Strzelec Opolskich' },
      { name: 'Namysłów', slug: toSlug('Namysłów'), locative: 'Namysłowie', genitive: 'Namysłowa' },
      { name: 'Krapkowice', slug: toSlug('Krapkowice'), locative: 'Krapkowicach', genitive: 'Krapkowic' },
      { name: 'Głubczyce', slug: 'glubczyce', locative: 'Głubczycach', genitive: 'Głubczyc' },
      { name: 'Olesno', slug: 'olesno', locative: 'Oleśnie', genitive: 'Olesna' },
      { name: 'Grodków', slug: 'grodkow', locative: 'Grodkowie', genitive: 'Grodkowa' },
    ],
  },
  {
    name: 'Podkarpackie', slug: 'podkarpackie', locativeName: 'podkarpackim', genitiveName: 'podkarpackiego',
    cities: [
      { name: 'Rzeszów', slug: toSlug('Rzeszów'), locative: 'Rzeszowie', genitive: 'Rzeszowa' },
      { name: 'Przemyśl', slug: toSlug('Przemyśl'), locative: 'Przemyślu', genitive: 'Przemyśla' },
      { name: 'Stalowa Wola', slug: toSlug('Stalowa Wola'), locative: 'Stalowej Woli', genitive: 'Stalowej Woli' },
      { name: 'Mielec', slug: toSlug('Mielec'), locative: 'Mielcu', genitive: 'Mielca' },
      { name: 'Tarnobrzeg', slug: toSlug('Tarnobrzeg'), locative: 'Tarnobrzegu', genitive: 'Tarnobrzega' },
      { name: 'Krosno', slug: toSlug('Krosno'), locative: 'Krośnie', genitive: 'Krosna' },
      { name: 'Dębica', slug: toSlug('Dębica'), locative: 'Dębicy', genitive: 'Dębicy' },
      { name: 'Jarosław', slug: toSlug('Jarosław'), locative: 'Jarosławiu', genitive: 'Jarosławia' },
      { name: 'Sanok', slug: toSlug('Sanok'), locative: 'Sanoku', genitive: 'Sanoka' },
      { name: 'Jasło', slug: toSlug('Jasło'), locative: 'Jaśle', genitive: 'Jasła' },
      { name: 'Łańcut', slug: 'lancut', locative: 'Łańcucie', genitive: 'Łańcuta' },
      { name: 'Ropczyce', slug: 'ropczyce', locative: 'Ropczycach', genitive: 'Ropczyc' },
    ],
  },
  {
    name: 'Podlaskie', slug: 'podlaskie', locativeName: 'podlaskim', genitiveName: 'podlaskiego',
    cities: [
      { name: 'Białystok', slug: toSlug('Białystok'), locative: 'Białymstoku', genitive: 'Białegostoku' },
      { name: 'Suwałki', slug: toSlug('Suwałki'), locative: 'Suwałkach', genitive: 'Suwałk' },
      { name: 'Łomża', slug: toSlug('Łomża'), locative: 'Łomży', genitive: 'Łomży' },
      { name: 'Augustów', slug: toSlug('Augustów'), locative: 'Augustowie', genitive: 'Augustowa' },
      { name: 'Zambrów', slug: toSlug('Zambrów'), locative: 'Zambrowie', genitive: 'Zambrowa' },
      { name: 'Grajewo', slug: toSlug('Grajewo'), locative: 'Grajewie', genitive: 'Grajewa' },
      { name: 'Hajnówka', slug: toSlug('Hajnówka'), locative: 'Hajnówce', genitive: 'Hajnówki' },
      { name: 'Sokółka', slug: toSlug('Sokółka'), locative: 'Sokółce', genitive: 'Sokółki' },
      { name: 'Łapy', slug: toSlug('Łapy'), locative: 'Łapach', genitive: 'Łap' },
      { name: 'Siemiatycze', slug: toSlug('Siemiatycze'), locative: 'Siemiatyczach', genitive: 'Siemiatycz' },
      { name: 'Bielsk Podlaski', slug: 'bielsk-podlaski', locative: 'Bielsku Podlaskim', genitive: 'Bielska Podlaskiego' },
      { name: 'Kolno', slug: 'kolno', locative: 'Kolnie', genitive: 'Kolna' },
    ],
  },
  {
    name: 'Pomorskie', slug: 'pomorskie', locativeName: 'pomorskim', genitiveName: 'pomorskiego',
    cities: [
      { name: 'Gdańsk', slug: toSlug('Gdańsk'), locative: 'Gdańsku', genitive: 'Gdańska' },
      { name: 'Gdynia', slug: toSlug('Gdynia'), locative: 'Gdyni', genitive: 'Gdyni' },
      { name: 'Sopot', slug: toSlug('Sopot'), locative: 'Sopocie', genitive: 'Sopotu' },
      { name: 'Tczew', slug: toSlug('Tczew'), locative: 'Tczewie', genitive: 'Tczewa' },
      { name: 'Starogard Gdański', slug: toSlug('Starogard Gdański'), locative: 'Starogardzie Gdańskim', genitive: 'Starogardu Gdańskiego' },
      { name: 'Rumia', slug: toSlug('Rumia'), locative: 'Rumi', genitive: 'Rumi' },
      { name: 'Chojnice', slug: toSlug('Chojnice'), locative: 'Chojnicach', genitive: 'Chojnic' },
      { name: 'Malbork', slug: toSlug('Malbork'), locative: 'Malborku', genitive: 'Malborka' },
      { name: 'Kwidzyn', slug: toSlug('Kwidzyn'), locative: 'Kwidzynie', genitive: 'Kwidzyna' },
      { name: 'Słupsk', slug: toSlug('Słupsk'), locative: 'Słupsku', genitive: 'Słupska' },
      { name: 'Wejherowo', slug: 'wejherowo', locative: 'Wejherowie', genitive: 'Wejherowa' },
      { name: 'Lębork', slug: 'lebork', locative: 'Lęborku', genitive: 'Lęborka' },
    ],
  },
  {
    name: 'Śląskie', slug: 'slaskie', locativeName: 'śląskim', genitiveName: 'śląskiego',
    cities: [
      { name: 'Katowice', slug: toSlug('Katowice'), locative: 'Katowicach', genitive: 'Katowic' },
      { name: 'Częstochowa', slug: toSlug('Częstochowa'), locative: 'Częstochowie', genitive: 'Częstochowy' },
      { name: 'Sosnowiec', slug: toSlug('Sosnowiec'), locative: 'Sosnowcu', genitive: 'Sosnowca' },
      { name: 'Gliwice', slug: toSlug('Gliwice'), locative: 'Gliwicach', genitive: 'Gliwic' },
      { name: 'Zabrze', slug: toSlug('Zabrze'), locative: 'Zabrzu', genitive: 'Zabrza' },
      { name: 'Bielsko-Biała', slug: toSlug('Bielsko-Biała'), locative: 'Bielsku-Białej', genitive: 'Bielska-Białej' },
      { name: 'Bytom', slug: toSlug('Bytom'), locative: 'Bytomiu', genitive: 'Bytomia' },
      { name: 'Ruda Śląska', slug: toSlug('Ruda Śląska'), locative: 'Rudzie Śląskiej', genitive: 'Rudy Śląskiej' },
      { name: 'Rybnik', slug: toSlug('Rybnik'), locative: 'Rybniku', genitive: 'Rybnika' },
      { name: 'Tychy', slug: toSlug('Tychy'), locative: 'Tychach', genitive: 'Tychów' },
      { name: 'Dąbrowa Górnicza', slug: 'dabrowa-gornicza', locative: 'Dąbrowie Górniczej', genitive: 'Dąbrowy Górniczej' },
      { name: 'Jastrzębie-Zdrój', slug: 'jastrzebie-zdroj', locative: 'Jastrzębiu-Zdroju', genitive: 'Jastrzębia-Zdroju' },
    ],
  },
  {
    name: 'Świętokrzyskie', slug: 'swietokrzyskie', locativeName: 'świętokrzyskim', genitiveName: 'świętokrzyskiego',
    cities: [
      { name: 'Kielce', slug: toSlug('Kielce'), locative: 'Kielcach', genitive: 'Kielc' },
      { name: 'Starachowice', slug: toSlug('Starachowice'), locative: 'Starachowicach', genitive: 'Starachowic' },
      { name: 'Ostrowiec Świętokrzyski', slug: toSlug('Ostrowiec Świętokrzyski'), locative: 'Ostrowcu Świętokrzyskim', genitive: 'Ostrowca Świętokrzyskiego' },
      { name: 'Skarżysko-Kamienna', slug: toSlug('Skarżysko-Kamienna'), locative: 'Skarżysku-Kamiennej', genitive: 'Skarżyska-Kamiennej' },
      { name: 'Sandomierz', slug: toSlug('Sandomierz'), locative: 'Sandomierzu', genitive: 'Sandomierza' },
      { name: 'Końskie', slug: toSlug('Końskie'), locative: 'Końskich', genitive: 'Końskich' },
      { name: 'Busko-Zdrój', slug: toSlug('Busko-Zdrój'), locative: 'Busku-Zdroju', genitive: 'Buska-Zdroju' },
      { name: 'Staszów', slug: toSlug('Staszów'), locative: 'Staszowie', genitive: 'Staszowa' },
      { name: 'Jędrzejów', slug: 'jedrzejow', locative: 'Jędrzejowie', genitive: 'Jędrzejowa' },
      { name: 'Włoszczowa', slug: 'wloszczowa', locative: 'Włoszczowie', genitive: 'Włoszczowy' },
      { name: 'Pińczów', slug: 'pinczow', locative: 'Pińczowie', genitive: 'Pińczowa' },
      { name: 'Opatów', slug: 'opatow', locative: 'Opatowie', genitive: 'Opatowa' },
    ],
  },
  {
    name: 'Warmińsko-Mazurskie', slug: 'warminsko-mazurskie', locativeName: 'warmińsko-mazurskim', genitiveName: 'warmińsko-mazurskiego',
    cities: [
      { name: 'Olsztyn', slug: toSlug('Olsztyn'), locative: 'Olsztynie', genitive: 'Olsztyna' },
      { name: 'Elbląg', slug: toSlug('Elbląg'), locative: 'Elblągu', genitive: 'Elbląga' },
      { name: 'Ełk', slug: toSlug('Ełk'), locative: 'Ełku', genitive: 'Ełku' },
      { name: 'Iława', slug: toSlug('Iława'), locative: 'Iławie', genitive: 'Iławy' },
      { name: 'Ostróda', slug: toSlug('Ostróda'), locative: 'Ostródzie', genitive: 'Ostródy' },
      { name: 'Giżycko', slug: toSlug('Giżycko'), locative: 'Giżycku', genitive: 'Giżycka' },
      { name: 'Kętrzyn', slug: toSlug('Kętrzyn'), locative: 'Kętrzynie', genitive: 'Kętrzyna' },
      { name: 'Mrągowo', slug: toSlug('Mrągowo'), locative: 'Mrągowie', genitive: 'Mrągowa' },
      { name: 'Bartoszyce', slug: toSlug('Bartoszyce'), locative: 'Bartoszycach', genitive: 'Bartoszyc' },
      { name: 'Szczytno', slug: toSlug('Szczytno'), locative: 'Szczytnie', genitive: 'Szczytna' },
      { name: 'Działdowo', slug: 'dzialdowo', locative: 'Działdowie', genitive: 'Działdowa' },
      { name: 'Nidzica', slug: 'nidzica', locative: 'Nidzicy', genitive: 'Nidzicy' },
    ],
  },
  {
    name: 'Wielkopolskie', slug: 'wielkopolskie', locativeName: 'wielkopolskim', genitiveName: 'wielkopolskiego',
    cities: [
      { name: 'Poznań', slug: toSlug('Poznań'), locative: 'Poznaniu', genitive: 'Poznania' },
      { name: 'Kalisz', slug: toSlug('Kalisz'), locative: 'Kaliszu', genitive: 'Kalisza' },
      { name: 'Konin', slug: toSlug('Konin'), locative: 'Koninie', genitive: 'Konina' },
      { name: 'Piła', slug: toSlug('Piła'), locative: 'Pile', genitive: 'Piły' },
      { name: 'Ostrów Wielkopolski', slug: toSlug('Ostrów Wielkopolski'), locative: 'Ostrowie Wielkopolskim', genitive: 'Ostrowa Wielkopolskiego' },
      { name: 'Gniezno', slug: toSlug('Gniezno'), locative: 'Gnieźnie', genitive: 'Gniezna' },
      { name: 'Leszno', slug: toSlug('Leszno'), locative: 'Lesznie', genitive: 'Leszna' },
      { name: 'Luboń', slug: toSlug('Luboń'), locative: 'Luboniu', genitive: 'Lubonia' },
      { name: 'Świdnica', slug: toSlug('Świdnica'), locative: 'Świdnicy', genitive: 'Świdnicy' },
      { name: 'Śrem', slug: toSlug('Śrem'), locative: 'Śremie', genitive: 'Śremu' },
      { name: 'Swarzędz', slug: 'swarzedz', locative: 'Swarzędzu', genitive: 'Swarzędza' },
      { name: 'Turek', slug: 'turek', locative: 'Turku', genitive: 'Turku' },
    ],
  },
  {
    name: 'Zachodniopomorskie', slug: 'zachodniopomorskie', locativeName: 'zachodniopomorskim', genitiveName: 'zachodniopomorskiego',
    cities: [
      { name: 'Szczecin', slug: toSlug('Szczecin'), locative: 'Szczecinie', genitive: 'Szczecina' },
      { name: 'Koszalin', slug: toSlug('Koszalin'), locative: 'Koszalinie', genitive: 'Koszalina' },
      { name: 'Stargard', slug: toSlug('Stargard'), locative: 'Stargardzie', genitive: 'Stargardu' },
      { name: 'Kołobrzeg', slug: toSlug('Kołobrzeg'), locative: 'Kołobrzegu', genitive: 'Kołobrzegu' },
      { name: 'Świnoujście', slug: toSlug('Świnoujście'), locative: 'Świnoujściu', genitive: 'Świnoujścia' },
      { name: 'Szczecinek', slug: toSlug('Szczecinek'), locative: 'Szczecinku', genitive: 'Szczecinka' },
      { name: 'Police', slug: toSlug('Police'), locative: 'Policach', genitive: 'Polic' },
      { name: 'Wałcz', slug: toSlug('Wałcz'), locative: 'Wałczu', genitive: 'Wałcza' },
      { name: 'Białogard', slug: toSlug('Białogard'), locative: 'Białogardzie', genitive: 'Białogardu' },
      { name: 'Goleniów', slug: toSlug('Goleniów'), locative: 'Goleniowie', genitive: 'Goleniowa' },
      { name: 'Gryfino', slug: 'gryfino', locative: 'Gryfinie', genitive: 'Gryfina' },
      { name: 'Choszczno', slug: 'choszczno', locative: 'Choszcznie', genitive: 'Choszczna' },
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
