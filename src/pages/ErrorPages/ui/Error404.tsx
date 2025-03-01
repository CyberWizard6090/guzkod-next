import React from 'react';
import './errors.scss';

export const Error404: React.FC = () => {
  return (
    <div className="error-page animation-reveal">
      <h1 className="error-code">404</h1>
      <p className="error-message">Страница не найдена</p>
      <a href="/" className="error-link">
        Вернуться на главную
      </a>
    </div>
  );
};
