import { AccessibilityButton } from 'features/accessibility-mode';
import { ButtonTheme } from 'features/theme/ui/buttonTheme';
import './Header.scss';
import { Search } from 'features/search';

export const Header = () => {
  return (
    <header className="header shadow">
      <div className="content-container">
        <div className="header__logo-wrap">
          <div className="header__logo">
            <span>Cyber Wizard</span>
          </div>
        </div>
        <Search/>
        <AccessibilityButton />
        <ButtonTheme />
      </div>
    </header>
  );
};
