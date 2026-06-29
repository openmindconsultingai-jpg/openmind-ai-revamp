import { useEffect, useRef, memo } from 'react';

const ParticleBackground = memo(() => {
  return <ParticleCanvas />;
});



const ParticleCanvas = memo(() => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Respect user accessibility preference — no animation if reduced motion is requested
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    let animId = 0;
    let isPaused = document.hidden;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();

    const particles: Array<{
      x: number; y: number;
      vx: number; vy: number;
      size: number; alpha: number;
    }> = [];

    // Keep desktop density identical (~200). Reduce only on small mobile screens where
    // the visual difference is imperceptible but CPU savings are large.
    const isMobile = window.innerWidth < 768;
    const baseCap = isMobile ? 60 : 200;
    const count = Math.min(baseCap, Math.floor(window.innerWidth * window.innerHeight / 8000));

    for (let i = 0; i < count; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        size: Math.random() * 2.5 + 1,
        alpha: Math.random() * 0.6 + 0.3,
      });
    }

    const drawStatic = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach((p) => {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(176, 100%, 43%, ${p.alpha})`;
        ctx.fill();
      });
    };

    const FRAME_DURATION = 1000 / 30; // throttle to 30 FPS
    let lastFrameTime = 0;

    const animate = (currentTime: number) => {
      if (isPaused) return;
      animId = requestAnimationFrame(animate);
      if (currentTime - lastFrameTime < FRAME_DURATION) return;
      lastFrameTime = currentTime;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(176, 100%, 43%, ${p.alpha})`;
        ctx.fill();
      });
    };

    if (prefersReducedMotion) {
      drawStatic();
    } else {
      animId = requestAnimationFrame(animate);
    }

    let inViewport = true;
    const handleVisibility = () => {
      isPaused = document.hidden || !inViewport;
      if (!isPaused && !prefersReducedMotion) {
        cancelAnimationFrame(animId);
        animId = requestAnimationFrame(animate);
      }
    };

    document.addEventListener('visibilitychange', handleVisibility);

    const io = new IntersectionObserver((entries) => {
      inViewport = entries[0]?.isIntersecting ?? true;
      handleVisibility();
    });
    io.observe(canvas);

    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(document.body);
    window.addEventListener('resize', resize);


    return () => {
      cancelAnimationFrame(animId);
      document.removeEventListener('visibilitychange', handleVisibility);
      window.removeEventListener('resize', resize);
      resizeObserver.disconnect();
      io.disconnect();
    };
  }, []);


  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        pointerEvents: 'none',
        zIndex: 1,
        opacity: 0.8,
      }}
    />
  );
});

ParticleBackground.displayName = 'ParticleBackground';
ParticleCanvas.displayName = 'ParticleCanvas';

export default ParticleBackground;
