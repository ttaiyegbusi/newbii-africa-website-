import { useState } from 'react';
import { audienceOptions } from '@/data/nav';
import styles from './Hero.module.css';

/** Stacked audience selector shown at the top-right of the hero media column. */
export function AudiencePills() {
  const [active, setActive] = useState<(typeof audienceOptions)[number]>('Student');

  return (
    <div className={styles.audience} role="group" aria-label="Choose your audience">
      {audienceOptions.map((option) => (
        <button
          key={option}
          className={`${styles.audiencePill} ${active === option ? styles.audienceActive : ''}`}
          aria-pressed={active === option}
          onClick={() => setActive(option)}
        >
          {option}
        </button>
      ))}
    </div>
  );
}
