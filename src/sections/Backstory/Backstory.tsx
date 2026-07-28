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
              There has never been more to learn from. Free courses, YouTube, bootcamps, that one
              viral thread swearing it will change your life in thirty days. And still, so many
              brilliant people get stuck. Not because they stopped trying. Because trying on your own
              is just plain exhausting. Nobody warns you that the hardest part of getting into tech
              isn&apos;t the code. It&apos;s doing it with no one beside you. No one to ask &ldquo;is
              this normal?&rdquo; No one to say &ldquo;keep going, you&apos;re closer than you
              think.&rdquo; That&apos;s the whole reason we&apos;re here.
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
