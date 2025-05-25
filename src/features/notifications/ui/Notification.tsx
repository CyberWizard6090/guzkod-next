import React from 'react';
import { useDispatch } from 'react-redux';
import { removeNotification } from '../model/notificationSlice';
import { Notification as NotificationType } from '../model/notificationSlice';
import { Icons } from '../model/notificationIcons';
import Cross from 'shared/assets/svg/bootstrap-icons-1.11.2/x.svg';
import './Notification.scss';

type NotificationProps = {
  notification: NotificationType;
};

const Notification: React.FC<NotificationProps> = ({ notification }) => {
  const dispatch = useDispatch();

  const handleClose = () => {
    dispatch(removeNotification(notification.id));
  };
  const Icon = Icons[notification.type] || Icons.info;
  return (
    <output className={`notification ${notification.type} fly-in`}>
      <button className="notification__close-btn" onClick={handleClose}>
        <Cross />
      </button>

      <div className="notification__container">
        <div className="notification__icon">
          <span className="notification__ring">
            <Icon />
          </span>
        </div>
        <div className="notification__message">
          <span>{notification.message}</span>
        </div>
      </div>
    </output>
  );
};

export default Notification;
