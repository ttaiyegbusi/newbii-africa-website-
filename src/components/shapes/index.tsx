import type { CSSProperties } from 'react';

export interface ShapeProps {
  color?: string;
  className?: string;
  style?: CSSProperties;
  /** Stroke thickness for outline shapes (in viewBox units). */
  weight?: number;
}

const base = (className?: string, style?: CSSProperties) => ({
  className,
  style,
  'aria-hidden': true as const,
  focusable: false as const,
  xmlns: 'http://www.w3.org/2000/svg',
});

/** Orange diamond (rotated square) with an upright square cut out of the middle. */
export function DiamondSquare({ color = 'var(--newbii-orange)', className, style }: ShapeProps) {
  return (
    <svg viewBox="0 0 200 200" {...base(className, style)}>
      <path
        fill={color}
        fillRule="evenodd"
        d="M100 0 200 100 100 200 0 100Z M64 64H136V136H64Z"
      />
    </svg>
  );
}

/** Thick pink rounded-square frame (used tilted on LEAD card & banner). */
export function RoundedSquareFrame({ color = 'var(--newbii-pink)', className, style }: ShapeProps) {
  return (
    <svg viewBox="0 0 200 200" {...base(className, style)}>
      <path
        fill={color}
        fillRule="evenodd"
        d="M40 0H160A40 40 0 0 1 200 40V160A40 40 0 0 1 160 200H40A40 40 0 0 1 0 160V40A40 40 0 0 1 40 0Z
           M70 60A10 10 0 0 0 60 70V130A10 10 0 0 0 70 140H130A10 10 0 0 0 140 130V70A10 10 0 0 0 130 60Z"
      />
    </svg>
  );
}

/** Thick ring (donut). */
export function Ring({ color = 'var(--newbii-cyan)', className, style }: ShapeProps) {
  return (
    <svg viewBox="0 0 200 200" {...base(className, style)}>
      <path
        fill={color}
        fillRule="evenodd"
        d="M100 0A100 100 0 1 0 100 200A100 100 0 1 0 100 0Z M100 58A42 42 0 1 1 100 142A42 42 0 1 1 100 58Z"
      />
    </svg>
  );
}

/** Yellow arch / horseshoe (∩). */
export function Arch({ color = 'var(--newbii-yellow)', className, style }: ShapeProps) {
  return (
    <svg viewBox="0 0 200 200" {...base(className, style)}>
      <path
        fill={color}
        fillRule="evenodd"
        d="M0 100A100 100 0 0 1 200 100V200H140V100A40 40 0 0 0 60 100V200H0Z"
      />
    </svg>
  );
}

/** Six-point star (Star of David style) — solid. */
export function StarSix({ color = 'var(--newbii-purple)', className, style }: ShapeProps) {
  return (
    <svg viewBox="0 0 200 200" {...base(className, style)}>
      <path
        fill={color}
        d="M100 4 128 54 186 54 157 104 186 154 128 154 100 204 72 154 14 154 43 104 14 54 72 54Z"
        transform="translate(0 -4)"
      />
    </svg>
  );
}

/** Six-point star outline (frame). */
export function StarSixFrame({
  color = 'var(--newbii-purple)',
  className,
  style,
  weight = 18,
}: ShapeProps) {
  return (
    <svg viewBox="0 0 200 200" {...base(className, style)}>
      <path
        fill="none"
        stroke={color}
        strokeWidth={weight}
        strokeLinejoin="round"
        d="M100 12 124 58 176 58 150 100 176 142 124 142 100 188 76 142 24 142 50 100 24 58 76 58Z"
      />
    </svg>
  );
}

/** Pentagon outline. */
export function Pentagon({
  color = 'var(--newbii-light-blue)',
  className,
  style,
  weight = 20,
}: ShapeProps) {
  return (
    <svg viewBox="0 0 200 200" {...base(className, style)}>
      <path
        fill="none"
        stroke={color}
        strokeWidth={weight}
        strokeLinejoin="round"
        d="M100 14 186 76 153 178 47 178 14 76Z"
      />
    </svg>
  );
}

/** Rounded-square frame with a round hole (pink block in About LEAD reference). */
export function BlockD({ color = 'var(--newbii-pink)', className, style }: ShapeProps) {
  return (
    <svg viewBox="0 0 200 200" {...base(className, style)}>
      <path
        fill={color}
        fillRule="evenodd"
        d="M36 0H164A36 36 0 0 1 200 36V164A36 36 0 0 1 164 200H36A36 36 0 0 1 0 164V36A36 36 0 0 1 36 0Z
           M100 54A46 46 0 1 0 100 146A46 46 0 1 0 100 54Z"
      />
    </svg>
  );
}

/** Yellow curved semi-ring (thick arc with a wedge removed) — CONNECT card. */
export function CurvedRing({ color = 'var(--newbii-yellow)', className, style }: ShapeProps) {
  return (
    <svg viewBox="0 0 200 200" {...base(className, style)}>
      <path
        fill={color}
        fillRule="evenodd"
        d="M100 0A100 100 0 1 1 0 100L60 100A40 40 0 1 0 100 60Z"
      />
    </svg>
  );
}

/** Small solid pentagon node (used as orbit nodes). */
export function PentagonNode({ color = 'var(--newbii-orange)', className, style }: ShapeProps) {
  return (
    <svg viewBox="0 0 100 100" {...base(className, style)}>
      <path fill={color} d="M50 4 96 38 78 92 22 92 4 38Z" />
    </svg>
  );
}
