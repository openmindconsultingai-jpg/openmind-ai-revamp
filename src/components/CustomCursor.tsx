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

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      setIsVisible(true);
    };

    const handleMouseEnter = () => setIsVisible(true);
    const handleMouseLeave = () => setIsVisible(false);

    // Handle hoverable elements
    const handleElementHover = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const hoverableElement = target.closest('[data-cursor]');
      
      if (hoverableElement) {
        setIsHovering(true);
        const text = hoverableElement.getAttribute('data-cursor') || 'Odkryj';
        setHoverText(text);
      } else if (target.closest('a, button')) {
        setIsHovering(true);
        setHoverText('');
      } else {
        setIsHovering(false);
        setHoverText('');
      }
    };

    // Smooth cursor animation
    const animateCursor = () => {
      const speed = 0.15;
      const ringSpeed = 0.08;

      cursorX += (mouseX - cursorX) * speed;
      cursorY += (mouseY - cursorY) * speed;
      ringX += (mouseX - ringX) * ringSpeed;
      ringY += (mouseY - ringY) * ringSpeed;

      cursor.style.transform = `translate(${cursorX - 4}px, ${cursorY - 4}px)`;
      cursorRing.style.transform = `translate(${ringX - (isHovering ? 30 : 16)}px, ${ringY - (isHovering ? 30 : 16)}px)`;

      requestAnimationFrame(animateCursor);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mousemove', handleElementHover);
    document.addEventListener('mouseenter', handleMouseEnter);
    document.addEventListener('mouseleave', handleMouseLeave);
    
    animateCursor();

    // Add custom-cursor class to body
    document.body.classList.add('custom-cursor');

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousemove', handleElementHover);
      document.removeEventListener('mouseenter', handleMouseEnter);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.body.classList.remove('custom-cursor');
    };
  }, [enabled, isHovering]);

  if (!enabled) return null;

  return (
    <>
      {/* Main cursor dot */}
      <div
        ref={cursorRef}
        className={`fixed top-0 left-0 w-2 h-2 rounded-full bg-primary pointer-events-none z-[9999] transition-opacity duration-200 ${
          isVisible ? 'opacity-100' : 'opacity-0'
        }`}
        style={{ mixBlendMode: 'difference' }}
      />
      
      {/* Cursor ring */}
      <div
        ref={cursorRingRef}
        className={`fixed top-0 left-0 pointer-events-none z-[9998] transition-all duration-300 rounded-full flex items-center justify-center ${
          isVisible ? 'opacity-100' : 'opacity-0'
        }`}
        style={{
          width: isHovering ? 60 : 32,
          height: isHovering ? 60 : 32,
          border: `1px solid hsl(176 100% 43% / ${isHovering ? 0.8 : 0.4})`,
          backgroundColor: isHovering ? 'hsl(176 100% 43% / 0.1)' : 'transparent',
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