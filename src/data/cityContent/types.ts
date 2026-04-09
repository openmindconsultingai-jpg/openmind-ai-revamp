export interface CityFAQ {
  pytanie: string;
  odpowiedz: string;
}

export interface MiastoData {
  slug: string;
  nazwa: string;
  wojewodztwo: string;
  wojewodztwoNazwa: string;
  populacja: string;
  opisGospodarki: string;
  branzeKluczowe: string[];
  wyzwaniaAI: string;
  lokalneKeywordy: string[];
  czasDojazdu: string;
  przykladZastosowania: string;
  najblizszeMiasta: string[];
  faq: CityFAQ[];
}
