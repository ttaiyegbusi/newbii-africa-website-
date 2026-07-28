import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Container } from '@/components/layout/Container';
import { Reveal } from '@/components/layout/Reveal';
import { DotMotif } from '@/components/ui/DotMotif';
import { faqs } from '@/data/faqs';
import styles from './Faq.module.css';

export function Faq() {
  const [active, setActive] = useState(0);

  return (
    <section className={styles.section} id="faq">
      <Container>
        <Reveal className={styles.head}>
          <DotMotif color="var(--newbii-lime)" className={styles.motif} />
          <h2 className={styles.heading}>
            Questions?
            <br />
            We&apos;ve got answers.
          </h2>
          <p className={styles.sub}>
            Whether you&apos;re just getting started in tech or looking for your next opportunity,
            we&apos;re here to make your journey a little easier.
          </p>
        </Reveal>

        <Reveal delay={0.1}>
          <div className={styles.panel}>
            {/* Left: answer panel (desktop) */}
            <div className={styles.answerPanel}>
              <h3 className={`display ${styles.answerTitle}`}>Answers are here</h3>
              <div className={styles.answerBox}>
                <AnimatePresence mode="wait">
                  <motion.p
                    key={active}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.28 }}
                  >
                    {faqs[active].answer}
                  </motion.p>
                </AnimatePresence>
              </div>
            </div>

            {/* Right: questions */}
            <div className={styles.questionPanel}>
              <h3 className={`display ${styles.questionTitle}`}>Questions</h3>
              <ul className={styles.questionList}>
                {faqs.map((faq, i) => {
                  const isActive = i === active;
                  return (
                    <li key={faq.question}>
                      <button
                        className={`${styles.question} ${isActive ? styles.questionActive : ''}`}
                        aria-expanded={isActive}
                        onClick={() => setActive(isActive ? active : i)}
                      >
                        {faq.question}
                      </button>
                      {/* Mobile accordion answer */}
                      <div className={`${styles.mobileAnswer} ${isActive ? styles.mobileOpen : ''}`}>
                        <p>{faq.answer}</p>
                      </div>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
