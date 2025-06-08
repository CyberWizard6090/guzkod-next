'use client';
import { useEffect, useState } from 'react';
import Moon from 'shared/assets/svg/bootstrap-icons-1.11.2/moon-stars-fill.svg';
import Sun from 'shared/assets/svg/bootstrap-icons-1.11.2/sun-fill.svg';
import Special from 'shared/assets/svg/bootstrap-icons-1.11.2/eyeglasses.svg';
import './ButtonTheme.scss';
import { useDispatch, useSelector } from 'react-redux';
import { SelectTheme } from '../model/selectors';
import { AppDispatch, RootState } from 'app/stores';
import { toggleTheme } from '../model/themeSlice';
import { Button, IconButton } from 'shared/ui/button';
import { useDeviceDetect } from 'shared/lib/hooks/useDeviceDetect';

export const ButtonTheme = () => {
  const dispatch: AppDispatch = useDispatch();
  const theme = useSelector((state: RootState) => SelectTheme(state));
  const { isMobile } = useDeviceDetect();

  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const handleToggle = () => {
    dispatch(toggleTheme());
  };

  if (!mounted) return null;

  const Icon = theme === 'light' ? Sun : theme === 'dark' ? Moon : Special;
  const Label: string =
    theme === 'light' ? 'Светлый режим' : theme === 'dark' ? 'Темный режим' : 'Специальный режим';

  if (isMobile) {
    return <IconButton Icon={Icon} onClick={handleToggle} />;
  } else {
    return (
      <Button Icon={Icon} onClick={handleToggle}>
        {Label}
      </Button>
    );
  }
};
