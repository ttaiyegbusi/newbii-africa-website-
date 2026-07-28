import { motion } from 'framer-motion';
import { DiamondSquare, RoundedSquareFrame, Arch, StarSix } from '@/components/shapes';
import { EASE_PREMIUM, QA } from '@/lib/motion';
import styles from './Hero.module.css';

const initial = QA ? 'visible' : 'hidden';

const rise = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: EASE_PREMIUM, delay: 0.4 + i * 0.12 },
  }),
};

/** Oversized geometric cluster that bleeds off the bottom-right of the hero. */
export function HeroShapeCluster() {
  return (
    <div className={styles.shapes} aria-hidden="true">
      <motion.div custom={0} variants={rise} initial={initial} animate="visible" className={styles.shapeDiamond}>
        <DiamondSquare />
      </motion.div>
      <motion.div custom={1} variants={rise} initial={initial} animate="visible" className={styles.shapeArch}>
        <Arch />
      </motion.div>
      <motion.div custom={2} variants={rise} initial={initial} animate="visible" className={styles.shapePink}>
        <RoundedSquareFrame />
      </motion.div>
      <motion.div custom={3} variants={rise} initial={initial} animate="visible" className={styles.shapeStar}>
        <StarSix />
      </motion.div>
    </div>
  );
}
