import { AccessibilityButton } from 'features/accessibility-mode';
import { ButtonTheme } from 'features/theme/ui/buttonTheme';
import IconLogo from 'shared/assets/svg/logo-guzkod.svg';

import './Header.scss';

export const Header = () => {
  return (
    <header className="header shadow">
      <div className="content-container">
        <div className="header__logo-wrap">
          <div className="header__logo">
            <IconLogo />
            <span>ГУЗ «Забайкальский краевой онкологический диспансер»</span>
          </div>
        </div>
        <AccessibilityButton />
        <ButtonTheme />
      </div>
    </header>
  );
};
