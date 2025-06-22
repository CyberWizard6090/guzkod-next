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
import LoadingOverlay from './loading-overlay';
import { Providers } from 'shared/providers';
import 'shared/styles/index.scss';
import 'shared/styles/pages/error.scss';
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
        <LoadingOverlay />
        <Providers>
          <Header />
          <div className="content-container">
            <div className="layout layout__wrapper">
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
          </div>
        </Providers>
      </body>
    </html>
  );
}
