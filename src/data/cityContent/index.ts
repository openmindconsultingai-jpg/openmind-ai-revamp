import type { MiastoData } from './types';
import { dolnoslaskieCities } from './dolnoslaskie';
import { kujawskoPomorskieCities } from './kujawsko-pomorskie';
import { lubelskieCities } from './lubelskie';
import { lodzkieCities } from './lodzkie';
import { malopolskieCities } from './malopolskie';
import { mazowieckieCities } from './mazowieckie';
import { opolskieCities } from './opolskie';
import { podkarpackieCities } from './podkarpackie';
import { podlaskieCities } from './podlaskie';
import { pomorskieCities } from './pomorskie';
import { slaskieCities } from './slaskie';
import { swietokrzyskieCities } from './swietokrzyskie';
import { warminskoMazurskieCities } from './warminsko-mazurskie';
import { wielkopolskieCities } from './wielkopolskie';
import { zachodniopomorskieCities } from './zachodniopomorskie';

const allCities: MiastoData[] = [
  ...dolnoslaskieCities,
  ...kujawskoPomorskieCities,
  ...lubelskieCities,
  ...lodzkieCities,
  ...malopolskieCities,
  ...mazowieckieCities,
  ...opolskieCities,
  ...podkarpackieCities,
  ...podlaskieCities,
  ...pomorskieCities,
  ...slaskieCities,
  ...swietokrzyskieCities,
  ...warminskoMazurskieCities,
  ...wielkopolskieCities,
  ...zachodniopomorskieCities,
];

const cityMap = new Map<string, MiastoData>();
allCities.forEach((c) => cityMap.set(`${c.wojewodztwo}/${c.slug}`, c));

export const findCityContent = (
  voivodeshipSlug: string,
  citySlug: string,
): MiastoData | undefined => cityMap.get(`${voivodeshipSlug}/${citySlug}`);

export type { MiastoData, CityFAQ } from './types';
