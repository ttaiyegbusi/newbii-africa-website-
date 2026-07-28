export type Social = 'x' | 'linkedin' | 'instagram';

export interface Testimonial {
  name: string;
  flag: string;
  quote: string;
  role: string;
  social: Social;
}

export const testimonials: Testimonial[] = [
  {
    name: 'Vanjiku',
    flag: '🇰🇪',
    quote:
      "I used to think everyone else had everything figured out. Being part of Newbii showed me that we're all learning together. The mentorship here gave me clarity, structure, and the confidence to keep showing up.",
    role: 'Data Analyst',
    social: 'x',
  },
  {
    name: 'Chileshe Banda',
    flag: '🇿🇲',
    quote:
      "Career growth can feel lonely, especially when you're the only person in your circle pursuing tech. Newbii gave me a community that celebrated every small win and encouraged me to aim even higher.",
    role: 'Cybersecurity Analyst',
    social: 'linkedin',
  },
  {
    name: 'Adedamola Sulaimon',
    flag: '🇳🇬',
    quote:
      'Joining Newbii gave me the confidence to apply for roles I never thought I was qualified for. Within months, I landed my first Product Design internship.',
    role: 'Product Designer',
    social: 'linkedin',
  },
  {
    name: 'Omar Hassan',
    flag: '🇰🇪',
    quote:
      'Before Newbii, I was overwhelmed by how much there was to learn. The community helped me focus on what mattered. I stopped learning randomly and started building a real path.',
    role: 'Backend Developer',
    social: 'x',
  },
  {
    name: 'Claudine Uwimana',
    flag: '🇷🇼',
    quote:
      'I joined looking for learning resources but stayed because of the people. Every event left me feeling more motivated, and every mentor reminded me that growth is a journey, not a race.',
    role: 'Software Engineer',
    social: 'instagram',
  },
  {
    name: 'Temitope Aiyegbusi',
    flag: '🇳🇬',
    quote:
      'I spent months learning on my own and constantly questioned whether I was making any progress. Joining Newbii changed that. I found mentors who challenged me, peers who kept me accountable, and the confidence to apply for opportunities I would have ignored before.',
    role: 'Senior Product Designer',
    social: 'linkedin',
  },
  {
    name: 'Esther Nakato',
    flag: '🇺🇬',
    quote:
      'Having access to professionals who had already walked the path saved me months of trial and error. Their advice helped me prepare for interviews, improve my confidence, and secure my first role.',
    role: 'Product Manager',
    social: 'linkedin',
  },
];
