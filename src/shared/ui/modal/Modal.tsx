import React from 'react';
import styles from './styles.module.scss';
import clsx from 'clsx';
import { IconButton } from 'shared/ui/button';
import IconCross from 'shared/assets/svg/bootstrap-icons-1.11.2/x.svg';
type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  className?: string;
  title?: string;
};

export const Modal = ({ isOpen, onClose, children, className, title }: ModalProps) => {
  if (!isOpen) return null;

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={clsx(styles.content, className)} onClick={(e) => e.stopPropagation()}>
        <div className={styles.header}>
          <h2 className={styles.title}>{title}</h2>
          <IconButton onClick={onClose} Icon={IconCross} className={styles.closeButton} />
        </div>

        {children}
      </div>
    </div>
  );
};
