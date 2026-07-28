export interface EventCard {
  tag: string;
  title: string;
  subtitle?: string;
  location: string;
  date: string;
  /** solid card colour */
  color: string;
  /** wave + text colour */
  wave: string;
  ink: string;
}

export const events: EventCard[] = [
  {
    tag: '#outreach26',
    title: 'Cybersecurity Osun Outreach',
    subtitle: 'with John Arowoka',
    location: 'Osogbo, Osun',
    date: 'May 30, 2026',
    color: 'var(--newbii-orange)',
    wave: 'var(--newbii-cream)',
    ink: '#c96a00',
  },
  {
    tag: '#unireach26',
    title: 'University Outreach',
    subtitle: 'University of Lagos',
    location: 'Osogbo, Osun',
    date: 'May 30, 2026',
    color: 'var(--newbii-magenta)',
    wave: '#ff9bea',
    ink: '#6d0f3f',
  },
  {
    tag: '#webinar',
    title: 'Career Kickstart Webinar',
    location: 'Osogbo, Osun',
    date: 'May 30, 2026',
    color: 'var(--newbii-blue)',
    wave: 'var(--newbii-light-blue)',
    ink: '#2a54e0',
  },
];
