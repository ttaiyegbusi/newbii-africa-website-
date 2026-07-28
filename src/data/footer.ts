export interface FooterColumn {
  heading: string;
  links: { label: string; href: string }[];
}

export const footerColumns: FooterColumn[] = [
  {
    heading: 'Product',
    links: [
      { label: 'Learn.', href: '#about' },
      { label: 'Connect.', href: '#about' },
      { label: 'Grow.', href: '#about' },
      { label: 'Lead.', href: '#about' },
    ],
  },
  {
    heading: 'Quick Links',
    links: [
      { label: 'Company', href: '#backstory' },
      { label: 'Programs', href: '#programs' },
      { label: 'Events', href: '#events' },
      { label: 'Partners', href: '#partnership' },
    ],
  },
  {
    heading: 'Community',
    links: [
      { label: 'Join Community', href: '#banner' },
      { label: 'Upcoming Events', href: '#events' },
      { label: 'Newsletter', href: '#footer' },
      { label: 'Become a Mentor', href: '#partnership' },
    ],
  },
];

export type SocialPlatform = 'x' | 'instagram' | 'facebook' | 'linkedin';

export const socials: { platform: SocialPlatform; label: string; href: string }[] = [
  { platform: 'x', label: 'Newbii Africa on X', href: '#' },
  { platform: 'instagram', label: 'Newbii Africa on Instagram', href: '#' },
  { platform: 'facebook', label: 'Newbii Africa on Facebook', href: '#' },
  { platform: 'linkedin', label: 'Newbii Africa on LinkedIn', href: '#' },
];
