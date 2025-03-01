import './header.scss';
import { AccessibilityButton } from 'features/accessibilityMode';
import { ButtonTheme } from 'features/theme/ui/buttonTheme';

export const Header = () => {
  return (
    <header className="Header">
      <div className="content-container">
        <div className="Header__logo-wrap">
          <div className="Header__logo">
            <span>Cyber Wizard</span>
          </div>
        </div>
        <AccessibilityButton />
        <ButtonTheme />
      </div>
    </header>
  );
};
