import type { ReactNode } from 'react';
import styles from './Button.module.css';

interface ButtonProps {
  children: ReactNode;
  href?: string;
  onClick?: () => void;
  /** `light` = white pill, `ghost` = transparent panel pill, `blue` = electric blue. */
  variant?: 'light' | 'ghost' | 'blue';
  className?: string;
  ariaLabel?: string;
}

/**
 * Renders a real <a> when `href` is set, otherwise a <button>.
 * Never a styled div.
 */
export function Button({
  children,
  href,
  onClick,
  variant = 'light',
  className,
  ariaLabel,
}: ButtonProps) {
  const cls = `${styles.btn} ${styles[variant]} ${className ?? ''}`;

  if (href) {
    return (
      <a className={cls} href={href} onClick={onClick} aria-label={ariaLabel}>
        {children}
      </a>
    );
  }

  return (
    <button className={cls} type="button" onClick={onClick} aria-label={ariaLabel}>
      {children}
    </button>
  );
}
