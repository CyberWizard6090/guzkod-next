'use client';
import { useDispatch, useSelector } from 'react-redux';
import Logo from 'shared/assets/svg/bootstrap-icons-1.11.2/eyeglasses.svg';
import { Button, IconButton } from 'shared/ui/button';
import { setModalOpen, setMode } from '../model/accessibilityModeSlice';

import { useDeviceDetect } from 'shared/lib/hooks/useDeviceDetect';
import { SelectIsModalOpen } from '../model/selectors';

export const AccessibilityButton = () => {
  const dispatch = useDispatch();
  const { isMobile } = useDeviceDetect();
  const isModeActive = useSelector(SelectIsModalOpen);
  const handleClick = () => {
    if (!isModeActive) {
      dispatch(setMode(true));
    }

    dispatch(setModalOpen(true));
  };
  if (typeof isMobile === 'undefined' || isMobile === null) {
    return <IconButton Icon={Logo} variant="secondary" onClick={handleClick} />;
  }
  if (isMobile) {
    return <IconButton Icon={Logo} variant="secondary" onClick={handleClick} />;
  } else {
    return (
      <Button Icon={Logo} variant="secondary" onClick={handleClick}>
        Версия для слабовидящих
      </Button>
    );
  }
};
