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

    const paint = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
      const signal = getComputedStyle(canvas).getPropertyValue('--signal').trim();
      const count = Math.min(width < 768 ? 24 : 50, Math.floor(width * height / 8000));
      ctx.beginPath();
      for (let i = 0; i < count; i++) {
        const x = (0.5 + i * 0.61803398875) % 1 * width;
        const y = (0.5 + i * 0.75487766625) % 1 * height;
        ctx.moveTo(x + 1, y);
        ctx.arc(x, y, 1, 0, Math.PI * 2);
      }
      ctx.fillStyle = `hsl(${signal} / .22)`;
      ctx.fill();
    };
    paint();
    window.addEventListener('resize', paint, { passive: true });
    return () => window.removeEventListener('resize', paint);
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
