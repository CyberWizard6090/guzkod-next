'use client';

import { useEffect, useState } from 'react';
import { PageSkeleton } from 'shared/ui/skeleton';

export default function LoadingOverlay() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 500); // регулировать по вкусу
    return () => clearTimeout(timer);
  }, []);

  if (!loading) return null;

  return <PageSkeleton />;
}
