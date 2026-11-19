import { useLayoutEffect, useRef } from 'react';
import { setCaptionActive } from './decode.mjs';

export default function DecodeCaption({ text, active }: { text: string; active?: boolean }) {
  const ref = useRef<HTMLSpanElement>(null);
  useLayoutEffect(() => {
    const root = ref.current;
    if (!root || active === undefined) return;
    setCaptionActive(root, active);
    return () => setCaptionActive(root, false);
  }, [active, text]);
  return (
    <span ref={ref} className="decode-caption">
      <span className="decode-caption-source">{text}</span>
      <span className="decode-caption-overlay" aria-hidden="true" />
    </span>
  );
}