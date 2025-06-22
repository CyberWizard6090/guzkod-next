'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { Block } from 'shared/ui/block';
import { Button } from 'shared/ui/button';

const ERROR_MESSAGES: Record<number, string> = {
  400: 'Некорректный запрос',
  401: 'Неавторизованн',
  403: 'Доступ запрещён',
  404: 'Страница не найдена',
  408: 'Время ожидания истекло',
  429: 'Слишком много запросов',
  500: 'Внутренняя ошибка сервера',
  502: 'Плохой шлюз',
  503: 'Сервис недоступен',
  504: 'Шлюз не отвечает',
};

const extractStatusCode = (message: string | undefined): number | null => {
  const match = message?.match(/\b\d{3}\b/);
  return match ? parseInt(match[0], 10) : null;
};

type Props = {
  error: Error;
  reset: () => void;
};

export default function GlobalError({ error, reset }: Readonly<Props>) {
  useEffect(() => {
    console.error('🔥 Global error caught:', error);
  }, [error]);

  const router = useRouter();

  const handleClick = () => {
    router.push('/');
  };

  const statusCode = extractStatusCode(error.message);
  const description = (statusCode && ERROR_MESSAGES[statusCode]) || 'Произошла неизвестная ошибка';

  return (
    <Block>
      <div className="error-page">
        <h1 className="error-page__title">Ошибка</h1>
        {statusCode && <div className="error-page__code">{statusCode}</div>}
        <p className="error-page__description">{description}</p>
        <div className="error-page__button-group">
          <Button className="error-page__button" onClick={handleClick}>
            На главную
          </Button>
          <Button variant={'secondary'} className="error-page__button" onClick={() => reset()}>
            Попробовать снова
          </Button>
        </div>
      </div>
    </Block>
  );
}
