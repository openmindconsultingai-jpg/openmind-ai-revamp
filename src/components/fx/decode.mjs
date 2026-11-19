const glyphs = '01<>/\\[]{}#*+=_-ĄĆĘŁŃÓŚŹŻ';
const entities = { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' };
export const escapeText = (value) => value.replace(/[&<>"']/g, (char) => entities[char]);

export function animateDecode(node, text, duration, finish) {
  const motion = matchMedia('(prefers-reduced-motion: reduce)');
  if (motion.matches || !text.trim()) { finish(); return () => {}; }
  const chars = Array.from(text);
  let frame = 0, start;
  function stop() {
    cancelAnimationFrame(frame);
    motion.removeEventListener('change', stop);
    finish();
  }
  function tick(time) {
    start ??= time;
    const progress = (time - start) / duration;
    if (progress >= 1) return stop();
    const stable = Math.floor(chars.length * progress);
    node.innerHTML = chars.map((char, index) => index < stable || /\s/.test(char)
      ? escapeText(char)
      : `<span class="dc-g">${escapeText(glyphs[Math.floor(Math.random() * glyphs.length)])}</span>`).join('');
    frame = requestAnimationFrame(tick);
  }
  motion.addEventListener('change', stop);
  frame = requestAnimationFrame(tick);
  return stop;
}

const running = new WeakMap();

export function setCaptionActive(root, active) {
  if ((root.dataset.captionActive === 'true') === active) return;
  root.dataset.captionActive = String(active);
  const captions = root.matches('.decode-caption') ? [root] : root.querySelectorAll('.decode-caption');
  for (const caption of captions) {
    running.get(caption)?.();
    if (!active) continue;
    const source = caption.querySelector('.decode-caption-source');
    const visual = caption.querySelector('.decode-caption-overlay');
    if (!source || !visual || matchMedia('(prefers-reduced-motion: reduce)').matches) continue;
    const finish = () => {
      caption.removeAttribute('data-decoding');
      visual.textContent = '';
      running.delete(caption);
    };
    caption.setAttribute('data-decoding', '');
    running.set(caption, animateDecode(visual, source.textContent ?? '', 650, finish));
  }
}