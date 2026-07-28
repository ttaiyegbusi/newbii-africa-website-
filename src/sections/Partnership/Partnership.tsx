import { motion } from 'framer-motion';
import { Container } from '@/components/layout/Container';
import { Reveal } from '@/components/layout/Reveal';
import { Button } from '@/components/ui/Button';
import { partnerships } from '@/data/partnerships';
import { inViewOnce, EASE_PREMIUM, qaInitial } from '@/lib/motion';
import styles from './Partnership.module.css';

export function Partnership() {
  return (
    <section className={styles.section} id="partnership">
      <Container>
        <div className={styles.grid}>
          <Reveal className={styles.leftWrap}>
            <div className={styles.left}>
              <h2 className={styles.heading}>
                Let&apos;s shape the future of Africa&apos;s tech talent together.
              </h2>
              <p className={styles.body}>
                Whether you&apos;re a company looking to connect with emerging talent, a university
                supporting student careers, or an organization passionate about empowering the next
                generation of African innovators, we&apos;d love to work with you.
              </p>
              <Button href="#footer" variant="light">
                Become a Partner
              </Button>
            </div>
          </Reveal>

          <div className={styles.stack}>
            {partnerships.map((panel, i) => (
              <motion.article
                key={panel.title}
                className={`${styles.panel} texture texture--onBlue`}
                style={{ background: panel.bg, color: panel.ink }}
                initial={qaInitial({ opacity: 0, y: 26 })}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={inViewOnce}
                transition={{ duration: 0.55, ease: EASE_PREMIUM, delay: i * 0.08 }}
              >
                <h3 className={`display ${styles.panelTitle}`}>{panel.title}</h3>
                <p className={styles.panelBody}>{panel.body}</p>
              </motion.article>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
