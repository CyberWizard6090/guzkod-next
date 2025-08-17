import React from 'react';
import { useDispatch } from 'react-redux';
import { removeNotification, Notification as NotificationType } from '../model/notificationSlice';
import { Icons } from '../model/notificationIcons';
import Cross from 'shared/assets/svg/bootstrap-icons-1.11.2/x.svg';
import clsx from 'clsx';
import styles from './Notification.module.scss';

type NotificationProps = {
  notification: NotificationType;
};

const Notification = ({ notification }: NotificationProps) => {
  const dispatch = useDispatch();

  const handleClose = () => {
    dispatch(removeNotification(notification.id));
  };

  const Icon = Icons[notification.type] || Icons.info;

  return (
    <output
      className={clsx(styles.notification, styles[`notification--${notification.type}`], 'fly-in')}
    >
      <button className={styles['notification__close-btn']} onClick={handleClose}>
        <Cross />
      </button>

      <div className={styles['notification__container']}>
        <div className={styles['notification__icon']}>
          <span className={styles['notification__ring']}>
            <Icon />
          </span>
        </div>
        <div className={styles['notification__message']}>
          <span>{notification.message}</span>
        </div>
      </div>
    </output>
  );
};

export default Notification;
