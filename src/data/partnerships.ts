export interface Partnership {
  title: string;
  body: string;
  bg: string;
  ink: string;
}

export const partnerships: Partnership[] = [
  {
    title: 'Hire Talent',
    body: 'Connect with a growing community of ambitious tech professionals ready to learn, contribute, and make an impact.',
    bg: 'var(--newbii-card-cyan)',
    ink: '#0b5c7a',
  },
  {
    title: 'Sponsor Events',
    body: 'Support webinars, workshops, and community initiatives that equip thousands of Africans with practical skills and meaningful career opportunities.',
    bg: 'var(--newbii-card-mint)',
    ink: '#0f7a3f',
  },
  {
    title: 'University Partnerships',
    body: 'Collaborate on campus programs, career development initiatives, and student engagement activities that inspire the next generation of tech talent.',
    bg: 'var(--newbii-card-yellow)',
    ink: '#0b5c7a',
  },
  {
    title: 'Community Collaboration',
    body: 'Partner with us to co-host events, share knowledge, and build stronger, more connected tech communities across Africa.',
    bg: 'var(--newbii-card-pink)',
    ink: '#8a1257',
  },
];
