'use client';
import { useEffect, useState } from 'react';
import Moon from 'shared/assets/svg/bootstrap-icons-1.11.2/moon-stars-fill.svg';
import Sun from 'shared/assets/svg/bootstrap-icons-1.11.2/sun-fill.svg';
import Special from 'shared/assets/svg/bootstrap-icons-1.11.2/eyeglasses.svg';

import { useDispatch, useSelector } from 'react-redux';
import { SelectTheme } from '../model/selectors';

import { toggleTheme } from '../model/themeSlice';
import { IconButton } from 'shared/ui/button';

import { AppDispatch, RootState } from 'shared/stores';
import './ButtonTheme.scss';

export const ButtonTheme = () => {
  const dispatch: AppDispatch = useDispatch();
  const theme = useSelector((state: RootState) => SelectTheme(state));

  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const handleToggle = () => {
    dispatch(toggleTheme());
  };

  if (!mounted) return null;

  const Icon = theme === 'light' ? Sun : theme === 'dark' ? Moon : Special;

  return <IconButton Icon={Icon} onClick={handleToggle} />;
};
