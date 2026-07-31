import { motion } from 'framer-motion';
import type { EventCard as EventCardData } from '@/data/events';
import { inViewOnce, EASE_PREMIUM, qaInitial } from '@/lib/motion';
import styles from './Events.module.css';

// Puffy cumulus top + scalloped bottom, built from overlapping circles that
// merge (same fill) into one cloud spanning the full card width.
const TOP = [
  { x: 10, r: 38 },
  { x: 74, r: 58 },
  { x: 140, r: 47 },
  { x: 200, r: 54 },
  { x: 258, r: 45 },
  { x: 306, r: 38 },
];
const BOTTOM = [
  { x: 16, r: 29 },
  { x: 74, r: 34 },
  { x: 132, r: 30 },
  { x: 190, r: 34 },
  { x: 248, r: 30 },
  { x: 300, r: 29 },
];
const BAND_TOP = 92;
const BAND_BOTTOM = 340;

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
      {/* cloud */}
      <svg className={styles.cloud} viewBox="0 0 312 430" preserveAspectRatio="none" aria-hidden="true">
        <g fill={event.wave}>
          <rect x="0" y={BAND_TOP} width="312" height={BAND_BOTTOM - BAND_TOP} />
          {TOP.map((c, i) => (
            <circle key={`t${i}`} cx={c.x} cy={BAND_TOP} r={c.r} />
          ))}
          {BOTTOM.map((c, i) => (
            <circle key={`b${i}`} cx={c.x} cy={BAND_BOTTOM} r={c.r} />
          ))}
        </g>
      </svg>

      <span className={styles.tag}>{event.tag}</span>

      <div className={styles.titleBlock} style={{ color: event.ink }}>
        <h3 className={styles.title}>{event.title}</h3>
        {event.subtitle && <p className={styles.subtitle}>{event.subtitle}</p>}
      </div>

      <div className={styles.meta}>
        <span>{event.location}</span>
        <span>{event.date}</span>
      </div>
    </motion.article>
  );
}
