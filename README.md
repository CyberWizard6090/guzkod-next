<!DOCTYPE html>
<html lang="ru">

  <style>
    body {
      font-family: 'Segoe UI', sans-serif;
      margin: 0;
      padding: 2rem;
      background-color: #0f172a;
      color: #f8fafc;
      line-height: 1.6;
    }

    h1, h2, h3 {
      color: #e2e8f0;
    }

    a {
      color: #60a5fa;
      text-decoration: none;
    }

    code, pre {
      background-color: #1e293b;
      color: #cbd5e1;
      padding: 0.3rem 0.5rem;
      border-radius: 5px;
      font-family: monospace;
    }

    .section {
      margin-bottom: 2rem;
    }

    ul {
      padding-left: 1.2rem;
    }

    .file-structure {
      background-color: #1e293b;
      padding: 1rem;
      border-left: 4px solid #3b82f6;
      font-family: monospace;
      white-space: pre-wrap;
      margin: 1rem 0;
    }

    table {
      width: 100%;
      border-collapse: collapse;
      margin-top: 1rem;
      background-color: #1e293b;
      color: #f1f5f9;
    }

    th, td {
      padding: 0.75rem;
      border: 1px solid #334155;
      text-align: left;
    }

    th {
      background-color: #334155;
    }
    .contact-section {
        background-color: #1e293b;
        border: 1px solid #334155;
        border-radius: 12px;
        padding: 1.5rem;
        margin-top: 1rem;
        box-shadow: 0 4px 8px rgba(0,0,0,0.3);
    }

    .contact-section h2 {
        margin-bottom: 1rem;
        color: #e2e8f0;
    }

    .contact-list {
        list-style: none;
        padding-left: 0;
    }

    .contact-list li {
        margin-bottom: 0.75rem;
    }

    .contact-list a {
        display: inline-block;
        padding: 0.5rem 0.75rem;
        border-radius: 8px;
        background-color: #0f172a;
        color: #93c5fd;
        text-decoration: none;
        transition: background 0.3s, color 0.3s;
        font-weight: 500;
    }

    .contact-list a span {
        color: #e0f2fe;
    }

    .contact-list a:hover {
        background-color: #2563eb;
        color: #ffffff;
    }

    .contact-list a:hover span {
        color: #ffffff;
    }


    .footer {
      margin-top: 3rem;
      font-size: 0.9rem;
      color: #94a3b8;
    }
  </style>

<body>

  <h1>🧩 Frontend</h1>
  <p>Frontend-проект на <strong>Next.js</strong> с использованием <strong>Redux Toolkit</strong>, <strong>TypeScript</strong> и архитектурного подхода <strong>FSD</strong>.</p>

  <div class="section">
    <h2>🚀 Технологии</h2>
    <ul>
      <li><strong>Next.js</strong> — серверный рендеринг и маршрутизация</li>
      <li><strong>React 18</strong> — основа интерфейса</li>
      <li><strong>Redux Toolkit</strong> — управление состоянием</li>
      <li><strong>TypeScript</strong> — типизация</li>
      <li><strong>SCSS</strong> — стилизация</li>
      <li><strong>FSD (Feature-Sliced Design)</strong> — архитектура</li>
      <li><strong>ESLint + Prettier</strong> — линтинг и автоформатирование</li>
      <li><strong>Jest + Testing Library</strong> — тестирование</li>
    </ul>
  </div>

  <div class="section">
    <h2>📁 Архитектура (FSD)</h2>
    <div class="file-structure">
src/
├── app/            # Роутинг и страницы (App Router)<br>
├── shared/         # Общие компоненты, стили, утилиты<br>
├── entities/       # Базовые доменные сущности<br>
├── features/       # Модули пользовательских фич<br>
├── widgets/        # Интерфейсные секции и блоки<br>
    </div>
  </div>

  <div class="section">
    <h2>📦 Установка и запуск</h2>
    <pre><code>npm install        # Установка зависимостей
npm run dev        # Запуск dev-сервера
npm run build      # Сборка проекта
npm run start      # Запуск прод-сборки
npm run lint       # Проверка линтером</code></pre>
  </div>

  <div class="section">
    <h2>🧪 Тестирование</h2>
    <p>Проект использует <code>Jest</code> и <code>Testing Library</code> для модульных тестов:</p>
    <pre><code>npm run test</code></pre>
  </div>

  <div class="section">
    <h2>🛠️ Скрипты</h2>
    <table>
      <thead>
        <tr>
          <th>Команда</th>
          <th>Описание</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td><code>dev</code></td>
          <td>Запуск в режиме разработки</td>
        </tr>
        <tr>
          <td><code>build</code></td>
          <td>Сборка проекта</td>
        </tr>
        <tr>
          <td><code>start</code></td>
          <td>Запуск прод-версии</td>
        </tr>
        <tr>
          <td><code>lint</code></td>
          <td>Линтинг проекта</td>
        </tr>
      </tbody>
    </table>
  </div>

<div class="section contact-section">
  <h2>💬 Контакты</h2>
  <ul class="contact-list">
    <li>
      <a href="https://t.me/cyber_wizard69" target="_blank" title="Открыть Telegram">
        💬 Telegram: <span>@cyber_wizard69</span>
      </a>
    </li>
    <li>
      <a href="mailto:mail.maxim6090@yandex.ru" title="Написать на почту">
        ✉️ Email: <span>mail.maxim6090@yandex.ru</span>
      </a>
    </li>
  </ul>
</div>
  <div class="footer">
  <a href='https://github.com/CyberWizard6090/Site-next/blob/main/LICENSE'>  📄 Лицензия: MIT License<a>
  </div>

</body>
</html>
