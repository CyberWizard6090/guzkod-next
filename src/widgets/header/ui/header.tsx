import { AccessibilityButton } from 'features/accessibility-mode';
import { ButtonTheme } from 'features/theme/ui/buttonTheme';
import './Header.scss';

export const Header = () => {
  return (
    <header className="header">
      <div className="content-container">
        <div className="header__logo-wrap">
          <div className="header__logo">
            <span>Забайкальский краевой онкологический диспансер</span>
          </div>
        </div>
        <AccessibilityButton />
        <ButtonTheme />
      </div>
    </header>
  );
};
