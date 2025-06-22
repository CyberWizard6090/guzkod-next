import { ReactNode } from 'react';

import { Navigation } from 'widgets/navigation';
import { Header } from 'widgets/header';
import { Footer } from 'widgets/footer';

import { NotificationContainer } from 'features/notifications';
import { AccessibilityStyles, AccessibilityUI } from 'features/accessibility-mode';
import { ImageViewerModal } from 'features/image-viewer';
import { SearchModal } from 'features/search';
import { StateTheme } from 'features/theme';

import { SITE_DESCRIPTION, SITE_NAME, SITE_URL } from 'shared/consts/site.constants';
import { Providers } from 'shared/providers';
import { inter } from 'shared/fonts';

import { cookies } from 'next/headers';
import 'shared/styles/index.scss';
import 'shared/styles/pages/error.scss';

export const metadata = {
  title: SITE_NAME,
  description: SITE_DESCRIPTION,
  openGraph: {
    title: SITE_NAME,
    description: SITE_DESCRIPTION,
    url: SITE_URL,
    siteName: SITE_NAME,
    images: [
      {
        url: 'https://example.com/image.jpg',
        width: 800,
        height: 600,
      },
    ],
  },
  viewport: 'width=device-width, initial-scale=1',
};

export default async function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  const cookieStore = await cookies();
  const theme = cookieStore.get('theme')?.value ?? 'light';

  if (!theme) {
    cookieStore.set('theme', 'light', {
      path: '/',
      maxAge: 60 * 60 * 24 * 365,
      sameSite: 'lax',
    });
  }
  return (
    <html lang="ru" className={inter.variable} data-theme={theme}>
      <body>
        <Providers>
          <Header />

          <div className="layout layout__wrapper content-container">
            <NotificationContainer />
            <ImageViewerModal />
            <AccessibilityUI />
            <AccessibilityStyles />
            <StateTheme />
            <SearchModal />
            <Navigation />

            <main className="layout__content">{children}</main>

            <Footer />
          </div>
        </Providers>
      </body>
    </html>
  );
}
