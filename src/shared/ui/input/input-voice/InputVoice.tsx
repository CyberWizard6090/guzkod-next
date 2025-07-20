import React from 'react';
import { useSpeechRecognition } from 'shared/lib/hooks/useSpeechRecognition/useSpeechRecognition';
import Mic from 'shared/assets/svg/bootstrap-icons-1.11.2/mic-fill.svg';
import './inputVoice.scss';

type VoiceInputProps = {
  label?: string;
  name: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  inputMode?: 'search' | 'text' | 'email' | 'tel' | 'url' | 'none' | 'numeric' | 'decimal';
  type?: string;
};

export const VoiceInput = ({
  label,
  name,
  value,
  onChange,
  placeholder = 'Что вы ищите?',
  inputMode = 'text',
  type = 'text',
}: VoiceInputProps) => {
  const { transcript, isListening, startListening, error } = useSpeechRecognition();

  // Если голосовой ввод обновился — прокидываем его наверх
  React.useEffect(() => {
    if (transcript) {
      onChange(transcript);
    }
  }, [transcript, onChange]);

  return (
    <div className="input-voice">
      {label && <label htmlFor={name}>{label}</label>}
      {error && <p style={{ color: 'red' }}>Ошибка: {error}</p>}

      <input
        id={name}
        name={name}
        type={type}
        inputMode={inputMode}
        placeholder={isListening ? 'Слушаю...' : placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />

      <button
        type="button"
        className="input-voice__mic-btn"
        onClick={startListening}
        disabled={isListening}
        aria-label="Начать голосовой ввод"
      >
        <Mic />
      </button>
    </div>
  );
};
