import { motion } from 'framer-motion';
import type { ReactNode } from 'react';
import { revealUp, inViewOnce } from '@/lib/motion';

// QA escape hatch: `?qa=1` renders everything in its revealed state on load,
// so screenshots don't depend on IntersectionObserver firing in a hidden tab.
const QA = typeof window !== 'undefined' && new URLSearchParams(window.location.search).has('qa');

interface RevealProps {
  children: ReactNode;
  className?: string;
  /** Extra delay in seconds before this block reveals. */
  delay?: number;
  as?: 'div' | 'section' | 'header' | 'article' | 'li';
}

/**
 * Wraps content in a once-only "rise + fade" entrance tied to the viewport.
 * Reduced-motion is handled globally (CSS) and by Framer's own reduced-motion support.
 */
export function Reveal({ children, className, delay = 0, as = 'div' }: RevealProps) {
  const Comp = motion[as];
  return (
    <Comp
      className={className}
      initial={QA ? 'visible' : 'hidden'}
      whileInView="visible"
      viewport={inViewOnce}
      variants={revealUp}
      transition={{ delay }}
    >
      {children}
    </Comp>
  );
}
