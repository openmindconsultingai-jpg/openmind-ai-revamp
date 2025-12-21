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

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      setIsVisible(true);
    };

    const handleMouseEnter = () => setIsVisible(true);
    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);

    // Handle hoverable elements
    const handleElementHover = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const hoverableElement = target.closest('[data-cursor]');
      const interactiveElement = target.closest('a, button, [role="button"]') as HTMLElement;
      
      if (hoverableElement) {
        setIsHovering(true);
        const text = hoverableElement.getAttribute('data-cursor') || 'Odkryj';
        setHoverText(text);
        magneticElement.current = hoverableElement as HTMLElement;
      } else if (interactiveElement) {
        setIsHovering(true);
        setHoverText('');
        magneticElement.current = interactiveElement;
      } else {
        setIsHovering(false);
        setHoverText('');
        magneticElement.current = null;
      }
    };

    // Smooth cursor animation with magnetic effect
    const animateCursor = () => {
      const speed = 0.35;
      const ringSpeed = 0.25;

      let targetX = mouseX;
      let targetY = mouseY;

      // Apply magnetic effect when hovering interactive elements
      if (magneticElement.current && isHovering) {
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

      cursor.style.transform = `translate(${cursorX - 4}px, ${cursorY - 4}px)`;
      cursorRing.style.transform = `translate(${ringX - (isHovering ? 30 : 16)}px, ${ringY - (isHovering ? 30 : 16)}px)`;

      requestAnimationFrame(animateCursor);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mousemove', handleElementHover);
    document.addEventListener('mouseenter', handleMouseEnter);
    document.addEventListener('mouseleave', handleMouseLeave);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    
    animateCursor();

    // Add custom-cursor class to body
    document.body.classList.add('custom-cursor');

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousemove', handleElementHover);
      document.removeEventListener('mouseenter', handleMouseEnter);
      document.removeEventListener('mouseleave', handleMouseLeave);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      document.body.classList.remove('custom-cursor');
    };
  }, [enabled, isHovering]);

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