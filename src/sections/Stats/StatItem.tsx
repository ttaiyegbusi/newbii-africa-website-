import type { Stat } from '@/data/stats';
import { useCountUp } from '@/hooks/useCountUp';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import styles from './Stats.module.css';

interface StatItemProps {
  stat: Stat;
  active: boolean;
  paused: boolean;
  stepSeconds: number;
  onSelect: () => void;
  onComplete: () => void;
}

export function StatItem({ stat, active, paused, stepSeconds, onSelect, onComplete }: StatItemProps) {
  const reduced = useReducedMotion();
  const value = useCountUp(stat.value, { active });
  const display = value.toLocaleString('en-US', { useGrouping: stat.grouping !== false });

  return (
    <button
      type="button"
      className={`${styles.stat} ${active ? styles.active : ''}`}
      onClick={onSelect}
      aria-current={active ? 'true' : undefined}
      aria-label={`${stat.value}${stat.suffix} ${stat.label}`}
    >
      {/* full-width timer segment — touches its neighbours to form one line */}
      <span className={styles.track}>
        <span
          className={`${styles.fill} ${
            active ? (reduced ? styles.fillFull : styles.fillRunning) : ''
          } ${paused ? styles.fillPaused : ''}`}
          style={active && !reduced ? { animationDuration: `${stepSeconds}s` } : undefined}
          onAnimationEnd={active && !reduced ? onComplete : undefined}
        />
      </span>

      <span className={styles.body}>
        <span className={styles.index}>{stat.index}</span>

        {stat.flags && (
          <span className={styles.flags} aria-hidden="true">
            {stat.flags.map((flag) => (
              <span key={flag}>{flag}</span>
            ))}
            <span className={styles.flagPlus}>+</span>
          </span>
        )}

        <span className={styles.value}>
          {display}
          <span className={styles.suffix}>{stat.suffix}</span>
        </span>
        <span className={styles.label}>{stat.label}</span>
      </span>
    </button>
  );
}
