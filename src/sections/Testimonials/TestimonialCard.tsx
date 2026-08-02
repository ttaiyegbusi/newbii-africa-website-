import type { Testimonial } from '@/data/testimonials';
import { SocialIcon } from '@/components/ui/SocialIcon';
import styles from './Testimonials.module.css';

export function TestimonialCard({ t, ariaHidden }: { t: Testimonial; ariaHidden?: boolean }) {
  return (
    <figure className={styles.card} aria-hidden={ariaHidden}>
      <div className={styles.top}>
        <figcaption className={styles.name}>{t.name}</figcaption>
        <span className={styles.flag} aria-hidden="true">
          {t.flag}
        </span>
      </div>
      <blockquote className={styles.quote}>&ldquo;{t.quote}&rdquo;</blockquote>
      <div className={styles.bottom}>
        <span className={styles.role}>{t.role}</span>
        <SocialIcon platform={t.social} className={styles.social} />
      </div>
    </figure>
  );
}
