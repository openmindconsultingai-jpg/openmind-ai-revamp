import { useLayoutEffect, useRef } from 'react';
import { noWidows } from '@/lib/typography';
import { animateDecode, escapeText } from './decode.mjs';

const callbacks = new WeakMap<Element, (inView: boolean) => void>();
let observer: IntersectionObserver | undefined;

function observe(node: Element, enter: (inView: boolean) => void) {
  observer ??= new IntersectionObserver((entries) => {
    for (const entry of entries) {
      const threshold = entry.boundingClientRect.height < 40 ? 0.25 : 0.6;
      callbacks.get(entry.target)?.(entry.isIntersecting && entry.intersectionRatio >= threshold);
    }
  }, { threshold: [0.25, 0.6] });
  callbacks.set(node, enter);
  observer.observe(node);
  return () => { observer?.unobserve(node); callbacks.delete(node); };
}

export default function DecodeText({ text, accentLast = false }: { text: string; accentLast?: boolean }) {
  const visualRef = useRef<HTMLSpanElement>(null);
  const targetRef = useRef<HTMLSpanElement>(null);
  const previousText = useRef(text);
  useLayoutEffect(() => {
    const visual = visualRef.current;
    const target = targetRef.current;
    if (!visual || !target) return;
    const textChanged = previousText.current !== text;
    previousText.current = text;
    const display = noWidows(text);
    const parts = accentLast ? /\S+(?:\u00a0\S+)*\s*$/.exec(display) : null;
    const final = parts ? `${escapeText(display.slice(0, parts.index))}<span class="accent-word">${escapeText(parts[0])}</span>` : escapeText(display);
    const duration = Math.min(34, Math.round(14 + 0.4 * Array.from(display).length)) * (1000 / 60);
    const motion = matchMedia('(prefers-reduced-motion: reduce)');
    let cancel: (() => void) | undefined;
    let stopObserving: (() => void) | undefined;
    function finish() {
      cancel = undefined;
      target.removeAttribute('data-decoding');
      visual.innerHTML = final;
    }
    function enter() {
      if (cancel || motion.matches) return;
      target.style.setProperty('--dc-height', `${target.offsetHeight}px`);
      target.setAttribute('data-decoding', '');
      cancel = animateDecode(visual, display, duration, finish);
    }
    function configure() {
      stopObserving?.();
      cancel?.();
      finish();
      if (!motion.matches && 'IntersectionObserver' in window) {
        let skipFirstEntry = textChanged;
        let wasInView = false;
        stopObserving = observe(target, (inView) => {
          if (inView && !wasInView && !skipFirstEntry) enter();
          wasInView = inView;
          skipFirstEntry = false;
        });
      }
    }
    configure();
    motion.addEventListener('change', configure);
    return () => { stopObserving?.(); cancel?.(); motion.removeEventListener('change', configure); };
  }, [text, accentLast]);
  return <span ref={targetRef} className="decode-text"><span className="sr-only">{text}</span><span aria-hidden="true" ref={visualRef} /></span>;
}
