import type { Variants } from 'framer-motion';

export const EASE_PREMIUM = [0.22, 1, 0.36, 1] as const;

/**
 * QA escape hatch (`?qa=1`): render motion elements at their final state on
 * load instead of gating on IntersectionObserver / RAF, which are throttled in
 * a hidden/background tab. `qaInitial(x)` returns `false` (skip initial anim →
 * show final) under QA, otherwise the original initial value.
 */
export const QA =
  typeof window !== 'undefined' && new URLSearchParams(window.location.search).has('qa');

export const qaInitial = <T>(hidden: T): T | false => (QA ? false : hidden);

/** Standard "rise + fade" entrance for a single block. */
export const revealUp: Variants = {
  hidden: { opacity: 0, y: 70 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 2.0, ease: EASE_PREMIUM },
  },
};

/** Parent that staggers its children on entrance. */
export const staggerParent = (stagger = 0.18, delayChildren = 0.05): Variants => ({
  hidden: {},
  visible: {
    transition: { staggerChildren: stagger, delayChildren },
  },
});

/** Child item for use inside a `staggerParent`. */
export const staggerChild: Variants = {
  hidden: { opacity: 0, y: 56 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 1.7, ease: EASE_PREMIUM },
  },
};

/** Shared viewport config so reveals fire once, as the block is reached. */
export const inViewOnce = { once: true, amount: 0.32 } as const;
