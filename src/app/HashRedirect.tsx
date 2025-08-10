'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function HashRedirect() {
  const router = useRouter();

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const hash = window.location.hash;

      if (hash.startsWith('#/')) {
        const path = hash.slice(2);
        router.replace('/' + path);
      }
    }
  }, [router]);

  return null;
}
