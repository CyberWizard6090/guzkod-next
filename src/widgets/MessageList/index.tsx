import React from 'react';
import './MessageList.scss';
import { Message } from 'entities/message';
import { Message as MessageType } from 'shared/types/message';

interface MessageListProps {
  messages: MessageType[];
}

export const MessageList: React.FC<MessageListProps> = ({ messages }) => {
  return (
    <div className="message-list">
      {messages.map((message) => (
        <Message key={message.id} message={message} />
      ))}
    </div>
  );
};
