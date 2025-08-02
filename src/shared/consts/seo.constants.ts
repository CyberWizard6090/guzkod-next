// shared/consts/seo.constants.ts

export const ORG_NAME = 'Забайкальский краевой онкологический диспансер';
export const SITE_NAME = 'ЗКОД';
export const SITE_URL = 'https://zkod.ru';
export const SITE_DESCRIPTION =
  'Официальный сайт Забайкальского краевого онкологического диспансера. Диагностика, лечение и профилактика онкологических заболеваний в Чите и Забайкальском крае.';

export const OG_IMAGE = `${SITE_URL}/og-image.jpg`;

export const CONTACTS = {
  phone: '+7 3022 123-456',
  address: 'ул. Ленина, д. 123, Чита, Забайкальский край, 672000',
};

export const KEYWORDS = [
  'онкология',
  'Забайкалье',
  'Чита',
  'онкологический диспансер',
  'лечение рака',
  'диагностика',
  'ЗКОД',
];

export const SOCIALS = {
  twitterHandle: '@zkod_official', // если есть
};

export const ORGANIZATION_JSONLD = {
  '@context': 'https://schema.org',
  '@type': 'MedicalOrganization',
  name: ORG_NAME,
  url: SITE_URL,
  logo: `${SITE_URL}/logo.png`,
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Чита',
    addressRegion: 'Забайкальский край',
    postalCode: '672000',
    streetAddress: CONTACTS.address,
  },
  contactPoint: {
    '@type': 'ContactPoint',
    telephone: CONTACTS.phone,
    contactType: 'Customer Service',
  },
};
