import DecodeText from '@/components/fx/DecodeText';
import { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import RecaptchaNotice from '@/components/RecaptchaNotice';


const ParticleFooter = () => {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const sectionRef = useRef<HTMLElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const section = sectionRef.current;
    const ctx = canvas?.getContext('2d');
    if (!canvas || !section || !ctx) return;
    const motion = matchMedia('(prefers-reduced-motion: reduce)');
    const alphas = [0.24, 0.42, 0.60];
    const ink = getComputedStyle(canvas).getPropertyValue('--signal').trim();
    let width = 0, height = 0, raf = 0;
    let visible = false;
    let groups: { x: number; y: number; vx: number; vy: number; size: number }[][] = [];
    let pointer: { x: number; y: number } | undefined;

    const draw = (advance: boolean) => {
      ctx.clearRect(0, 0, width, height);
      groups.forEach((particles, index) => {
        ctx.beginPath();
        for (const p of particles) {
          if (advance) {
            if (pointer) {
              const dx = pointer.x - p.x, dy = pointer.y - p.y;
              if (dx * dx + dy * dy < 150 * 150) {
                p.vx -= dx * 0.0004;
                p.vy -= dy * 0.0004;
              }
            }
            p.vx *= 0.998;
            p.vy *= 0.998;
            p.x = Math.max(0, Math.min(width, p.x + p.vx));
            p.y = Math.max(0, Math.min(height, p.y + p.vy));
            if (p.x === 0 || p.x === width) p.vx *= -1;
            if (p.y === 0 || p.y === height) p.vy *= -1;
          }
          ctx.moveTo(p.x + p.size, p.y);
          ctx.arc(p.x, p.y, p.size, 0, 2 * Math.PI);
        }
        ctx.fillStyle = `hsl(${ink} / ${alphas[index]})`;
        ctx.fill();
      });
    };
    const canRun = () => visible && !document.hidden && !motion.matches;
    const animate = () => {
      raf = 0;
      if (!canRun()) return;
      draw(true);
      raf = requestAnimationFrame(animate);
    };
    const sync = () => {
      if (canRun()) {
        if (!raf) raf = requestAnimationFrame(animate);
      } else {
        cancelAnimationFrame(raf);
        raf = 0;
        if (visible && !document.hidden) draw(false);
      }
    };
    const resize = () => {
      width = section.clientWidth;
      height = section.clientHeight;
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      groups = [[], [], []];
      for (let i = 0; i < (width < 768 ? 24 : 50); i++) {
        groups[i % groups.length].push({ x: Math.random() * width, y: Math.random() * height,
          vx: (Math.random() - 0.5) * 0.5, vy: (Math.random() - 0.5) * 0.5, size: 1 + Math.random() * 2 });
      }
      if (visible && !document.hidden) draw(false);
    };
    const intersections = typeof IntersectionObserver === 'undefined' ? null : new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      sync();
    }, { rootMargin: '100px' });
    const sizes = typeof ResizeObserver === 'undefined' ? null : new ResizeObserver(resize);
    const move = (event: PointerEvent) => {
      const bounds = canvas.getBoundingClientRect();
      pointer = { x: event.clientX - bounds.left, y: event.clientY - bounds.top };
    };
    const leave = () => { pointer = undefined; };
    resize();
    if (!intersections) draw(false);
    intersections?.observe(section);
    sizes?.observe(section);
    document.addEventListener('visibilitychange', sync);
    motion.addEventListener('change', sync);
    canvas.addEventListener('pointermove', move, { passive: true });
    canvas.addEventListener('pointerleave', leave);
    return () => {
      cancelAnimationFrame(raf);
      intersections?.disconnect();
      sizes?.disconnect();
      document.removeEventListener('visibilitychange', sync);
      motion.removeEventListener('change', sync);
      canvas.removeEventListener('pointermove', move);
      canvas.removeEventListener('pointerleave', leave);
    };
  }, []);

  return (
    <footer ref={sectionRef} className="fx-trace relative min-h-screen flex items-center justify-center overflow-hidden">
      

      {/* Particle Canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-auto"
      />

      {/* Content */}
      <div className="relative z-10 container mx-auto px-6 text-center flex flex-col items-center justify-center">
        <h2 className="font-heading h-section mb-10 md:mb-14 text-gradient">
          <DecodeText text={t('footer.cta') || 'Zacznijmy Projekt'} accentLast />
        </h2>
        
        {/* Social Media Links */}
        <div className="flex items-center justify-center gap-8 md:gap-10 mb-16">
          {/* LinkedIn */}
          <a
            href="https://www.linkedin.com/company/openmind-ai-consulting/"
            target="_blank"
            rel="noopener noreferrer"
            className="fx-social group relative p-5 md:p-6 rounded-2xl overflow-hidden transition-transform duration-500 hover:scale-110"
          >
            {/* Rotating gradient border */}
            <span 
              className="absolute -inset-[1px] rounded-2xl opacity-40 group-hover:opacity-100 transition-opacity duration-500" aria-hidden="true"
            />
            {/* Inner layer */}
            <span 
              className="absolute inset-[1px] rounded-2xl bg-card" aria-hidden="true"
            />
            {/* Glow effect */}
            <span className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" aria-hidden="true" />
            <svg className="relative z-10 w-8 h-8 md:w-10 md:h-10 text-foreground/80 group-hover:text-primary transition-colors duration-300" fill="currentColor" viewBox="0 0 24 24">
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
            </svg>
          </a>
          
          {/* Facebook */}
          <a
            href="https://www.facebook.com/profile.php?id=61578557207265"
            target="_blank"
            rel="noopener noreferrer"
            className="fx-social group relative p-5 md:p-6 rounded-2xl overflow-hidden transition-transform duration-500 hover:scale-110"
          >
            <span 
              className="absolute -inset-[1px] rounded-2xl opacity-40 group-hover:opacity-100 transition-opacity duration-500" aria-hidden="true"
            />
            <span 
              className="absolute inset-[1px] rounded-2xl bg-card" aria-hidden="true"
            />
            <span className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" aria-hidden="true" />
            <svg className="relative z-10 w-8 h-8 md:w-10 md:h-10 text-foreground/80 group-hover:text-primary transition-colors duration-300" fill="currentColor" viewBox="0 0 24 24">
              <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
            </svg>
          </a>
          
          {/* Instagram */}
          <a
            href="https://www.instagram.com/openmind_aiconsulting/"
            target="_blank"
            rel="noopener noreferrer"
            className="fx-social group relative p-5 md:p-6 rounded-2xl overflow-hidden transition-transform duration-500 hover:scale-110"
          >
            <span 
              className="absolute -inset-[1px] rounded-2xl opacity-40 group-hover:opacity-100 transition-opacity duration-500" aria-hidden="true"
            />
            <span 
              className="absolute inset-[1px] rounded-2xl bg-card" aria-hidden="true"
            />
            <span className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" aria-hidden="true" />
            <svg className="relative z-10 w-8 h-8 md:w-10 md:h-10 text-foreground/80 group-hover:text-primary transition-colors duration-300" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
            </svg>
          </a>
          
          {/* X (Twitter) */}
          <a
            href="https://x.com/LukaszOpenMind"
            target="_blank"
            rel="noopener noreferrer"
            className="fx-social group relative p-5 md:p-6 rounded-2xl overflow-hidden transition-transform duration-500 hover:scale-110"
          >
            <span 
              className="absolute -inset-[1px] rounded-2xl opacity-40 group-hover:opacity-100 transition-opacity duration-500" aria-hidden="true"
            />
            <span 
              className="absolute inset-[1px] rounded-2xl bg-card" aria-hidden="true"
            />
            <span className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" aria-hidden="true" />
            <svg className="relative z-10 w-8 h-8 md:w-10 md:h-10 text-foreground/80 group-hover:text-primary transition-colors duration-300" fill="currentColor" viewBox="0 0 24 24">
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
            </svg>
          </a>
        </div>

        {/* Footer links with Privacy Policy and RODO */}
        <div className="pt-8 border-t border-border/30 w-full max-w-2xl">
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8 mb-6">
            <button
              onClick={() => navigate('/privacy')}
              className="font-sans text-sm text-muted-foreground hover:text-primary transition-colors"
            >
              {t('footer.privacy')}
            </button>
            <span className="hidden sm:block text-muted-foreground/50">|</span>
            <button
              onClick={() => navigate('/privacy')}
              className="font-sans text-sm text-muted-foreground hover:text-primary transition-colors"
            >
              {t('footer.rodo')}
            </button>
          </div>
          <p className="font-sans text-sm text-muted-foreground">
            {t('footer.copyright')}
          </p>
          <RecaptchaNotice className="mt-4" />
        </div>
      </div>
    </footer>
  );
};

export default ParticleFooter;