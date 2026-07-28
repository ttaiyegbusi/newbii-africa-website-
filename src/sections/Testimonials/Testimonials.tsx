import { Container } from '@/components/layout/Container';
import { Reveal } from '@/components/layout/Reveal';
import { testimonials } from '@/data/testimonials';
import { TestimonialMarquee } from './TestimonialMarquee';
import styles from './Testimonials.module.css';

// Split into two rows travelling in opposite directions.
const rowOne = testimonials.filter((_, i) => i % 2 === 0);
const rowTwo = testimonials.filter((_, i) => i % 2 === 1);

export function Testimonials() {
  return (
    <section className={`${styles.section} texture texture--onBlue`} id="testimonials">
      <Container>
        <Reveal className={styles.head}>
          <h2 className={styles.heading}>
            Real people. Real wins.
            <br />
            You could be next.
          </h2>
          <p className={styles.sub}>
            From landing a first internship to finding a mentor, switching careers, or securing a
            dream role, these stories remind us that growth is possible.
          </p>
        </Reveal>
      </Container>

      <div className={styles.rows}>
        <TestimonialMarquee items={rowOne} direction="left" duration={48} />
        <TestimonialMarquee items={rowTwo} direction="right" duration={44} />
      </div>
    </section>
  );
}
