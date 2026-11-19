import { useEffect } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const useSmoothScroll = () => {
  useEffect(() => {
    // Respect accessibility preference — skip smooth scroll entirely
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return;
    }

    // On touch devices native scrolling is already smooth — Lenis only adds jank there
    const isTouch = window.matchMedia('(hover: none) and (pointer: coarse)').matches;
    if (isTouch) {
      return;
    }

    // Faster, more responsive smooth scroll
    const lenis = new Lenis({
      duration: 0.9,
      easing: (t) => 1 - Math.pow(1 - t, 3),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      syncTouch: false,
      touchMultiplier: 1.5,
    });

    gsap.registerPlugin(ScrollTrigger);
    const tick = (time: number) => lenis.raf(time * 1000);
    const update = () => ScrollTrigger.update();
    lenis.on('scroll', update);
    gsap.ticker.lagSmoothing(0);
    gsap.ticker.add(tick);
    return () => {
      gsap.ticker.remove(tick);
      gsap.ticker.lagSmoothing(500, 33);
      lenis.off('scroll', update);
      lenis.destroy();
    };
  }, []);
};

export default useSmoothScroll;
