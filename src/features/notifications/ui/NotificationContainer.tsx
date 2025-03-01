import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from 'app/stores';
import { removeNotification } from '../model/notificationSlice';
import Notification from './Notification';

export const NotificationContainer: React.FC = () => {
  const notifications = useSelector((state: RootState) => state.notifications.notifications);
  const dispatch = useDispatch();

  useEffect(() => {
    notifications.forEach((notification) => {
      setTimeout(() => {
        dispatch(removeNotification(notification.id));
      }, 20000); // Удаляем уведомление через 5 секунд
    });
  }, [notifications, dispatch]);

  return (
    <div className="notification-container">
      {notifications.map((notification) => (
        <Notification key={notification.id} notification={notification} />
      ))}
    </div>
  );
};
