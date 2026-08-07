export interface Program {
  title: string;
  body: string;
  bg: string;
  ink: string;
  /** Fanned-out target: horizontal offset, vertical offset, rotation, stack order. */
  x: number;
  y: number;
  rotate: number;
  z: number;
}

export const programs: Program[] = [
  {
    title: 'Webinars',
    bg: 'var(--newbii-card-mint)',
    ink: '#127a44',
    x: -320,
    y: -6,
    rotate: -5,
    z: 1,
    body: 'Explore topics across software engineering, product design, data, cybersecurity, career growth, and more. Ask questions, gain practical insights, and leave with knowledge you can apply immediately.',
  },
  {
    title: 'Outreaches',
    bg: 'var(--newbii-card-cyan)',
    ink: '#0d5a78',
    x: 0,
    y: 20,
    rotate: -8,
    z: 3,
    body: 'We bring opportunities closer to aspiring tech professionals. Through campus visits, community events, and local partnerships, we introduce more people to careers in tech and provide the guidance, encouragement, and resources they need to get started.',
  },
  {
    title: 'Mentorship',
    bg: 'var(--newbii-card-yellow)',
    ink: '#0b5c7a',
    x: 320,
    y: -2,
    rotate: -3,
    z: 2,
    body: "Get paired with experienced professionals who provide guidance, accountability, and honest feedback as you navigate your career journey. From setting goals to celebrating milestones, you'll never have to figure it out alone.",
  },
];
