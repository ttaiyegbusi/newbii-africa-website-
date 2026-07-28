import { Container } from '@/components/layout/Container';
import { Reveal } from '@/components/layout/Reveal';
import { DotMotif } from '@/components/ui/DotMotif';
import { events } from '@/data/events';
import { EventCard } from './EventCard';
import styles from './Events.module.css';

export function Events() {
  return (
    <section className={styles.section} id="events">
      <Container>
        <Reveal className={styles.head}>
          <DotMotif color="var(--newbii-cyan)" variant="star" className={styles.motif} />
          <h2 className={styles.heading}>
            Look how far we&apos;ve
            <br />
            come together.
          </h2>
          <p className={styles.sub}>
            Every event tells a story from webinars and mentorship sessions to campus outreaches and
            community meetups, these moments capture what it&apos;s like to learn, connect, and grow
            together at Newbii Africa.
          </p>
        </Reveal>

        <div className={styles.grid}>
          {events.map((event, i) => (
            <EventCard key={event.title} event={event} index={i} />
          ))}
        </div>
      </Container>
    </section>
  );
}
