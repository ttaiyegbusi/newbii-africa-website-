import { motion, type Variants } from 'framer-motion';
import { programs } from '@/data/programs';
import { EASE_PREMIUM, QA } from '@/lib/motion';
import styles from './Programs.module.css';

/**
 * Three program cards that start collapsed in a centre stack when the section
 * scrolls into view, hold that stack for a beat (~1s), then spread out to their
 * fanned positions and stay there. Plays once — it is NOT tied to the
 * scrollbar. On small screens the CSS forces `transform:none` and the cards
 * simply stack in normal flow.
 */
export function ProgramCardDeck() {
  return (
    <motion.div
      className={styles.deck}
      initial={QA ? 'fanned' : 'stacked'}
      whileInView="fanned"
      viewport={{ once: true, amount: 0.4 }}
      // Hold the stack briefly, then spread the cards one after another.
      variants={{ fanned: { transition: { delayChildren: 0.35, staggerChildren: 0.1 } } }}
    >
      {programs.map((p, i) => {
        const variants: Variants = {
          // collapsed into a tidy centre stack
          stacked: { x: 0, y: 0, rotate: (i - 1) * 3, opacity: 1 },
          // spread out to the designed position + tilt, slowly
          fanned: {
            x: p.x,
            y: p.y,
            rotate: p.rotate,
            opacity: 1,
            transition: { duration: 0.85, ease: EASE_PREMIUM },
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
