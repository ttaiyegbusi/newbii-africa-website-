import { lazy, Suspense, useRef } from 'react';
import { useInView } from 'framer-motion';
import { Container } from '@/components/layout/Container';
import { Reveal } from '@/components/layout/Reveal';
import { DotMotif } from '@/components/ui/DotMotif';
import { QA } from '@/lib/motion';
import styles from './Backstory.module.css';

// d3-geo + the world map data only matter for this one graphic, and it lives
// well below the fold — split it out and mount it only when scrolled near.
const OrbitGlobeGraphic = lazy(() =>
  import('./OrbitGlobeGraphic').then((m) => ({ default: m.OrbitGlobeGraphic }))
);

export function Backstory() {
  const graphicRef = useRef<HTMLDivElement>(null);
  const near = useInView(graphicRef, { once: true, margin: '400px' });

  return (
    <section className={styles.section} id="backstory">
      <Container>
        <div className={styles.grid}>
          <Reveal className={styles.copy}>
            <DotMotif color="var(--newbii-pink)" className={styles.dots} />
            <h2 className={styles.heading}>
              You have all the tutorials. So why does it still feel this hard?
            </h2>
            <p className={styles.body}>
              The internet is full of courses and tutorials, but the hardest part of getting into
              tech isn&apos;t finding resources. It&apos;s doing it alone. Everyone needs guidance,
              support, and a community that believes in them. That&apos;s exactly why we&apos;re here.
            </p>
          </Reveal>

          <Reveal className={styles.graphic} delay={0.15}>
            <div ref={graphicRef}>
              {near || QA ? (
                <Suspense fallback={<div className={styles.globeWrap} />}>
                  <OrbitGlobeGraphic />
                </Suspense>
              ) : (
                <div className={styles.globeWrap} />
              )}
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
