import React, { useRef } from 'react';
import './SendMessageForm.scss';
import { Input } from 'shared/ui/input';
import { Button } from 'shared/ui/button';

type SendMessageFormProps = {
  onSend: (text: string) => void;
};

export const SendMessageForm = ({ onSend }: SendMessageFormProps) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault(); // Prevent form from reloading the page
    console.log('1');
    if (inputRef.current) {
      const trimmedMessage = inputRef.current.value.trim();
      if (trimmedMessage) {
        onSend(trimmedMessage);
        console.log(trimmedMessage);
        inputRef.current.value = ''; // Clear the input field after sending
      }
    }
  };

  return (
    <form className="send-message-form" onSubmit={handleSubmit}>
      <Input placeholder="ваше сообщение ...." label={''} valueRef={inputRef} />
      <Button type="submit">Отправить</Button>
    </form>
  );
};
