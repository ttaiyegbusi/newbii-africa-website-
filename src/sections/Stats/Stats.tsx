import { motion, useInView } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import { Container } from '@/components/layout/Container';
import { Reveal } from '@/components/layout/Reveal';
import { stats } from '@/data/stats';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { QA } from '@/lib/motion';
import { StatItem } from './StatItem';
import styles from './Stats.module.css';

// Seconds each figure stays active before the timer bar advances.
const STEP_SECONDS = 3;

export function Stats() {
  const reduced = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.4 });

  // -1 until the section is in view. Reduced-motion pins to the 3rd figure.
  const [active, setActive] = useState(-1);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (!inView && !QA) return;
    setActive(reduced ? 2 : 0);
  }, [inView, reduced]);

  // Advance is driven by the active bar's animation completing (see StatItem),
  // which keeps the highlight and the timer perfectly in sync and makes
  // hover-pausing trivial.
  const advance = () => setActive((i) => (i + 1) % stats.length);

  return (
    <section className={styles.section} id="data">
      <Container wide>
        <Reveal>
          <h2 className={styles.heading}>Joined by thousands of ambitious Africans.</h2>
        </Reveal>

        <div
          className={styles.row}
          ref={ref}
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          onFocus={() => setPaused(true)}
          onBlur={() => setPaused(false)}
        >
          {stats.map((stat, i) => (
            <motion.div
              key={stat.index}
              initial={reduced || QA ? false : { opacity: 0, y: 24 }}
              animate={inView || QA ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1], delay: i * 0.1 }}
            >
              <StatItem
                stat={stat}
                active={i === active}
                paused={paused}
                stepSeconds={STEP_SECONDS}
                onSelect={() => setActive(i)}
                onComplete={advance}
              />
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}
