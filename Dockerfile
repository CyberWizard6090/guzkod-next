# Базовый образ с Node.js
FROM node:20-alpine

# Устанавливаем рабочую директорию
WORKDIR /app

# Копируем package.json и package-lock.json
COPY package*.json ./

# Устанавливаем зависимости
RUN npm install

# Копируем весь проект
COPY . .

# Собираем Next.js проект
RUN npm run build

# Указываем порт
EXPOSE 3000

# Запуск приложения в production режиме
CMD ["npm", "start"]
