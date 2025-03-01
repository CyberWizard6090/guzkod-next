import React from 'react';
import './Message.scss';
import { Message as MesType } from 'shared/types/message';

interface MessageProps {
  message: MesType;
}

export const Message: React.FC<MessageProps> = ({ message }) => {
  return (
    <div className="message">
      <div className="message__header">
        <span className="message__author">{message.author}</span>
        <span className="message__time">{new Date(message.timestamp).toLocaleTimeString()}</span>
      </div>
      <p className="message__text">{message.text}</p>
    </div>
  );
};
