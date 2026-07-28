import { useEffect, useRef, useState } from 'react';
import { useReducedMotion } from './useReducedMotion';

interface CountUpOptions {
  /** Whether the count-up should run (e.g. section is in view). */
  active: boolean;
  duration?: number;
}

/**
 * Animates an integer from 0 up to `target` once `active` becomes true.
 * Honours reduced-motion by jumping straight to the final value.
 */
export function useCountUp(target: number, { active, duration = 1600 }: CountUpOptions): number {
  const reduced = useReducedMotion();
  const [value, setValue] = useState(0);
  const startedRef = useRef(false);

  useEffect(() => {
    if (!active || startedRef.current) return;
    startedRef.current = true;

    if (reduced) {
      setValue(target);
      return;
    }

    let raf = 0;
    const start = performance.now();

    const tick = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      // easeOutCubic
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(Math.round(eased * target));
      if (progress < 1) raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [active, target, duration, reduced]);

  return value;
}
