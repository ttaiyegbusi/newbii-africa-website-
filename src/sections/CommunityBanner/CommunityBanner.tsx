import { motion } from 'framer-motion';
import { Container } from '@/components/layout/Container';
import { Button } from '@/components/ui/Button';
import { staggerParent, staggerChild, inViewOnce, EASE_PREMIUM, QA } from '@/lib/motion';
import { Ring, DiamondSquare, RoundedSquareFrame, Arch, StarSix, Pentagon } from '@/components/shapes';
import styles from './CommunityBanner.module.css';

const rise = {
  hidden: { opacity: 0, y: 28 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: EASE_PREMIUM, delay: 0.1 + i * 0.09 },
  }),
};

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
        <motion.div custom={0} variants={rise} initial={QA ? 'visible' : 'hidden'} whileInView="visible" viewport={inViewOnce} className={styles.sCyanRing}>
          <Ring color="var(--newbii-cyan)" />
        </motion.div>
        <motion.div custom={1} variants={rise} initial={QA ? 'visible' : 'hidden'} whileInView="visible" viewport={inViewOnce} className={styles.sOrange}>
          <DiamondSquare color="var(--newbii-orange)" />
        </motion.div>
        <motion.div custom={2} variants={rise} initial={QA ? 'visible' : 'hidden'} whileInView="visible" viewport={inViewOnce} className={styles.sPink}>
          <RoundedSquareFrame color="var(--newbii-pink)" />
        </motion.div>
        <motion.div custom={3} variants={rise} initial={QA ? 'visible' : 'hidden'} whileInView="visible" viewport={inViewOnce} className={styles.sYellow}>
          <Arch color="var(--newbii-yellow)" />
        </motion.div>
        <motion.div custom={4} variants={rise} initial={QA ? 'visible' : 'hidden'} whileInView="visible" viewport={inViewOnce} className={styles.sPurple}>
          <StarSix color="var(--newbii-purple)" />
        </motion.div>
        <motion.div custom={5} variants={rise} initial={QA ? 'visible' : 'hidden'} whileInView="visible" viewport={inViewOnce} className={styles.sPentagon}>
          <Pentagon color="var(--newbii-light-blue)" />
        </motion.div>
        <motion.div custom={6} variants={rise} initial={QA ? 'visible' : 'hidden'} whileInView="visible" viewport={inViewOnce} className={styles.sGreen}>
          <StarSix color="#5fd68a" />
        </motion.div>
      </div>
    </section>
  );
}
