'use client';
import { useDispatch, useSelector } from 'react-redux';
import Logo from 'shared/assets/svg/bootstrap-icons-1.11.2/eye.svg';
import { Button, IconButton } from 'shared/ui/button';
import { setModalOpen, setMode } from 'entities/accessibility-mode/model/slice';
import { useDeviceDetect } from 'shared/lib/hooks/useDeviceDetect';
import { SelectAccessibilityState } from 'entities/accessibility-mode/model/selectors';

export const AccessibilityButton = () => {
  const dispatch = useDispatch();
  const { isMobile } = useDeviceDetect();
  const { isModeActive } = useSelector(SelectAccessibilityState);

  const handleClick = () => {
    if (!isModeActive) dispatch(setMode(true));
    dispatch(setModalOpen(true));
  };

  if (typeof isMobile === 'undefined' || isMobile === null || isMobile) {
    return <IconButton Icon={Logo} variant={'primary'} onClick={handleClick} />;
  } else {
    return (
      <Button Icon={Logo} variant={'primary'} onClick={handleClick}>
        Версия для слабовидящих
      </Button>
    );
  }
};
