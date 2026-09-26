import { useEffect, useRef, useState } from 'react';
import { createTower } from './engine/tower-player.mjs';
import type { TowerApi, TowerOptions } from './types';
import './tower.css';

export type LovableTowerProps = Omit<TowerOptions, 'root'> & {
  className?: string;
  onInstance?: (instance: TowerApi | null) => void;
};

/** Mount once on the route containing the existing offer sections. SSR-safe. */
export function LovableTower(props: LovableTowerProps) {
  const root = useRef<HTMLDivElement>(null);
  const callbacks = useRef(props);
  const [mountError, setMountError] = useState<string | null>(null);
  // Keep callback identities from restarting the film on host-page re-renders.
  useEffect(() => { callbacks.current = props; });
  const { video, videoHd, poster, videoBytes, videoHdBytes, categories, damping, headerOffset, theme } = props;

  useEffect(() => {
    const element = root.current;
    if (!element) return;
    let instance: TowerApi | undefined;
    setMountError(null);
    try {
      instance = createTower({
        root: element, video, videoHd, poster, videoBytes, videoHdBytes, categories, damping, headerOffset, theme,
        onCategory: (category, index) => callbacks.current.onCategory?.(category, index),
        onChange: (category, index) => callbacks.current.onChange?.(category, index),
        onReady: () => callbacks.current.onReady?.(),
        onError: (error) => callbacks.current.onError?.(error),
      });
      callbacks.current.onInstance?.(instance);
    } catch (error) {
      setMountError(error instanceof Error ? error.message : 'Nie udało się uruchomić wieży.');
      callbacks.current.onError?.(error);
    }
    return () => {
      instance?.destroy();
      callbacks.current.onInstance?.(null);
    };
  }, [video, videoHd, poster, videoBytes, videoHdBytes, categories, damping, headerOffset, theme]);

  return <>
    <div ref={root} className={props.className} />
    {mountError && <p role="alert" className="omt-integration-error">Animacja nie mogła zostać uruchomiona: {mountError}</p>}
  </>;
}
