export interface TowerCategory {
  id: string;
  label: string;
  section: string;
  at?: number;
  pin?: { x: number; y: number };
  mobilePin?: { x: number; y: number };
  href?: string;
  dialog?: string;
}
export interface TowerApi {
  select(id: string): void;
  play(): Promise<void>;
  pause(): void;
  refresh(): void;
  retry(): Promise<void>;
  destroy(): void;
}
export type TowerTheme = Record<string, string | number>;
export interface TowerOptions {
  root: string | HTMLElement;
  video: string;
  /** Ostrzejszy plik dla dużych ekranów; telefony dostają lżejszy `video`. */
  videoHd?: string;
  poster?: string;
  videoBytes?: number;
  videoHdBytes?: number;
  categories: TowerCategory[];
  damping?: number;
  headerOffset?: number;
  theme?: TowerTheme;
  onCategory?: (category: TowerCategory, index: number) => boolean | void;
  onChange?: (category: TowerCategory, index: number) => void;
  onReady?: () => void;
  onError?: (error: unknown) => void;
}
