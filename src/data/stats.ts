export interface Stat {
  index: string;
  /** Numeric target for count-up. */
  value: number;
  /** Text appended after the animated number (e.g. "+"). */
  suffix: string;
  label: string;
  /** Optional flag emoji cluster shown above the number (stat 03). */
  flags?: string[];
  /** Set false to render without a thousands separator (e.g. 4800, not 4,800). */
  grouping?: boolean;
}

export const stats: Stat[] = [
  { index: '01', value: 5000, suffix: '+', label: 'Community Members' },
  { index: '02', value: 120, suffix: '+', label: 'Live Webinars' },
  {
    index: '03',
    value: 10,
    suffix: '+',
    label: 'Countries & cities',
    flags: ['🇳🇬', '🇰🇪', '🇿🇦', '🇬🇭'],
  },
  { index: '04', value: 50, suffix: '+', label: 'Mentors & Speakers' },
  { index: '05', value: 4800, suffix: '+', label: 'Career switches supported', grouping: false },
];
