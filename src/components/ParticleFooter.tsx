import { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import VideoSectionBackground from '@/components/VideoSectionBackground';

const ParticleFooter = () => {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const sectionRef = useRef<HTMLElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Particle animation
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const particles: Array<{
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
      alpha: number;
    }> = [];

    for (let i = 0; i < 80; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        size: Math.random() * 2 + 1,
        alpha: Math.random() * 0.5 + 0.2,
      });
    }

    let mouseX = canvas.width / 2;
    let mouseY = canvas.height / 2;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseX = e.clientX - rect.left;
      mouseY = e.clientY - rect.top;
    };

    canvas.addEventListener('mousemove', handleMouseMove);

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach((p) => {
        // Repel from mouse
        const dx = mouseX - p.x;
        const dy = mouseY - p.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 150) {
          p.vx -= dx * 0.001;
          p.vy -= dy * 0.001;
        }

        p.x += p.vx;
        p.y += p.vy;

        // Boundaries
        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

        // Draw
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(176, 100%, 43%, ${p.alpha})`;
        ctx.fill();
      });

      requestAnimationFrame(animate);
    };

    animate();

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    return () => {
      canvas.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <footer ref={sectionRef} className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <VideoSectionBackground opacity={0.2} blurPx={10} overlayOpacity={0.8} />

      {/* Particle Canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 pointer-events-auto"
      />

      {/* Content */}
      <div className="relative z-10 container mx-auto px-6 text-center flex flex-col items-center justify-center">
        <h2 className="font-heading text-4xl sm:text-5xl md:text-6xl lg:text-7xl mb-10 md:mb-14 text-gradient-silver font-bold">
          {t('footer.cta') || 'Zacznijmy Projekt'}
        </h2>
        
        {/* Large Contact Button - 4x larger */}
        <button
          onClick={() => navigate('/contact')}
          data-cursor="Start"
          className="group relative inline-flex items-center justify-center gap-4 px-16 md:px-24 py-8 md:py-10 font-sans text-2xl md:text-3xl rounded-full glass border-2 border-primary/50 hover:border-primary transition-all duration-500 hover:glow-primary hover:scale-105"
          style={{
            boxShadow: '0 0 40px hsl(176 100% 43% / 0.3), 0 20px 60px -20px hsl(0 0% 0% / 0.5)',
          }}
        >
          <span className="font-semibold">{t('nav.contact')}</span>
          <span className="text-primary text-3xl md:text-4xl group-hover:translate-x-2 transition-transform">→</span>
        </button>

        {/* Footer links with Privacy Policy and RODO */}
        <div className="mt-24 md:mt-32 pt-8 border-t border-border/30 w-full max-w-2xl">
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
        </div>
      </div>
    </footer>
  );
};

export default ParticleFooter;