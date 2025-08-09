import { AccessibilityButton } from 'features/accessibility-mode';
import { ButtonTheme } from 'features/theme/ui/buttonTheme';

import IconLogo from 'shared/assets/svg/logo-guzkod.svg';

import { ContentContainer } from 'shared/ui/content-container';
import styles from './Header.module.scss';
import { ButtonSearch } from 'features/search';

export const Header = () => {
  return (
    <header className={styles.header}>
      <ContentContainer className={styles.header__container}>
        <div className={styles.header__logo}>
          <IconLogo />
          <span>ГУЗ «Забайкальский краевой онкологический диспансер»</span>
        </div>

        <ButtonSearch />
        <AccessibilityButton />
        <ButtonTheme />
      </ContentContainer>
    </header>
  );
};
