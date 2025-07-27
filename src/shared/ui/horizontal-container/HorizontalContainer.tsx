import styles from './HorizontalContainer.module.scss';

type Props = {
  children: React.ReactNode | React.ReactNode[];
};

export const HorizontalContainer = ({ children }: Props) => {
  return <div className={styles.horizontalContainer}>{children}</div>;
};
