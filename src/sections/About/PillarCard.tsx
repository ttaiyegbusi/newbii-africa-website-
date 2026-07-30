import { motion } from 'framer-motion';
import type { Pillar } from '@/data/pillars';
import { inViewOnce, EASE_PREMIUM, qaInitial } from '@/lib/motion';
import styles from './About.module.css';

export function PillarCard({ pillar, index }: { pillar: Pillar; index: number }) {
  return (
    <motion.article
      className={`${styles.card} ${pillar.span === 'full' ? styles.full : styles.half} ${styles[pillar.shape]}`}
      initial={qaInitial({ opacity: 0, y: 30 })}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={inViewOnce}
      transition={{ duration: 0.6, ease: EASE_PREMIUM, delay: index * 0.08 }}
    >
      {/* positioning wrapper (CSS) keeps the shape cropped at the right edge;
          the inner img handles the entrance animation so transforms don't clash */}
      <div className={styles.shape}>
        <motion.img
          className={styles.shapeImg}
          src={`/assets/shapes/${pillar.shape}.svg`}
          alt=""
          aria-hidden="true"
          initial={qaInitial({ opacity: 0, rotate: -10, scale: 0.9 })}
          whileInView={{ opacity: 1, rotate: 0, scale: 1 }}
          viewport={inViewOnce}
          transition={{ duration: 0.7, ease: EASE_PREMIUM, delay: index * 0.08 + 0.15 }}
        />
      </div>

      <h3 className={`display ${styles.title}`}>{pillar.title}</h3>
      <p className={styles.body}>{pillar.body}</p>
    </motion.article>
  );
}
