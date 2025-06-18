const express = require('express');
const app = express();

app.get('/', (req, res) => {
  res.send('<h1>Главная страница</h1>');
});

app.get('/old-home', (req, res) => {
  res.redirect(301, '/');
});

app.get('/dashboard', (req, res) => {
  res.send('<h1>Панель управления</h1>');
});

app.get('/admin', (req, res) => {
  res.redirect(301, '/dashboard');
});

app.use((req, res) => {
  res.status(404).send('<h1>404 - Страница не найдена</h1>');
});

app.listen(3000, () => {
  console.log(`Сервер слушает на порту: http://localhost:3000`);
});