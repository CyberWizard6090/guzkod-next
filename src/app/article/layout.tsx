import React from 'react';
import { VerticalContainer } from 'shared/ui/vertical-container';

export default function Layout({ children }: { children: React.ReactNode }) {
  return <VerticalContainer>{children}</VerticalContainer>;
}
