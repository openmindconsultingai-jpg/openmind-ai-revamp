import type { TowerCategory, TowerTheme } from '../components/openmind-tower';
import towerVideo from '../assets/tower.mp4.asset.json';
import towerVideoHd from '../assets/tower-hd.mp4.asset.json';

// Sekcje odpowiadają realnym usługom OpenMind AI (patrz src/pages/HomeTower.tsx).
export const towerCategories: TowerCategory[] = [
  { id: 'szkolenia', label: 'Szkolenia z AI', section: '#tower-szkolenia', at: 0 },
  { id: 'konsultacje', label: 'Konsultacje i strategia AI w firmie', section: '#tower-konsultacje', at: 0.2 },
  { id: 'strony', label: 'Czatboty, strony WWW, branding', section: '#tower-strony', at: 0.4 },
  { id: 'teledyski', label: 'Produkcja treści marketingowych i wideo AI', section: '#tower-teledyski', at: 0.6 },
  { id: 'firma', label: 'Rozwój każdej firmy z AI', section: '#tower-firma', at: 0.8 },
  { id: 'automatyzacje', label: 'Automatyzacje, aplikacje dedykowane i agenci AI', section: '#tower-automatyzacje', at: 1 },
];

export const towerTheme: TowerTheme = {
  accent: '#00C896', shift: '6vw', scale: '.9',
  'mobile-shift': '3vw', 'mobile-scale': '.94',
  'stage-z': '0', 'ui-z': '30',
};

export const towerConfig = {
  video: towerVideo.url,
  videoHd: towerVideoHd.url,
  poster: '/tower/poster.jpg',
  videoBytes: towerVideo.size,
  videoHdBytes: towerVideoHd.size,
  categories: towerCategories,
  theme: towerTheme,
  damping: .12,
  headerOffset: 0,
};
