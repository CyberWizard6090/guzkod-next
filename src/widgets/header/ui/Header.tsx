import { AccessibilityButton } from 'features/accessibility-mode';
import { ButtonTheme } from 'features/theme/ui/buttonTheme';

import IconLogo from 'shared/assets/svg/logo-guzkod.svg';
import { ContentContainer } from 'shared/ui/content-container';
import styles from './Header.module.scss';
import { Search } from 'features/search';


export const Header = () => {
  return (
    <header className={`${styles.header} shadow`}>
      <ContentContainer className={styles.header__container}>
        <div className={styles.header__logo_wrap}>
          <div className={styles.header__logo}>
            <IconLogo />
            <span>ГУЗ «Забайкальский краевой онкологический диспансер»</span>
          </div>
        </div>
        <Search/>
        <AccessibilityButton />
        <ButtonTheme />
      </ContentContainer>
    </header>
  );
};
