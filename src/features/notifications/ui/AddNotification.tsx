import { useDispatch } from 'react-redux';
import { addNotification } from '../model/notificationSlice';

type NotificationType = 'info' | 'success' | 'warning' | 'error';

type AddNotificationProps = {
  message: string;
  type: NotificationType;
};

export const useAddNotification = () => {
  const dispatch = useDispatch();

  const addNotificationHandler = ({ message, type }: AddNotificationProps) => {
    dispatch(addNotification({ message, type }));
  };

  return addNotificationHandler;
};
