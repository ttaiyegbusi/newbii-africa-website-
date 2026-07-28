import { motion } from 'framer-motion';
import type { EventCard as EventCardData } from '@/data/events';
import { inViewOnce, EASE_PREMIUM, qaInitial } from '@/lib/motion';
import styles from './Events.module.css';

export function EventCard({ event, index }: { event: EventCardData; index: number }) {
  return (
    <motion.article
      className={styles.card}
      style={{ background: event.color }}
      initial={qaInitial({ opacity: 0, y: 30 })}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={inViewOnce}
      transition={{ duration: 0.6, ease: EASE_PREMIUM, delay: index * 0.12 }}
    >
      <span className={styles.tag}>{event.tag}</span>

      {/* wavy cloud shape */}
      <svg className={styles.wave} viewBox="0 0 340 260" preserveAspectRatio="none" aria-hidden="true">
        <path
          fill={event.wave}
          d="M0 70c18-24 44-24 60-6 8-30 52-32 66-6 14-26 52-24 62 2 12-22 44-20 56 2 10-16 30-16 40 0V260H0Z"
        />
      </svg>

      <div className={styles.content} style={{ color: event.ink }}>
        <div className={styles.titleBlock}>
          <h3 className={styles.title}>{event.title}</h3>
          {event.subtitle && <p className={styles.subtitle}>{event.subtitle}</p>}
        </div>
        <div className={styles.meta}>
          <span>{event.location}</span>
          <span>{event.date}</span>
        </div>
      </div>
    </motion.article>
  );
}
