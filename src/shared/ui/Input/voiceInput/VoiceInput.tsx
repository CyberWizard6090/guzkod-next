import React from 'react';
import { useSpeechRecognition } from 'shared/lib/hooks/useSpeechRecognition/useSpeechRecognition';
import Mic from 'shared/assets/svg/bootstrap-icons-1.11.2/mic-fill.svg';
import './VoiceInput.scss';
export const VoiceInput: React.FC = () => {
  const { transcript, isListening, startListening, error } = useSpeechRecognition();

  return (
    <div className="input-voice">
      {error && <p style={{ color: 'red' }}>Ошибка: {error}</p>}

      <input placeholder={isListening ? 'Слушаю...' : 'Что вы ищите?'} defaultValue={transcript} />

      <button className="input-voice__mic-btn" onClick={startListening} disabled={isListening}>
        <Mic />
      </button>
    </div>
  );
};
