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
// import { Breadcrumbs } from 'widgets/breadcrumbs';

export const metadata = {
  title: 'Название сайта',
  description: 'Описание сайта',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="ru">
      <body>
        <Providers>
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
                <AccessibilityUI />
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
