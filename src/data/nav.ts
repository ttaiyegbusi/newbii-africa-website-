export interface NavItem {
  label: string;
  href: string;
}

export const navItems: NavItem[] = [
  { label: 'Company', href: '#backstory' },
  { label: 'Programs', href: '#programs' },
  { label: 'Events', href: '#events' },
  { label: 'Partners', href: '#partnership' },
];

export const audienceOptions = ['Student', 'Startup', 'NGO'] as const;
