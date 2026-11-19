const glyphs = '01<>/\\[]{}#*+=_-ĄĆĘŁŃÓŚŹŻ';
const entities = { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' };
export const escapeText = (value) => value.replace(/[&<>"']/g, (char) => entities[char]);

export const MIN_DURATION = 450;
const SHARED_LIMIT = 40;
const active = new Set();
const shared = new Set();
let sharedFrame = 0;
function sharedTick(time) {
  for (const job of [...shared]) job(time);
  sharedFrame = shared.size ? requestAnimationFrame(sharedTick) : 0;
}

// Renders a frame where every unresolved char keeps its real glyph (transparent) for exact layout.
function frameHTML(chars, stable, accentFrom) {
  let html = '';
  for (let index = 0; index < chars.length; index++) {
    const char = chars[index];
    if (index === accentFrom) html += '<span class="accent-word">';
    if (index < stable || /\s/.test(char)) html += escapeText(char);
    else html += `<span class="dc-cell">${escapeText(char)}<span class="dc-g" aria-hidden="true">${escapeText(glyphs[Math.floor(Math.random() * glyphs.length)])}</span></span>`;
  }
  if (accentFrom >= 0 && accentFrom < chars.length) html += '</span>';
  return html;
}

/** accentFrom: char index where .accent-word starts (or -1). */
export function animateDecode(node, text, duration, finish, accentFrom = -1, delay = 0) {
  const motion = matchMedia('(prefers-reduced-motion: reduce)');
  if (motion.matches || !text.trim()) { finish(); return () => {}; }
  const chars = Array.from(text);
  const total = Math.max(MIN_DURATION, duration);
  let frame = 0, start, done = false, usesShared = false;
  function stop() {
    if (done) return;
    done = true;
    cancelAnimationFrame(frame);
    shared.delete(tick); active.delete(tick);
    motion.removeEventListener('change', stop);
    finish();
  }
  function tick(time) {
    if (done) return;
    start ??= time + delay;
    const progress = Math.max(0, (time - start) / total);
    if (progress >= 1) return stop();
    node.innerHTML = frameHTML(chars, Math.floor(chars.length * progress), accentFrom);
    if (!usesShared) frame = requestAnimationFrame(tick);
  }
  motion.addEventListener('change', stop);
  node.innerHTML = frameHTML(chars, 0, accentFrom);
  if (active.size >= SHARED_LIMIT) {
    usesShared = true;
    shared.add(tick);
    sharedFrame ||= requestAnimationFrame(sharedTick);
  } else {
    active.add(tick);
    frame = requestAnimationFrame(tick);
  }
  return stop;
}

/** Waits until an enclosing .fx-reveal has .in (max 400 ms). */
export function whenRevealed(node, run) {
  const reveal = node.closest?.('.fx-reveal');
  if (!reveal || reveal.classList.contains('in')) { run(); return () => {}; }
  let fired = false;
  const go = () => { if (fired) return; fired = true; mo.disconnect(); clearTimeout(timer); run(); };
  const mo = new MutationObserver(() => { if (reveal.classList.contains('in')) go(); });
  mo.observe(reveal, { attributes: true, attributeFilter: ['class'] });
  const timer = setTimeout(go, 400);
  return () => { fired = true; mo.disconnect(); clearTimeout(timer); };
}

const running = new WeakMap();

export function setCaptionActive(root, isActive) {
  if ((root.dataset.captionActive === 'true') === isActive) return;
  root.dataset.captionActive = String(isActive);
  const captions = root.matches('.decode-caption') ? [root] : root.querySelectorAll('.decode-caption');
  for (const caption of captions) {
    running.get(caption)?.();
    if (!isActive) continue;
    const source = caption.querySelector('.decode-caption-source');
    const visual = caption.querySelector('.decode-caption-overlay');
    if (!source || !visual || matchMedia('(prefers-reduced-motion: reduce)').matches) continue;
    const finish = () => {
      source.classList.remove('sr-only');
      visual.textContent = '';
      running.delete(caption);
    };
    source.classList.add('sr-only');
    running.set(caption, animateDecode(visual, source.textContent ?? '', 650, finish));
  }
}
