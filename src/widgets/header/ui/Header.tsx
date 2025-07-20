import { AccessibilityButton } from 'features/accessibility-mode';
import { ButtonTheme } from 'features/theme/ui/buttonTheme';
import { ContentContainer } from 'shared/ui/content-container';
import styles from './Header.module.scss';

export const Header = () => {
  return (
    <header className={`${styles.header} shadow`}>
      <ContentContainer className={styles.header__container}>
        <div className={styles.header__logo_wrap}>
          <div className={styles.header__logo}>
            <span>Cyber Wizard</span>
          </div>
        </div>
        <AccessibilityButton />
        <ButtonTheme />
      </ContentContainer>
    </header>
  );
};
