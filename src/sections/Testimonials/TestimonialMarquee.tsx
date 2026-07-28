import type { Testimonial } from '@/data/testimonials';
import { TestimonialCard } from './TestimonialCard';
import styles from './Testimonials.module.css';

interface MarqueeProps {
  items: Testimonial[];
  direction: 'left' | 'right';
  /** seconds per full loop */
  duration: number;
}

/**
 * Seamless infinite marquee: the track holds two copies of the items so the
 * translate can loop cleanly. Pauses on hover/focus (CSS). Under reduced
 * motion the animation is disabled and the track scrolls manually.
 */
export function TestimonialMarquee({ items, direction, duration }: MarqueeProps) {
  return (
    <div className={styles.marquee} tabIndex={0} aria-label="Community testimonials, scrollable">
      <div
        className={`${styles.track} ${direction === 'right' ? styles.trackRight : styles.trackLeft}`}
        style={{ ['--marquee-duration' as string]: `${duration}s` }}
      >
        {items.map((t) => (
          <TestimonialCard key={`a-${t.name}`} t={t} />
        ))}
        {items.map((t) => (
          <TestimonialCard key={`b-${t.name}`} t={t} ariaHidden />
        ))}
      </div>
    </div>
  );
}
