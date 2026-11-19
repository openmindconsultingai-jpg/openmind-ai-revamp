import { useLayoutEffect, useRef } from 'react';
import { lastAccentIndex, setCaptionActive } from './decode.mjs';

export default function DecodeCaption({ text, active, accentLast = false }: { text: string; active?: boolean; accentLast?: boolean }) {
  const ref = useRef<HTMLSpanElement>(null);
  const accentIndex = accentLast ? lastAccentIndex(text) : -1;
  useLayoutEffect(() => {
    const root = ref.current;
    if (!root || active === undefined) return;
    setCaptionActive(root, active);
    return () => setCaptionActive(root, false);
  }, [active, text, accentLast]);
  return (
    <span ref={ref} className="decode-caption">
      <span className="decode-caption-source">{accentIndex < 0 ? text : <>{text.slice(0, accentIndex)}<span className="accent-word">{text.slice(accentIndex)}</span></>}</span>
      <span className="decode-caption-overlay" aria-hidden="true" />
    </span>
  );
}