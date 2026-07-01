export type StoreLink = {
  label: string;
  href?: string;
  disabled?: boolean;
};

export type App = {
  name: string;
  description: string;
  platforms: string[];
  icon: string;
  accent: 'coral' | 'gold' | 'violet';
  storeLinks: StoreLink[];
  legalPath: string;
};

export const apps: App[] = [
  {
    name: 'NeuroHub',
    description:
      'Practical tools and resources designed to support neurodivergent users, families, and caregivers.',
    platforms: ['iOS', 'Android'],
    icon: 'assets/icons/neurohub.png',
    accent: 'coral',
    storeLinks: [
      {
        label: 'App Store',
        href: 'https://apps.apple.com/ca/app/neurohub/id1621792528',
      },
      {
        label: 'Google Play',
        href: 'https://play.google.com/store/apps/details?id=com.app.neurohub',
      },
    ],
    legalPath: 'legal/neurohub/',
  },
  {
    name: 'Peko’s Fraction Pizzeria',
    description:
      'A child-friendly Android educational game that helps children practise fractions through playful pizza-building activities.',
    platforms: ['Android'],
    icon: 'assets/icons/peko.jpg',
    accent: 'gold',
    storeLinks: [
      {
        label: 'Google Play coming soon',
        disabled: true,
      },
    ],
    legalPath: 'legal/peko/',
  },
  {
    name: 'PhotoName',
    description:
      'An iPhone app that helps turn confusing photo filenames into clear, useful names using on-device AI.',
    platforms: ['iOS'],
    icon: 'assets/icons/photoname.png',
    accent: 'violet',
    storeLinks: [
      {
        label: 'App Store coming soon',
        disabled: true,
      },
    ],
    legalPath: 'legal/photoname/',
  },
];
