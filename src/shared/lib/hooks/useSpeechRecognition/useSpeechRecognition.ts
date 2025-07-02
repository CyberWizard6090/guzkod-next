'use client';
import { useState, useEffect } from 'react';

type UseSpeechRecognitionResult = {
  transcript: string;
  isListening: boolean;
  startListening: () => void;
  stopListening: () => void;
  error: string | null;
};

export const useSpeechRecognition = (): UseSpeechRecognitionResult => {
  const [transcript, setTranscript] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!('webkitSpeechRecognition' in window || 'SpeechRecognition' in window)) {
      setError('Ваш браузер не поддерживает голосовой ввод');
    }
  }, []);

  const startListening = () => {
    const SpeechRecognition =
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (window as any).SpeechRecognition ?? (window as any).webkitSpeechRecognition;

    if (!SpeechRecognition) {
      setError('Ваш браузер не поддерживает голосовой ввод');
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = 'ru-RU'; // Устанавливаем язык
    recognition.interimResults = false; // Только окончательные результаты
    recognition.continuous = false; // Остановить после распознавания

    recognition.onstart = () => {
      setIsListening(true);
      setError(null);
    };

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    recognition.onresult = (event: any) => {
      const result = event.results[0][0].transcript;
      setTranscript(result);
      setIsListening(false);
    };

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    recognition.onerror = (event: any) => {
      setError(event.error);
      setIsListening(false);
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    recognition.start();
  };

  const stopListening = () => {
    setIsListening(false);
  };

  return { transcript, isListening, startListening, stopListening, error };
};
