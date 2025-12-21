import { useEffect, useRef, useState } from 'react';

interface CustomCursorProps {
  enabled?: boolean;
}

const CustomCursor = ({ enabled = true }: CustomCursorProps) => {
  const cursorRef = useRef<HTMLDivElement>(null);
  const cursorRingRef = useRef<HTMLDivElement>(null);

  const [isHovering, setIsHovering] = useState(false);
  const [hoverText, setHoverText] = useState('');
  const [isVisible, setIsVisible] = useState(false);
  const [isClicking, setIsClicking] = useState(false);

  const hoveringRef = useRef(false);
  const hoverTextRef = useRef('');
  const clickingRef = useRef(false);

  const magneticElement = useRef<HTMLElement | null>(null);
  const magneticStrength = 0.3;

  useEffect(() => {
    if (!enabled) return;

    const cursor = cursorRef.current;
    const cursorRing = cursorRingRef.current;

    if (!cursor || !cursorRing) return;

    let mouseX = 0;
    let mouseY = 0;
    let cursorX = 0;
    let cursorY = 0;
    let ringX = 0;
    let ringY = 0;
    let rafId = 0;

    const setHoverState = (nextHovering: boolean, nextText: string, nextMagneticEl: HTMLElement | null) => {
      hoveringRef.current = nextHovering;
      magneticElement.current = nextMagneticEl;

      if (hoverTextRef.current !== nextText) {
        hoverTextRef.current = nextText;
        setHoverText(nextText);
      }
      setIsHovering((prev) => (prev === nextHovering ? prev : nextHovering));
    };

    const handlePointerMove = (e: PointerEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      setIsVisible((v) => (v ? v : true));
    };

    const handlePointerEnter = () => setIsVisible(true);
    const handlePointerLeave = () => setIsVisible(false);

    const handlePointerOver = (e: PointerEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;

      const hoverableElement = target.closest('[data-cursor]') as HTMLElement | null;
      const interactiveElement = target.closest('a, button, [role="button"], [data-cursor]') as HTMLElement | null;

      if (hoverableElement) {
        const text = hoverableElement.getAttribute('data-cursor') || 'Odkryj';
        setHoverState(true, text, hoverableElement);
      } else if (interactiveElement) {
        setHoverState(true, '', interactiveElement);
      }
    };

    const handlePointerOut = (e: PointerEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;

      // If leaving an interactive element and not immediately entering another, drop hover state.
      const related = e.relatedTarget as HTMLElement | null;
      if (related && related.closest('a, button, [role="button"], [data-cursor]')) return;

      if (target.closest('a, button, [role="button"], [data-cursor]')) {
        setHoverState(false, '', null);
      }
    };

    const handlePointerDown = () => {
      clickingRef.current = true;
      setIsClicking(true);
    };

    const handlePointerUp = () => {
      clickingRef.current = false;
      setIsClicking(false);
    };

    const animateCursor = () => {
      // Faster response (less inertia)
      const speed = 0.8;
      const ringSpeed = 0.65;

      let targetX = mouseX;
      let targetY = mouseY;

      if (magneticElement.current && hoveringRef.current) {
        const rect = magneticElement.current.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;

        targetX = mouseX + (centerX - mouseX) * magneticStrength;
        targetY = mouseY + (centerY - mouseY) * magneticStrength;
      }

      cursorX += (targetX - cursorX) * speed;
      cursorY += (targetY - cursorY) * speed;
      ringX += (targetX - ringX) * ringSpeed;
      ringY += (targetY - ringY) * ringSpeed;

      cursor.style.transform = `translate3d(${cursorX - 4}px, ${cursorY - 4}px, 0)`;
      cursorRing.style.transform = `translate3d(${ringX - (hoveringRef.current ? 30 : 16)}px, ${ringY - (hoveringRef.current ? 30 : 16)}px, 0)`;

      rafId = requestAnimationFrame(animateCursor);
    };

    window.addEventListener('pointermove', handlePointerMove, { passive: true });
    window.addEventListener('pointerdown', handlePointerDown, { passive: true });
    window.addEventListener('pointerup', handlePointerUp, { passive: true });
    window.addEventListener('pointerover', handlePointerOver, { passive: true });
    window.addEventListener('pointerout', handlePointerOut, { passive: true });
    window.addEventListener('pointerenter', handlePointerEnter, { passive: true });
    window.addEventListener('pointerleave', handlePointerLeave, { passive: true });

    animateCursor();

    document.body.classList.add('custom-cursor');

    return () => {
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('pointerdown', handlePointerDown);
      window.removeEventListener('pointerup', handlePointerUp);
      window.removeEventListener('pointerover', handlePointerOver);
      window.removeEventListener('pointerout', handlePointerOut);
      window.removeEventListener('pointerenter', handlePointerEnter);
      window.removeEventListener('pointerleave', handlePointerLeave);
      cancelAnimationFrame(rafId);
      document.body.classList.remove('custom-cursor');
    };
  }, [enabled]);

  if (!enabled) return null;

  return (
    <>
      {/* Main cursor dot */}
      <div
        ref={cursorRef}
        className={`fixed top-0 left-0 w-2 h-2 rounded-full bg-primary pointer-events-none z-[9999] transition-all duration-150 ${
          isVisible ? 'opacity-100' : 'opacity-0'
        } ${isClicking ? 'scale-50' : 'scale-100'}`}
        style={{ mixBlendMode: 'difference' }}
      />
      
      {/* Cursor ring */}
      <div
        ref={cursorRingRef}
        className={`fixed top-0 left-0 pointer-events-none z-[9998] transition-all duration-150 rounded-full flex items-center justify-center ${
          isVisible ? 'opacity-100' : 'opacity-0'
        } ${isClicking ? 'scale-75' : 'scale-100'}`}
        style={{
          width: isHovering ? 60 : 32,
          height: isHovering ? 60 : 32,
          border: `1px solid hsl(176 100% 43% / ${isClicking ? 1 : isHovering ? 0.8 : 0.4})`,
          backgroundColor: isClicking ? 'hsl(176 100% 43% / 0.2)' : isHovering ? 'hsl(176 100% 43% / 0.1)' : 'transparent',
        }}
      >
        {hoverText && (
          <span 
            className="font-sans text-[10px] text-primary uppercase tracking-wider"
            style={{ opacity: isHovering ? 1 : 0, transition: 'opacity 0.2s' }}
          >
            {hoverText}
          </span>
        )}
      </div>
    </>
  );
};

export default CustomCursor;