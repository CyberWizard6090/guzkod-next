'use client';
import { Provider } from 'react-redux';
import { store } from '../stores/store';

type PropsProviders = {
  children: JSX.Element | JSX.Element[];
};

export const Providers = ({ children }: PropsProviders) => {
  return <Provider store={store}>{children}</Provider>;
};
