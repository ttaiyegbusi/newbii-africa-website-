import { motion, type Variants } from 'framer-motion';
import { programs } from '@/data/programs';
import { EASE_PREMIUM, QA } from '@/lib/motion';
import styles from './Programs.module.css';

/**
 * A neat stack of three program cards that fans out into a spread when the
 * section scrolls into view (each card slides to its offset and settles at a
 * slight rotation). On small screens the cards simply stack in normal flow.
 */
export function ProgramCardDeck() {
  return (
    <motion.div
      className={styles.deck}
      initial={QA ? 'fanned' : 'stacked'}
      whileInView="fanned"
      viewport={{ once: true, amount: 0.4 }}
      variants={{ fanned: { transition: { staggerChildren: 0.09 } } }}
    >
      {programs.map((p, i) => {
        const variants: Variants = {
          // start collapsed into a tidy centre stack
          stacked: { x: 0, y: 0, rotate: (i - 1) * 3, opacity: 1 },
          // fan out to the designed position + tilt
          fanned: {
            x: p.x,
            y: p.y,
            rotate: p.rotate,
            opacity: 1,
            transition: { duration: 0.7, ease: EASE_PREMIUM },
          },
        };
        return (
          <motion.article
            key={p.title}
            className={`${styles.card} texture texture--onBlue`}
            style={{ background: p.bg, color: p.ink, zIndex: p.z }}
            variants={variants}
          >
            <h3 className={`display ${styles.cardTitle}`}>{p.title}</h3>
            <p className={styles.cardBody}>{p.body}</p>
          </motion.article>
        );
      })}
    </motion.div>
  );
}
