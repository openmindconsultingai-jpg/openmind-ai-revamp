import { useLayoutEffect, useRef } from 'react';
import { noWidows } from '@/lib/typography';

const glyphs = '01<>/\\[]{}#*+=_-ĄĆĘŁŃÓŚŹŻ';
const entities: Record<string, string> = { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' };
const escape = (value: string) => value.replace(/[&<>"']/g, (char) => entities[char]);
const callbacks = new WeakMap<Element, (inView: boolean) => void>();
let observer: IntersectionObserver | undefined;

function observe(node: Element, enter: (inView: boolean) => void) {
  observer ??= new IntersectionObserver((entries) => {
    for (const entry of entries) callbacks.get(entry.target)?.(entry.intersectionRatio >= 0.6);
  }, { threshold: 0.6 });
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
    const final = parts ? `${escape(display.slice(0, parts.index))}<span class="accent-word">${escape(parts[0])}</span>` : escape(display);
    const chars = Array.from(display);
    const frames = Math.min(34, Math.round(14 + 0.4 * chars.length));
    const motion = matchMedia('(prefers-reduced-motion: reduce)');
    let raf = 0;
    let stopObserving: (() => void) | undefined;
    function finish() {
      cancelAnimationFrame(raf);
      raf = 0;
      if (target) target.removeAttribute('data-decoding');
      if (visual) visual.innerHTML = final;
    }
    function enter() {
      if (raf || motion.matches || !visual || !target) return;
      target.style.setProperty('--dc-height', `${target.offsetHeight}px`);
      target.setAttribute('data-decoding', '');
      let started: number | undefined;
      const tick = (time: number) => {
        started ??= time;
        const frame = Math.floor((time - started) / (1000 / 60));
        if (frame >= frames) return finish();
        const stable = Math.floor(chars.length * frame / frames);
        visual.innerHTML = chars.map((char, index) => index < stable || /\s/.test(char)
          ? escape(char)
          : `<span class="dc-g">${escape(glyphs[Math.floor(Math.random() * glyphs.length)])}</span>`).join('');
        raf = requestAnimationFrame(tick);
      };
      raf = requestAnimationFrame(tick);
    }
    function configure() {
      stopObserving?.();
      finish();
      if (!motion.matches && 'IntersectionObserver' in window) {
        let skipFirstEntry = textChanged;
        stopObserving = observe(target, (inView) => {
          if (inView && !skipFirstEntry) enter();
          skipFirstEntry = false;
        });
      }
    }
    configure();
    motion.addEventListener('change', configure);
    return () => { stopObserving?.(); finish(); motion.removeEventListener('change', configure); };
  }, [text, accentLast]);
  return <span ref={targetRef} className="decode-text"><span className="sr-only">{text}</span><span aria-hidden="true" ref={visualRef} /></span>;
}
