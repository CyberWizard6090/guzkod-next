import { ReactComponent as Moon } from 'shared/assets/svg/bootstrap-icons-1.11.2/moon-stars-fill.svg';
import { ReactComponent as Sun } from 'shared/assets/svg/bootstrap-icons-1.11.2/sun-fill.svg';
import { ReactComponent as Special } from 'shared/assets/svg/bootstrap-icons-1.11.2/eyeglasses.svg';
import './ButtonTheme.scss';
import { useDispatch, useSelector } from 'react-redux';
import { SelectTheme } from '../model/selectors';
import { AppDispatch, RootState } from 'app/stores';
import { toggleTheme } from '../model/themeSlice';
import { Button } from 'shared/ui/button';
import { useDeviceDetect } from 'shared/lib/WindowSizeListener';
import { IconButton } from 'shared/ui/iconButton';

export const ButtonTheme = () => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const dispatch: AppDispatch = useDispatch();
  const theme = useSelector((state: RootState) => SelectTheme(state));
  const { isMobile } = useDeviceDetect();
  const handleToggle = () => {
    dispatch(toggleTheme());
  };

  const Icon = theme === 'light' ? Sun : theme === 'dark' ? Moon : Special;
  const Label: string =
    theme === 'light' ? 'Светлый режим' : theme === 'dark' ? 'Темный режим' : 'Специальный режим';
  if (isMobile) {
    return <IconButton theme={'mono'} Icon={Icon} onClick={handleToggle} />;
  } else {
    return (
      <Button Icon={Icon} theme={'mono'} onClick={handleToggle}>
        {Label}{' '}
      </Button>
    );
  }
};
