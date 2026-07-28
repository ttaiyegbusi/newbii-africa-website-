export type PillarShape = 'diamond' | 'curvedRing' | 'starSix' | 'blockD';

export interface Pillar {
  title: string;
  body: string;
  shape: PillarShape;
  /** grid placement helper for the asymmetric layout */
  span: 'full' | 'half';
}

export const pillars: Pillar[] = [
  {
    title: 'Learn',
    span: 'full',
    shape: 'diamond',
    body: 'Learn from industry professionals through practical sessions on software engineering, product design, data, cybersecurity, product management, and more. No fluff. Just real-world knowledge you can actually use.',
  },
  {
    title: 'Connect',
    span: 'half',
    shape: 'curvedRing',
    body: "Connect with mentors, professionals, and peers who've faced the same challenges you're facing today. Ask questions, share experiences, and build relationships that last beyond a single event.",
  },
  {
    title: 'Grow',
    span: 'half',
    shape: 'starSix',
    body: 'From internships and jobs to career guidance and feedback, Newbii helps you find opportunities and gives you the confidence to pursue them.',
  },
  {
    title: 'Lead',
    span: 'full',
    shape: 'blockD',
    body: "As you grow, you'll have opportunities to mentor others, share your experiences, speak at events, and become a leader within the community. Success is even more meaningful when you bring others along with you.",
  },
];
