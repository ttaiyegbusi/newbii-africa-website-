import type { CSSProperties } from 'react';

interface DotMotifProps {
  color?: string;
  className?: string;
  style?: CSSProperties;
  /** Render stars instead of dots (used by the Programs "how we show up" motif). */
  variant?: 'dot' | 'star';
}

// A 6-column mini dot-matrix echoing the newbii wordmark logo.
const GRID = [
  [1, 1, 1, 1, 1, 0],
  [1, 1, 0, 1, 1, 1],
  [1, 0, 1, 1, 0, 1],
  [1, 1, 1, 0, 1, 1],
];

/** Decorative dot/star matrix shown above section headings. */
export function DotMotif({ color = 'var(--newbii-pink)', className, style, variant = 'dot' }: DotMotifProps) {
  return (
    <svg
      viewBox="0 0 120 80"
      width="72"
      className={className}
      style={{ color, ...style }}
      aria-hidden="true"
      focusable="false"
    >
      {GRID.flatMap((rowArr, r) =>
        rowArr.map((on, c) =>
          on ? (
            variant === 'star' ? (
              <path
                key={`${r}-${c}`}
                fill="currentColor"
                transform={`translate(${c * 22 + 6} ${r * 20 + 6})`}
                d="M5 0 6.2 3.5 10 3.5 6.9 5.8 8 9.5 5 7.2 2 9.5 3.1 5.8 0 3.5 3.8 3.5Z"
              />
            ) : (
              <circle key={`${r}-${c}`} cx={c * 22 + 11} cy={r * 20 + 11} r="5" fill="currentColor" />
            )
          ) : null
        )
      )}
    </svg>
  );
}
