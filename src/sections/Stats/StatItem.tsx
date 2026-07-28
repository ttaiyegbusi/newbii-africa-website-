import type { Stat } from '@/data/stats';
import { useCountUp } from '@/hooks/useCountUp';
import styles from './Stats.module.css';

export function StatItem({ stat, active }: { stat: Stat; active: boolean }) {
  const value = useCountUp(stat.value, { active });
  const display = value.toLocaleString('en-US');

  return (
    <div className={`${styles.stat} ${stat.highlight ? styles.highlight : ''}`}>
      <span className={styles.index}>{stat.index}</span>

      {stat.flags && (
        <div className={styles.flags} aria-hidden="true">
          {stat.flags.map((flag) => (
            <span key={flag}>{flag}</span>
          ))}
          <span className={styles.flagPlus}>+</span>
        </div>
      )}

      <div className={styles.value}>
        {display}
        <span className={styles.suffix}>{stat.suffix}</span>
      </div>
      <p className={styles.label}>{stat.label}</p>
    </div>
  );
}
