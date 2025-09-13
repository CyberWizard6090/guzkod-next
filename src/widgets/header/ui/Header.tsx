import IconLogo from 'shared/assets/svg/logo-guzkod.svg';

import { ContentContainer } from 'shared/ui/content-container';
import styles from './Header.module.scss';
import { ButtonSearch } from 'features/search';
import { DEVICE_BREAKPOINTS } from 'shared/consts/device-breakpoints.constants';
import { Responsive } from 'shared/ui/responsive';
import { AccessibilityButton } from 'features/accessibility-panel';

export const Header = () => {
  return (
    <header className={styles.header}>
      <ContentContainer className={styles.header__container}>
        <div className={styles.header__logo}>
          <IconLogo />
          <span>ГУЗ «Забайкальский краевой онкологический диспансер»</span>
        </div>
        <Responsive desktop breakpoint={DEVICE_BREAKPOINTS.DESKTOP} mode="only">
          <ButtonSearch />
        </Responsive>
        <AccessibilityButton />
      </ContentContainer>
    </header>
  );
};
