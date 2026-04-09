export interface CityFAQ {
  pytanie: string;
  odpowiedz: string;
}

export interface CityFAQEn {
  question: string;
  answer: string;
}

export interface MiastoDataEN {
  opisGospodarki: string;
  branzeKluczowe: string[];
  wyzwaniaAI: string;
  czasDojazdu: string;
  przykladZastosowania: string;
  faq: CityFAQEn[];
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
  en?: MiastoDataEN;
}
