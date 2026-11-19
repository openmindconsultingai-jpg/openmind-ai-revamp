import { useLayoutEffect, useRef } from 'react';
import { noWidows } from '@/lib/typography';
import { animateDecode, escapeText, lastAccentIndex, whenRevealed } from './decode.mjs';

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

export default function DecodeText({ text, accentLast = false, delay = 0 }: { text: string; accentLast?: boolean; delay?: number }) {
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
    const accentIndex = accentLast ? lastAccentIndex(display) : -1;
    const final = accentIndex >= 0 ? `${escapeText(display.slice(0, accentIndex))}<span class="accent-word">${escapeText(display.slice(accentIndex))}</span>` : escapeText(display);
    const duration = Math.min(34, Math.round(14 + 0.4 * Array.from(display).length)) * (1000 / 60);
    const motion = matchMedia('(prefers-reduced-motion: reduce)');
    const accentFrom = accentIndex >= 0 ? Array.from(display.slice(0, accentIndex)).length : -1;
    let cancel: (() => void) | undefined;
    let cancelWait: (() => void) | undefined;
    let stopObserving: (() => void) | undefined;
    function finish() {
      cancel = undefined;
      visual.innerHTML = final;
    }
    function enter() {
      if (cancel || cancelWait || motion.matches) return;
      cancelWait = whenRevealed(target, () => {
        cancelWait = undefined;
        cancel = animateDecode(visual, display, duration, finish, accentFrom, delay);
      });
    }
    function configure() {
      stopObserving?.();
      cancelWait?.(); cancelWait = undefined;
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
    return () => { stopObserving?.(); cancelWait?.(); cancel?.(); motion.removeEventListener('change', configure); };
  }, [text, accentLast, delay]);
  return <span ref={targetRef} className="decode-text"><span className="sr-only">{text}</span><span aria-hidden="true" ref={visualRef} /></span>;
}
