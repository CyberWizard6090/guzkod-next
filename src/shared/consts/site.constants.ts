// src/shared/consts/site.constants.ts

export const SITE_NAME = 'Забайкальский краевой онкологический диспансер';
export const SITE_URL = 'https://guzkod.ru/';
export const SITE_HOST = 'https://guzkod.ru';
export const SITE_DESCRIPTION =
  'Краевой онкологический диспансер, Чита: 129 врачей, 206 отзывов о клинике и ее врачах, цены от 174 до 50584 руб., телефон, официальный сайт, адрес - Чита, ул. Ленинградская, д. 104.';
export const SITE_AUTHOR = SITE_NAME;
export const SITE_LANGUAGE = 'ru-RU';
export const SITE_LOCALE = 'ru_RU';
export const OG_IMAGE = `${SITE_HOST}/og-image.jpg`;

export const TWITTER_HANDLE = '@guzkod'; // если нет — удали
export const KEYWORDS = [
  'онкология',
  'Чита',
  'лечение рака',
  'онкодиспансер',
  'онколог',
  'диагностика',
  'ЗКОД',
  'guzkod',
];

export const CONTACTS = {
  phone: '+7 (3022) 35-53-70',
  address: '672000, Чита, ул. Ленинградская, д. 104',
};

export const ORG_JSONLD = {
  '@context': 'https://schema.org',
  '@type': 'MedicalOrganization',
  name: SITE_NAME,
  url: SITE_URL,
  logo: `${SITE_HOST}/logo.png`,
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
