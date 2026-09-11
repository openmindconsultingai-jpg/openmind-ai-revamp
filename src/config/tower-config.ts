import type { TowerCategory, TowerTheme } from '../components/openmind-tower';
import towerVideo from '../assets/tower.mp4.asset.json';
import towerPoster from '../assets/tower-poster.png.asset.json';

// Sekcje odpowiadają realnym usługom OpenMind AI (patrz src/pages/HomeTower.tsx).
export const towerCategories: TowerCategory[] = [
  { id: 'szkolenia', label: 'Szkolenia AI', section: '#tower-szkolenia', at: 0 },
  { id: 'teledyski', label: 'Produkcja treści i wideo AI', section: '#tower-teledyski', at: 0.2 },
  { id: 'konsultacje', label: 'Konsultacje i strategia AI', section: '#tower-konsultacje', at: 0.4 },
  { id: 'automatyzacje', label: 'Automatyzacje i agenci AI', section: '#tower-automatyzacje', at: 0.6 },
  { id: 'firma', label: 'Zakładanie i rozwój firmy z AI', section: '#tower-firma', at: 0.8 },
  { id: 'strony', label: 'Strony WWW, czatboty i branding', section: '#tower-strony', at: 1 },
];

export const towerTheme: TowerTheme = {
  accent: '#00C896', shift: '6vw', scale: '.9',
  'mobile-shift': '3vw', 'mobile-scale': '.94',
  'stage-z': '0', 'ui-z': '30',
};

export const towerConfig = {
  video: towerVideo.url,
  poster: towerPoster.url,
  videoBytes: towerVideo.size,
  categories: towerCategories,
  theme: towerTheme,
  damping: .22,
  headerOffset: 0,
};
