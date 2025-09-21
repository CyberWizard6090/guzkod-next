'use client';

import { useRouter } from 'next/navigation';
import { Block } from 'shared/ui/block';
import { Button } from 'shared/ui/button';

export default function NotFound() {
  const router = useRouter();

  return (
    <Block>
      <div className="error-page">
        <h1 className="error-page__title">Ошибка</h1>
        <div className="error-page__code">404</div>
        <p className="error-page__description">Страница не найдена или была перенесена </p>
        <div className="error-page__button-group">
          <Button className="error-page__button" onClick={() => router.push('/')}>
            На главную
          </Button>
          <Button
            variant="secondary"
            className="error-page__button"
            onClick={() => router.refresh()}
          >
            Попробовать снова
          </Button>
        </div>
      </div>
    </Block>
  );
}
