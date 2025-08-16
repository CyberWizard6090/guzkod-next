import styles from './loader.module.scss';

export const Loader = () => {
  return (
    <div className={styles['box-loader']}>
      <span className={styles['box-loader__loader']}></span>
    </div>
  );
};
