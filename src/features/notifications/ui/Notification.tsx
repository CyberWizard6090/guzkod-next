import React from 'react';
import { useDispatch } from 'react-redux';
import { removeNotification } from '../model/notificationSlice';
import { Notification as NotificationType } from '../model/notificationSlice';
import './Notification.scss';
import { Icons } from '../model/notificationIcons';
import Cross from 'shared/assets/svg/bootstrap-icons-1.11.2/x.svg';
interface NotificationProps {
  notification: NotificationType;
}

const Notification: React.FC<NotificationProps> = ({ notification }) => {
  const dispatch = useDispatch();

  const handleClose = () => {
    dispatch(removeNotification(notification.id));
  };
  const Icon = Icons[notification.type] || Icons.info;
  return (
    <output className={`notification ${notification.type} `}>
      <div className="notification__header">
        <button className="close-btn" onClick={handleClose}>
          <Cross />
        </button>
      </div>
      <div className="notification__container">
        <div className="notification__icon">
          <Icon />
        </div>
        <div className="notification__message">{notification.message} </div>
      </div>
    </output>
  );
};

export default Notification;
