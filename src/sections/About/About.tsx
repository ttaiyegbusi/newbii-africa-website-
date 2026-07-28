import { Container } from '@/components/layout/Container';
import { Reveal } from '@/components/layout/Reveal';
import { Button } from '@/components/ui/Button';
import { DotMotif } from '@/components/ui/DotMotif';
import { pillars } from '@/data/pillars';
import { PillarCard } from './PillarCard';
import styles from './About.module.css';

export function About() {
  return (
    <section className={`${styles.section} texture texture--onBlue`} id="about">
      <Container>
        <Reveal className={styles.head}>
          <DotMotif color="#d94fd0" className={styles.motif} />
          <h2 className={styles.heading}>Learn . Connect . Grow . Lead</h2>
          <p className={styles.lead}>Four things every successful tech career needs.</p>
          <p className={styles.sub}>
            Whether you&apos;re just starting out or looking for your next big opportunity, Newbii
            gives you the support, guidance, and community to keep moving forward.
          </p>
          <Button href="#banner" variant="light" className={styles.cta}>
            Join Community
          </Button>
        </Reveal>

        <div className={styles.cards}>
          {pillars.map((pillar, i) => (
            <PillarCard key={pillar.title} pillar={pillar} index={i} />
          ))}
        </div>
      </Container>
    </section>
  );
}
