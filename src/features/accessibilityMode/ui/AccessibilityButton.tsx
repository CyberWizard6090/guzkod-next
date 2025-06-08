'use client';
import { RootState } from 'app/stores';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Logo from 'shared/assets/svg/bootstrap-icons-1.11.2/eyeglasses.svg';
import { Button, IconButton } from 'shared/ui/button';
import { SelectState } from '../model/selectors';
import { toggleMode } from '../model/accessibilityModeSlice';
import { useDeviceDetect } from 'shared/lib/hooks/useDeviceDetect';

export const AccessibilityButton = () => {
  const dispatch = useDispatch();
  const { isMobile } = useDeviceDetect();

  const handleToggleMode = () => dispatch(toggleMode());

  const active = useSelector((state: RootState) => SelectState(state));
  if (!active) {
    if (isMobile) {
      return <IconButton Icon={Logo} variant={'secondary'} onClick={handleToggleMode} />;
    } else {
      return (
        <Button Icon={Logo} variant={'secondary'} onClick={handleToggleMode}>
          Версия для слабовидящих
        </Button>
      );
    }
  } else {
    return <></>;
  }
};
