import React from 'react';
import './errors.scss';

export const Error403: React.FC = () => {
  return (
    <div className="error-page animation-reveal">
      <h1 className="error-code">403</h1>
      <p className="error-message">Доступ запрещен</p>
      <a href="/" className="error-link">
        Вернуться на главную
      </a>
    </div>
  );
};
