import React from 'react';
import styles from './Modal.module.scss';
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
    <div className={styles.modal} onClick={onClose}>
      <div className={clsx(styles.modal__content, className)} onClick={(e) => e.stopPropagation()}>
        <div className={styles.modal__header}>
          <h2 className={styles.modal__title}>{title}</h2>
          <IconButton
            onClick={onClose}
            variant="secondary"
            Icon={IconCross}
            className={styles.modal__close}
          />
        </div>

        <div className={styles.modal__body}>{children}</div>
      </div>
    </div>
  );
};
