import { RootState } from 'app/stores';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ReactComponent as Logo } from 'shared/assets/svg/bootstrap-icons-1.11.2/eyeglasses.svg';
import { Button } from 'shared/ui/button';
import { SelectState } from '../model/selectors';
import { toggleMode } from '../model/accessibilityModeSlice';
import { useDeviceDetect } from 'shared/lib/WindowSizeListener';
import { IconButton } from 'shared/ui/iconButton';

export const AccessibilityButton = () => {
  const dispatch = useDispatch();
  const { isMobile } = useDeviceDetect();

  const handleToggleMode = () => dispatch(toggleMode());

  const active = useSelector((state: RootState) => SelectState(state));
  if (!active) {
    if (isMobile) {
      return <IconButton Icon={Logo} theme={'mono'} onClick={handleToggleMode} />;
    } else {
      return (
        <Button Icon={Logo} theme={'mono'} onClick={handleToggleMode}>
          Версия для слабовидящих
        </Button>
      );
    }
  } else {
    return <></>;
  }
};
