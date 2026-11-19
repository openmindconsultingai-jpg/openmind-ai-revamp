export function initSignal() {
  const root = document.documentElement;
  const selector = ':is(.fx-reveal, .fx-trace)';
  const reveal = 'IntersectionObserver' in window ? new IntersectionObserver((entries) => {
    for (const { target, isIntersecting } of entries) {
      if (!isIntersecting) continue;
      target.classList.add('in');
      reveal?.unobserve(target);
    }
  }, { threshold: 0.08 }) : undefined;
  const add = (node: Element) => {
    if (node.matches(selector) && !node.classList.contains('in')) reveal?.observe(node);
    node.querySelectorAll(`${selector}:not(.in)`).forEach((element) => reveal?.observe(element));
  };
  const remove = (node: Element) => {
    if (node.matches(selector)) reveal?.unobserve(node);
    node.querySelectorAll(selector).forEach((element) => reveal?.unobserve(element));
  };
  if (reveal) {
    const changes = new MutationObserver((records) => {
      for (const record of records) {
        for (const node of record.removedNodes) if (node instanceof Element) remove(node);
        for (const node of record.addedNodes) if (node instanceof Element) add(node);
      }
    });
    changes.observe(document.getElementById('root') ?? document.body, { childList: true, subtree: true });
    add(document.body);
    root.classList.add('js-fx');
  }

  const desktop = matchMedia('(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)');
  let grid: HTMLElement | null = null;
  let raf = 0;
  let point: PointerEvent;
  const position = () => {
    raf = 0;
    const { clientX: x, clientY: y, target } = point;
    const card = target instanceof Element ? target.closest<HTMLElement>('.fx-card') : null;
    const bounds = card?.getBoundingClientRect();
    if (!grid?.isConnected) grid = document.querySelector<HTMLElement>('.fx-grid');
    grid?.style.setProperty('--x', `${x}px`);
    grid?.style.setProperty('--y', `${y}px`);
    if (card && bounds) {
      card.style.setProperty('--tick-from-x', String(Math.max(0, 1 - 12 / bounds.width)));
      card.style.setProperty('--tick-from-y', String(Math.max(0, 1 - 12 / bounds.height)));
      card.style.setProperty('--mx', `${x - bounds.left}px`);
      card.style.setProperty('--my', `${y - bounds.top}px`);
    }
  };
  const move = (event: PointerEvent) => {
    point = event;
    if (!raf) raf = requestAnimationFrame(position);
  };
  const configure = () => {
    document.removeEventListener('pointermove', move);
    cancelAnimationFrame(raf);
    raf = 0;
    if (desktop.matches) document.addEventListener('pointermove', move, { passive: true });
  };
  desktop.addEventListener('change', configure);
  configure();
}
