import styles from './PixelRailDivider.module.css';

interface PixelRailDividerProps {
  /**
   * Which way the teeth point.
   * `down` – blue strip with navy teeth biting downward (hero → data).
   * `up`   – navy above, blue teeth biting upward (banner → footer).
   */
  variant?: 'down' | 'up';
  /** Background colour showing between the teeth (defaults to page navy). */
  gap?: string;
  /** Colour of the teeth strip. */
  color?: string;
}

/**
 * Full-bleed "castle-tooth" rail divider used between major sections.
 * Teeth are generated with a repeating linear gradient — crisp squares,
 * no rounded corners, and no dozens of hardcoded divs.
 */
export function PixelRailDivider({
  variant = 'down',
  gap = 'var(--newbii-navy)',
  color = 'var(--newbii-blue)',
}: PixelRailDividerProps) {
  return (
    <div
      className={`${styles.rail} ${variant === 'up' ? styles.up : styles.down}`}
      style={
        {
          '--rail-color': color,
          '--rail-gap': gap,
        } as React.CSSProperties
      }
      aria-hidden="true"
    />
  );
}
