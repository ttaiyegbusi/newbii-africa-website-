import { useEffect, useState } from 'react';
import { useReducedMotion } from './useReducedMotion';

interface CountUpOptions {
  /** While true, the value animates 0 → target; while false it shows target. */
  active: boolean;
  duration?: number;
}

/**
 * Counts an integer up to `target`. Every time `active` flips to true the
 * animation restarts from 0; when inactive it shows the final value. Honours
 * reduced-motion by pinning to the final value.
 */
export function useCountUp(target: number, { active, duration = 1400 }: CountUpOptions): number {
  const reduced = useReducedMotion();
  const [value, setValue] = useState(target);

  useEffect(() => {
    if (reduced || !active) {
      setValue(target);
      return;
    }

    let raf = 0;
    const start = performance.now();
    setValue(0);

    const tick = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3); // easeOutCubic
      setValue(Math.round(eased * target));
      if (progress < 1) raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [active, target, duration, reduced]);

  return value;
}
