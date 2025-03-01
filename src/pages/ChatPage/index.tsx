import React, { useState } from 'react';
import './ChatPage.scss';
import { MessageList } from 'widgets/MessageList';
import { SendMessageForm } from 'features/SendMessageForm';
import { Message } from 'shared/types/message';

export const ChatPage: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);

  const handleSendMessage = (text: string) => {
    console.log('ntcn');
    const newMessage: Message = {
      id: Date.now().toString(),
      text,
      author: 'User',
      timestamp: Date.now(),
    };
    setMessages((prev) => [...prev, newMessage]);
  };

  return (
    <div className="chat-page animation-reveal">
      <div className="chat-page__container">
        <MessageList messages={messages} />
        <SendMessageForm onSend={handleSendMessage} />
      </div>
    </div>
  );
};
