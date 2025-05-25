// src/app/layout.tsx

// import './layout.scss';
import { ReactNode } from 'react';

import { Navigation } from 'widgets/navigation';
import { Header } from 'widgets/header';
import { Footer } from 'widgets/footer';

import { NotificationContainer } from 'features/notifications';
import { AccessibilityStyles, AccessibilityUI } from 'features/accessibilityMode';
import { ImageViewerModal } from 'features/imageViewer';
import { SearchModal } from 'features/search';
import { StateTheme } from 'features/theme';
import { Providers } from './providers';
import 'shared/styles/index.scss';
import { SITE_DESCRIPTION, SITE_NAME, SITE_URL } from 'shared/consts/site.constants';
// import { Breadcrumbs } from 'widgets/breadcrumbs';

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
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="ru">
      <body>
        <Providers>
          <AccessibilityUI />
          <Header />
          <div className="content-container">
            <div className="layout layout__wrapper">
              <NotificationContainer />
              <ImageViewerModal />
              <AccessibilityStyles />
              <StateTheme />
              <SearchModal />
              <Navigation />
              <main className="layout__content">
                {/* <Breadcrumbs /> */}

                {children}
              </main>
              <Footer />
            </div>
          </div>
        </Providers>
      </body>
    </html>
  );
}
