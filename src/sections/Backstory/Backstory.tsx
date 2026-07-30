import { Container } from '@/components/layout/Container';
import { Reveal } from '@/components/layout/Reveal';
import { DotMotif } from '@/components/ui/DotMotif';
import { OrbitGlobeGraphic } from './OrbitGlobeGraphic';
import styles from './Backstory.module.css';

export function Backstory() {
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
            <OrbitGlobeGraphic />
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
