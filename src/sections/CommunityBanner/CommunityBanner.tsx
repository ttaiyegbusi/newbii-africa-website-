import { motion } from 'framer-motion';
import { Container } from '@/components/layout/Container';
import { Button } from '@/components/ui/Button';
import { staggerParent, staggerChild, inViewOnce, EASE_PREMIUM, QA } from '@/lib/motion';
import styles from './CommunityBanner.module.css';

const rise = {
  hidden: { opacity: 0, y: 28 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: EASE_PREMIUM, delay: 0.1 + i * 0.09 },
  }),
};

// The same brand shape SVGs used in the hero (holes + white bevel), recoloured
// for the banner cluster.
const SHAPES = [
  { cls: 'sCyanRing', src: '/assets/shapes/ring-cyan.svg' },
  { cls: 'sOrange', src: '/assets/shapes/star.svg' },
  { cls: 'sPink', src: '/assets/shapes/rectangle.svg' },
  { cls: 'sYellow', src: '/assets/shapes/circle.svg' },
  { cls: 'sPurple', src: '/assets/shapes/light.svg' },
  { cls: 'sPentagon', src: '/assets/shapes/pentagon-cyan.svg' },
  { cls: 'sGreen', src: '/assets/shapes/star-green.svg' },
] as const;

export function CommunityBanner() {
  return (
    <section className={`${styles.section} texture texture--onBlue`} id="banner">
      <Container>
        <motion.div
          className={styles.content}
          initial={QA ? 'visible' : 'hidden'}
          whileInView="visible"
          viewport={inViewOnce}
          variants={staggerParent(0.1, 0.05)}
        >
          <motion.h2 className={styles.heading} variants={staggerChild}>
            You&apos;ve got people now. Come meet them.
          </motion.h2>
          <motion.p className={styles.body} variants={staggerChild}>
            Thousands of ambitious Africans are already learning, growing, and opening doors for one
            another through Newbii.
          </motion.p>
          <motion.div variants={staggerChild}>
            <Button href="#footer" variant="light">
              Join Community
            </Button>
          </motion.div>
        </motion.div>
      </Container>

      {/* cropped shape cluster, bottom-right */}
      <div className={styles.shapes} aria-hidden="true">
        {SHAPES.map((shape, i) => (
          <motion.div
            key={shape.cls}
            custom={i}
            variants={rise}
            initial={QA ? 'visible' : 'hidden'}
            whileInView="visible"
            viewport={inViewOnce}
            className={styles[shape.cls]}
          >
            <img src={shape.src} alt="" draggable={false} />
          </motion.div>
        ))}
      </div>
    </section>
  );
}
