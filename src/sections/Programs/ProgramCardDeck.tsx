import { motion } from 'framer-motion';
import { inViewOnce, EASE_PREMIUM, qaInitial } from '@/lib/motion';
import styles from './Programs.module.css';

/**
 * A layered deck of three cards. The front (cyan) card carries the readable
 * "OUTREACHES" content; the back cards are decorative and settle in with a
 * slight rotation. Hovering separates the deck.
 */
export function ProgramCardDeck() {
  return (
    <div className={styles.deck}>
      <motion.div
        className={`${styles.deckCard} ${styles.back2}`}
        initial={qaInitial({ opacity: 0, y: 40, rotate: 0 })}
        whileInView={{ opacity: 1, y: 0, rotate: -7 }}
        viewport={inViewOnce}
        transition={{ duration: 0.6, ease: EASE_PREMIUM }}
        aria-hidden="true"
      />
      <motion.div
        className={`${styles.deckCard} ${styles.back1}`}
        initial={qaInitial({ opacity: 0, y: 40, rotate: 0 })}
        whileInView={{ opacity: 1, y: 0, rotate: 5 }}
        viewport={inViewOnce}
        transition={{ duration: 0.6, ease: EASE_PREMIUM, delay: 0.08 }}
        aria-hidden="true"
      />

      <motion.article
        className={`${styles.deckCard} ${styles.front} texture texture--onBlue`}
        initial={qaInitial({ opacity: 0, y: 40 })}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={inViewOnce}
        transition={{ duration: 0.6, ease: EASE_PREMIUM, delay: 0.16 }}
      >
        <h3 className={`display ${styles.frontTitle}`}>Outreaches</h3>
        <p className={styles.frontBody}>
          We bring opportunities closer to aspiring tech professionals. Through campus visits,
          community events, and local partnerships, we introduce more people to careers in tech and
          provide the guidance, encouragement, and resources they need to get started.
        </p>
      </motion.article>
    </div>
  );
}
