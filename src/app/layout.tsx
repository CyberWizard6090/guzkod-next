import { ReactNode } from 'react';
import { Header } from 'widgets/header';
import { Footer } from 'widgets/footer';
import { NotificationContainer } from 'features/notifications';
import { ImageViewerModal } from 'features/image-viewer';
import { Providers } from 'shared/providers';
import { inter } from 'shared/fonts';
import { cookies } from 'next/headers';
import { GosuslugiWidget } from 'widgets/gosuslugi-widget';
import { MedicalReviewWidget } from 'widgets/medical-review-widget';
import { ZabaikalmedstrakhWidget } from 'widgets/zabaikalmedstrakh-widget';
import { NationalProjectsWidget } from 'widgets/national-projects-widget';
import { TakzdorovoWidget } from 'widgets/takzdorovo-widget';
import { Navigation } from 'features/navigation';
import { PdfViewerModal } from 'features/pdf-viewer';
import { ContentContainer } from 'shared/ui/content-container';

import 'shared/styles/index.scss';
import 'shared/styles/pages/error.scss';

import {
  KEYWORDS,
  OG_IMAGE,
  SITE_AUTHOR,
  SITE_DESCRIPTION,
  SITE_LANGUAGE,
  SITE_LOCALE,
  SITE_NAME,
  SITE_URL,
} from 'shared/consts/site.constants';
import HashRedirect from './HashRedirect';
import { Metadata, Viewport } from 'next';
import { AccessibilityPanel } from 'features/accessibility-panel';

export const metadata: Metadata = {
  title: SITE_NAME,
  description: SITE_DESCRIPTION,
  metadataBase: new URL(SITE_URL),
  applicationName: SITE_NAME,
  generator: 'Next.js',
  keywords: KEYWORDS,
  authors: [{ name: SITE_AUTHOR, url: SITE_URL }],
  creator: SITE_AUTHOR,
  publisher: SITE_AUTHOR,
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
    },
  },
  alternates: {
    canonical: SITE_URL,
    languages: {
      [SITE_LANGUAGE]: SITE_URL,
    },
  },
  openGraph: {
    title: SITE_NAME,
    description: SITE_DESCRIPTION,
    url: SITE_URL,
    siteName: SITE_NAME,
    locale: SITE_LOCALE,
    type: 'website',
    images: [
      {
        url: OG_IMAGE,
        width: 1200,
        height: 630,
        alt: SITE_NAME,
        type: 'image/jpeg',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: SITE_NAME,
    description: SITE_DESCRIPTION,
    images: [OG_IMAGE],
  },
  icons: {
    icon: '/favicon.svg',
    shortcut: '/favicon-96x96.png',
    apple: '/apple-touch-icon.png',
    other: [
      {
        rel: 'mask-icon',
        url: '/safari-pinned-tab.svg',
        color: '#5bbad5',
      },
    ],
  },
  manifest: '/site.webmanifest',
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: [
    { media: '(prefers-color-scheme: dark)', color: '#000000' },
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
  ],
};

export default async function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  const cookieStore = await cookies();
  const theme = cookieStore.get('theme')?.value ?? 'system';
  return (
    <html lang="ru" className={inter.variable} data-theme={theme}>
      <body>
        <HashRedirect />
        <Providers initialTheme={theme}>
          <Header />
          <ContentContainer className="layout layout__wrapper ">
            <NotificationContainer />
            <ImageViewerModal />
            <AccessibilityPanel />

            <PdfViewerModal />
            <Navigation />

            <main className="layout__content">{children}</main>
            <aside className="layout__sidebar">
              <GosuslugiWidget />
              <MedicalReviewWidget />
              <TakzdorovoWidget />
              <NationalProjectsWidget />
              <ZabaikalmedstrakhWidget />
            </aside>

            <Footer />
          </ContentContainer>
        </Providers>
      </body>
    </html>
  );
}
