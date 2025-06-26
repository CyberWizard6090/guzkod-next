import React from 'react';
import { Page } from 'shared/ui/page';

export default function Layout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <Page>{children}</Page>;
}
