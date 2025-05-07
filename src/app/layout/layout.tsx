import { Outlet, ScrollRestoration, useLocation } from 'react-router-dom';
import { Navigation } from 'widgets/navigation';
import { Header } from 'widgets/header';
import { Footer } from 'widgets/footer';

import './layout.scss';

import { NotificationContainer } from 'features/notifications';
import { AccessibilityStyles, AccessibilityUI } from 'features/accessibilityMode';
import { ImageViewerModal } from 'features/imageViewer';
import { SearchModal } from 'features/search';
import { StateTheme } from 'features/theme';
import { Breadcrumbs } from 'widgets/breadcrumbs';

export const Layout = () => {
  const location = useLocation();
  return (
    <>
      <Header />
      <div className="content-container">
        <div className="layout layout__wrapper ">
          <NotificationContainer />
          <ImageViewerModal />
          <AccessibilityStyles />
          <StateTheme />
          <SearchModal />
          <Navigation />
          <main className="layout__content">
            <Breadcrumbs />
            <AccessibilityUI />
            <ScrollRestoration />
            <Outlet key={location.pathname} />
          </main>

          <Footer />
        </div>
      </div>
    </>
  );
};
