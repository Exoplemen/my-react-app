const express = require('express');
const cookieParser = require('cookie-parser');
const { doubleCsrf } = require("csrf-csrf");
const helmet = require('helmet');

const app = express();

// 1. Обязательные middleware (должны быть ДО csrf)
app.use(helmet());
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// 2. Настройка CSRF защиты
const { doubleCsrfProtection } = doubleCsrf({
  getSecret: () => "YourSecretKeyHere", // Замените на надежный секрет
  cookieName: "__Host-psifi.x-csrf-token",
  cookieOptions: {
    sameSite: "strict",
    secure: process.env.NODE_ENV === 'production', // true в production
    httpOnly: true,
    path: "/"
  },
  size: 64,
  ignoredMethods: ["GET", "HEAD", "OPTIONS"],
});

// 3. Применяем CSRF защиту
app.use(doubleCsrfProtection);

// 4. Генерация токена для форм
const { generateToken } = doubleCsrf({
  getSecret: () => "YourSecretKeyHere",
  cookieName: "csrf-token",
});

// Пример защищенного маршрута
app.get('/form', (req, res) => {
  const token = generateToken(res, req);
  res.send(`
    <form action="/submit" method="POST">
      <input type="hidden" name="_csrf" value="${token}">
      <input type="text" name="data">
      <button>Submit</button>
    </form>
  `);
});

app.post('/submit', (req, res) => {
  res.send('Form submitted safely!');
});

// Запуск сервера
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});