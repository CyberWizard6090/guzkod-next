'use client';
import React, { useEffect } from 'react';

import { NavigationView } from '../views/NavigationView';
import { fetchNavigation } from '../../model/slice/navigationSlice';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from 'shared/stores';

export const NavigationContainer = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { items, loading, error } = useSelector((state: RootState) => state.navigation);

  useEffect(() => {
    dispatch(fetchNavigation());
  }, [dispatch]);

  return <NavigationView items={items} error={error ? new Error(error) : null} loading={loading} />;
};
