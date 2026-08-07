import { lazy, Suspense, useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Container } from '@/components/layout/Container';
import { Button } from '@/components/ui/Button';
import { staggerParent, staggerChild, inViewOnce, QA } from '@/lib/motion';
import styles from './CommunityBanner.module.css';

// matter.js is heavy — load the sandbox as its own chunk, only once the banner
// is near the viewport (so the shapes drop in as you scroll to them).
const BannerPhysics = lazy(() =>
  import('./BannerPhysics').then((m) => ({ default: m.BannerPhysics })),
);

export function CommunityBanner() {
  const sectionRef = useRef<HTMLElement>(null);
  // Under QA render immediately (the IntersectionObserver is throttled there).
  const [mounted, setMounted] = useState(QA);

  useEffect(() => {
    if (mounted) return;
    const el = sectionRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setMounted(true);
          io.disconnect();
        }
      },
      { rootMargin: '300px' },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [mounted]);

  return (
    <section className={`${styles.section} texture texture--onBlue`} id="banner" ref={sectionRef}>
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

      {/* physics sandbox — shapes fall and stack in the right-hand play zone */}
      {mounted && (
        <Suspense fallback={null}>
          <BannerPhysics />
        </Suspense>
      )}
    </section>
  );
}
