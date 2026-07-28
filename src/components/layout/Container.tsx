import type { ReactNode } from 'react';
import styles from './Container.module.css';

interface ContainerProps {
  children: ReactNode;
  className?: string;
  /** Wider variant for sections whose content bleeds closer to the edges. */
  wide?: boolean;
}

/** Centered max-width wrapper with the shared page gutters. */
export function Container({ children, className, wide }: ContainerProps) {
  return (
    <div className={`${styles.container} ${wide ? styles.wide : ''} ${className ?? ''}`}>
      {children}
    </div>
  );
}
