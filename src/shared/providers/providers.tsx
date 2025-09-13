'use client';
import { Provider } from 'react-redux';
import { store } from '../stores/store';
import { AccessibilityProvider } from 'entities/accessibility-mode';

type PropsProviders = {
  children: JSX.Element | JSX.Element[];
};

export const Providers = ({ children }: PropsProviders) => {
  return (
    <Provider store={store}>
      <AccessibilityProvider>{children}</AccessibilityProvider>
    </Provider>
  );
};
