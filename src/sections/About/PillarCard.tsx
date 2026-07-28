import { motion } from 'framer-motion';
import type { Pillar } from '@/data/pillars';
import { DiamondSquare, CurvedRing, StarSixFrame, BlockD } from '@/components/shapes';
import { inViewOnce, EASE_PREMIUM, qaInitial } from '@/lib/motion';
import styles from './About.module.css';

const shapeFor = (pillar: Pillar) => {
  switch (pillar.shape) {
    case 'diamond':
      return <DiamondSquare className={styles.shapeSvg} />;
    case 'curvedRing':
      return <CurvedRing className={styles.shapeSvg} />;
    case 'starSix':
      return <StarSixFrame className={styles.shapeSvg} />;
    case 'blockD':
      return <BlockD className={styles.shapeSvg} />;
  }
};

export function PillarCard({ pillar, index }: { pillar: Pillar; index: number }) {
  return (
    <motion.article
      className={`${styles.card} ${pillar.span === 'full' ? styles.full : styles.half} ${styles[pillar.shape]}`}
      initial={qaInitial({ opacity: 0, y: 30 })}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={inViewOnce}
      transition={{ duration: 0.6, ease: EASE_PREMIUM, delay: index * 0.08 }}
    >
      <motion.div
        className={styles.shape}
        initial={qaInitial({ opacity: 0, rotate: -12, scale: 0.9 })}
        whileInView={{ opacity: 1, rotate: 0, scale: 1 }}
        viewport={inViewOnce}
        transition={{ duration: 0.7, ease: EASE_PREMIUM, delay: index * 0.08 + 0.15 }}
      >
        {shapeFor(pillar)}
      </motion.div>

      <h3 className={`display ${styles.title}`}>{pillar.title}</h3>
      <p className={styles.body}>{pillar.body}</p>
    </motion.article>
  );
}
