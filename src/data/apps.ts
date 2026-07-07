export type StoreLink = {
  label: string;
  store: 'ios' | 'android';
  href?: string;
  disabled?: boolean;
};

export type App = {
  name: string;
  description: string;
  platforms: string[];
  icon: string;
  accent: 'coral' | 'gold' | 'violet' | 'blue';
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
        store: 'ios',
        href: 'https://apps.apple.com/ca/app/neurohub/id1621792528',
      },
      {
        label: 'Google Play',
        store: 'android',
        href: 'https://play.google.com/store/apps/details?id=com.app.neurohub',
      },
    ],
    legalPath: 'legal/neurohub/',
  },
  {
    name: 'Peko’s Fraction Pizzeria',
    description:
      'A child-friendly educational game that helps children practise fractions through playful pizza-building activities.',
    platforms: ['iOS', 'Android'],
    icon: 'assets/icons/peko.jpg',
    accent: 'gold',
    storeLinks: [
      {
        label: 'App Store coming soon',
        store: 'ios',
        disabled: true,
      },
      {
        label: 'Google Play coming soon',
        store: 'android',
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
        store: 'ios',
        disabled: true,
      },
    ],
    legalPath: 'legal/photoname/',
  },
  {
    name: 'ClearScribe',
    description:
      'Private, on-device AI transcription for recordings, imported audio, and videos, with searchable history and TXT, PDF, or SRT export.',
    platforms: ['iOS'],
    icon: 'assets/icons/clearscribe.png',
    accent: 'blue',
    storeLinks: [
      {
        label: 'App Store coming soon',
        store: 'ios',
        disabled: true,
      },
    ],
    legalPath: 'legal/clearscribe/',
  },
];
