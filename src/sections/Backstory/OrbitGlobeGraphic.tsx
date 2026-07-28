import { motion } from 'framer-motion';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import styles from './Backstory.module.css';

/**
 * Custom orbit-globe: a stylised blue Earth with Africa facing forward,
 * three dotted orbit rings with geometric nodes that rotate slowly,
 * plus two upright role chips.
 */
export function OrbitGlobeGraphic() {
  const reduced = useReducedMotion();

  const spin = (duration: number) =>
    reduced
      ? {}
      : {
          animate: { rotate: 360 },
          transition: { duration, ease: 'linear', repeat: Infinity },
        };

  return (
    <div className={styles.globeWrap} aria-hidden="true">
      <svg viewBox="0 0 520 520" className={styles.globeSvg}>
        {/* dotted orbit rings */}
        <circle cx="260" cy="260" r="250" className={styles.orbitDotted} />
        <circle cx="260" cy="260" r="195" className={styles.orbitDotted} />
        <circle cx="260" cy="260" r="140" className={styles.orbitDotted} />

        {/* Earth */}
        <g>
          <circle cx="260" cy="260" r="112" fill="var(--newbii-blue)" />
          <path
            fill="var(--newbii-navy)"
            d="M247 160c14-4 30 2 33 14 3 10-4 18-2 28 2 9 12 14 14 24 3 12-5 22-3 34 2 14 15 24 12 38-2 12-16 18-28 16-10-2-16-12-26-16-11-4-24-2-32-10-8-8-7-22-3-33 4-10 13-17 15-27 2-11-5-22-1-32 4-11 12-24 24-28Z"
          />
          <path
            fill="var(--newbii-navy)"
            d="M300 178c9-3 20 0 24 8 3 7-2 15 2 21 3 5 11 6 12 12 2 8-6 14-14 13-7-1-11-8-18-10-8-3-18 0-23-6-4-6-1-15 3-21 4-6 7-14 12-17Z"
            opacity="0.9"
          />
        </g>
      </svg>

      {/* rotating node layers */}
      <motion.div className={styles.ring} {...spin(42)}>
        <span className={`${styles.node} ${styles.nodePink}`} style={{ top: '4%', left: '62%' }} />
        <span className={`${styles.node} ${styles.nodeOrange}`} style={{ top: '30%', left: '96%' }} />
        <span className={`${styles.node} ${styles.nodePurple}`} style={{ top: '72%', left: '86%' }} />
        <span className={`${styles.node} ${styles.nodeYellow}`} style={{ top: '95%', left: '46%' }} />
      </motion.div>

      <motion.div className={styles.ring} {...spin(30)}>
        <span className={`${styles.node} ${styles.nodePurple}`} style={{ top: '22%', left: '10%' }} />
        <span className={`${styles.node} ${styles.nodePink}`} style={{ top: '70%', left: '16%' }} />
        <span className={`${styles.node} ${styles.nodeOrange}`} style={{ top: '50%', left: '90%' }} />
      </motion.div>

      {/* upright role chips */}
      <span className={`${styles.chip} ${styles.chipLeft}`}>
        <span aria-hidden="true">🇿🇦</span> UX DESIGNER
      </span>
      <span className={`${styles.chip} ${styles.chipRight}`}>
        <span aria-hidden="true">🇳🇬</span> DATA ANALYST
      </span>
    </div>
  );
}
