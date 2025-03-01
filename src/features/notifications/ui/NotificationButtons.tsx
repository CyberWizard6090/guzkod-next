import React from 'react';
import { useDispatch } from 'react-redux';
import { addNotification } from '../model/notificationSlice';

export const NotificationButtons: React.FC = () => {
  const dispatch = useDispatch();

  const handleAddNotification = (message: string, type: string) => {
    dispatch(addNotification({ message, type: type as 'info' | 'success' | 'warning' | 'error' }));
  };
  return (
    <div>
      <button onClick={() => handleAddNotification('This is an info notification!', 'info')}>
        Info
      </button>
      <button onClick={() => handleAddNotification('This is a success notification!', 'success')}>
        Success
      </button>
      <button onClick={() => handleAddNotification('This is a warning notification!', 'warning')}>
        Warning
      </button>
      <button onClick={() => handleAddNotification('This is an error notification!', 'error')}>
        Error
      </button>
    </div>
  );
};
