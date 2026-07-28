import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Container } from '@/components/layout/Container';
import { Reveal } from '@/components/layout/Reveal';
import { stats } from '@/data/stats';
import { QA, qaInitial } from '@/lib/motion';
import { StatItem } from './StatItem';
import styles from './Stats.module.css';

export function Stats() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.4 });

  return (
    <section className={styles.section} id="data">
      <Container wide>
        <Reveal>
          <h2 className={styles.heading}>Joined by thousands of ambitious Africans.</h2>
        </Reveal>

        <div className={styles.row} ref={ref}>
          {stats.map((stat, i) => (
            <motion.div
              key={stat.index}
              initial={qaInitial({ opacity: 0, y: 24 })}
              animate={inView || QA ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1], delay: i * 0.1 }}
            >
              <StatItem stat={stat} active={inView || QA} />
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}
