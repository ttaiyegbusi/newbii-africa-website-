import { Container } from '@/components/layout/Container';
import { Reveal } from '@/components/layout/Reveal';
import { DotMotif } from '@/components/ui/DotMotif';
import { ProgramCardDeck } from './ProgramCardDeck';
import styles from './Programs.module.css';

export function Programs() {
  return (
    <section className={styles.section} id="programs">
      <Container>
        <Reveal className={styles.head}>
          <DotMotif color="var(--newbii-orange)" className={styles.motif} />
          <h2 className={styles.heading}>How we show up for you.</h2>
          <p className={styles.sub}>
            Newbii supports you in different ways whether you&apos;re learning online, attending an
            event in your city, or getting one-on-one guidance from someone who&apos;s walked the
            path before.
          </p>
        </Reveal>

        <ProgramCardDeck />
      </Container>
    </section>
  );
}
