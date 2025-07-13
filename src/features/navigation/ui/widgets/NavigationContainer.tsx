'use client';
import React, { useEffect, useState } from 'react';

import { getNavigation } from '../../model/api/navigation.api';
import { NavigationItem } from '../../model/types/navigation';
import { NavigationView } from '../views/NavigationView';
import { sidebarData } from '../../model/utils/navigation-data';

export const NavigationContainer = () => {
  const [items, setItems] = useState<NavigationItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    let isMounted = true;

    const fetchData = async () => {
      setLoading(true);
      const { data, error } = await getNavigation();

      if (!isMounted) return;

      if (error) {
        console.error('Ошибка загрузки навигации:', error);
        setError(error);
      } else if (data) {
        setItems([...sidebarData, ...data.layout]);
        setError(null);
      }

      setLoading(false);
    };

    fetchData();

    return () => {
      isMounted = false;
    };
  }, []);

  return <NavigationView items={items} error={error} loading={loading} />;
};
