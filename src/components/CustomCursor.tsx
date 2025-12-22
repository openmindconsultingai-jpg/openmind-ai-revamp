import { useEffect, useRef, useCallback } from 'react';

interface CustomCursorProps {
  enabled?: boolean;
}

const CustomCursor = ({ enabled = true }: CustomCursorProps) => {
  const cursorRef = useRef<HTMLDivElement>(null);
  const cursorRingRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLSpanElement>(null);

  // All state kept in refs to avoid React re-renders during animation
  const stateRef = useRef({
    mouseX: 0,
    mouseY: 0,
    ringX: 0,
    ringY: 0,
    isHovering: false,
    isClicking: false,
    isVisible: false,
    hoverText: '',
    magneticElement: null as HTMLElement | null,
  });

  const magneticStrength = 0.3;

  const updateCursorStyles = useCallback(() => {
    const cursor = cursorRef.current;
    const cursorRing = cursorRingRef.current;
    const textEl = textRef.current;
    const state = stateRef.current;

    if (!cursor || !cursorRing) return;

    // Update visibility
    cursor.style.opacity = state.isVisible ? '1' : '0';
    cursorRing.style.opacity = state.isVisible ? '1' : '0';

    // Update click state
    cursor.style.transform = `translate3d(${state.mouseX - 4}px, ${state.mouseY - 4}px, 0) scale(${state.isClicking ? 0.5 : 1})`;

    // Update hover state for ring
    const ringSize = state.isHovering ? 60 : 32;
    const ringOffset = state.isHovering ? 30 : 16;
    
    cursorRing.style.width = `${ringSize}px`;
    cursorRing.style.height = `${ringSize}px`;
    cursorRing.style.borderColor = `hsl(176 100% 43% / ${state.isClicking ? 1 : state.isHovering ? 0.8 : 0.4})`;
    cursorRing.style.backgroundColor = state.isClicking 
      ? 'hsl(176 100% 43% / 0.2)' 
      : state.isHovering 
        ? 'hsl(176 100% 43% / 0.1)' 
        : 'transparent';
    cursorRing.style.transform = `translate3d(${state.ringX - ringOffset}px, ${state.ringY - ringOffset}px, 0) scale(${state.isClicking ? 0.75 : 1})`;

    // Update text
    if (textEl) {
      textEl.textContent = state.hoverText;
      textEl.style.opacity = state.isHovering && state.hoverText ? '1' : '0';
    }
  }, []);

  useEffect(() => {
    if (!enabled) return;

    const cursor = cursorRef.current;
    const cursorRing = cursorRingRef.current;

    if (!cursor || !cursorRing) return;

    let rafId = 0;
    const state = stateRef.current;

    const handlePointerMove = (e: PointerEvent) => {
      state.mouseX = e.clientX;
      state.mouseY = e.clientY;
      if (!state.isVisible) {
        state.isVisible = true;
      }
    };

    const handlePointerEnter = () => {
      state.isVisible = true;
    };

    const handlePointerLeave = () => {
      state.isVisible = false;
    };

    const handlePointerOver = (e: PointerEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;

      const hoverableElement = target.closest('[data-cursor]') as HTMLElement | null;
      const interactiveElement = target.closest('a, button, [role="button"], [data-cursor]') as HTMLElement | null;

      if (hoverableElement) {
        state.isHovering = true;
        state.hoverText = hoverableElement.getAttribute('data-cursor') || 'Odkryj';
        state.magneticElement = hoverableElement;
      } else if (interactiveElement) {
        state.isHovering = true;
        state.hoverText = '';
        state.magneticElement = interactiveElement;
      }
    };

    const handlePointerOut = (e: PointerEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;

      const related = e.relatedTarget as HTMLElement | null;
      if (related && related.closest('a, button, [role="button"], [data-cursor]')) return;

      if (target.closest('a, button, [role="button"], [data-cursor]')) {
        state.isHovering = false;
        state.hoverText = '';
        state.magneticElement = null;
      }
    };

    const handlePointerDown = () => {
      state.isClicking = true;
    };

    const handlePointerUp = () => {
      state.isClicking = false;
    };

    const animateCursor = () => {
      let targetX = state.mouseX;
      let targetY = state.mouseY;

      // Magnetic effect
      if (state.magneticElement && state.isHovering) {
        const rect = state.magneticElement.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;

        targetX = state.mouseX + (centerX - state.mouseX) * magneticStrength;
        targetY = state.mouseY + (centerY - state.mouseY) * magneticStrength;
      }

      // Ring follows with smooth interpolation
      state.ringX += (targetX - state.ringX) * 0.25;
      state.ringY += (targetY - state.ringY) * 0.25;

      // Update DOM directly - no React re-render needed
      updateCursorStyles();

      rafId = requestAnimationFrame(animateCursor);
    };

    // Use passive event listeners for better performance
    const options = { passive: true };
    window.addEventListener('pointermove', handlePointerMove, options);
    window.addEventListener('pointerdown', handlePointerDown, options);
    window.addEventListener('pointerup', handlePointerUp, options);
    window.addEventListener('pointerover', handlePointerOver, options);
    window.addEventListener('pointerout', handlePointerOut, options);
    document.addEventListener('pointerenter', handlePointerEnter, options);
    document.addEventListener('pointerleave', handlePointerLeave, options);

    animateCursor();
    document.body.classList.add('custom-cursor');

    return () => {
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('pointerdown', handlePointerDown);
      window.removeEventListener('pointerup', handlePointerUp);
      window.removeEventListener('pointerover', handlePointerOver);
      window.removeEventListener('pointerout', handlePointerOut);
      document.removeEventListener('pointerenter', handlePointerEnter);
      document.removeEventListener('pointerleave', handlePointerLeave);
      cancelAnimationFrame(rafId);
      document.body.classList.remove('custom-cursor');
    };
  }, [enabled, updateCursorStyles]);

  if (!enabled) return null;

  return (
    <>
      {/* Main cursor dot - GPU accelerated */}
      <div
        ref={cursorRef}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: 8,
          height: 8,
          borderRadius: '50%',
          backgroundColor: 'hsl(176 100% 43%)',
          pointerEvents: 'none',
          zIndex: 9999,
          mixBlendMode: 'difference',
          willChange: 'transform',
          backfaceVisibility: 'hidden',
          transform: 'translate3d(0, 0, 0)',
        }}
      />
      
      {/* Cursor ring - GPU accelerated */}
      <div
        ref={cursorRingRef}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: 32,
          height: 32,
          borderRadius: '50%',
          border: '1px solid hsl(176 100% 43% / 0.4)',
          backgroundColor: 'transparent',
          pointerEvents: 'none',
          zIndex: 9998,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          willChange: 'transform, width, height',
          backfaceVisibility: 'hidden',
          transform: 'translate3d(0, 0, 0)',
          transition: 'width 0.15s ease-out, height 0.15s ease-out, border-color 0.1s, background-color 0.1s',
        }}
      >
        <span 
          ref={textRef}
          style={{
            fontFamily: 'Inter, system-ui, sans-serif',
            fontSize: 10,
            color: 'hsl(176 100% 43%)',
            textTransform: 'uppercase',
            letterSpacing: '0.05em',
            opacity: 0,
            transition: 'opacity 0.15s',
          }}
        />
      </div>
    </>
  );
};

export default CustomCursor;
