const express = require('express');
const app = express();
const usersRouter = require('./users');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get('/greet', (req, res) => {
  const name = req.query.name || 'Гость';
  res.send(`Привет, ${name}!`);
});

// Задание 2: Форма и обработчик
app.get('/form', (req, res) => {
  res.send(`
    <form action="/submit" method="POST">
      <input type="text" name="username" placeholder="Ваше имя">
      <input type="email" name="email" placeholder="Ваш email">
      <button type="submit">Отправить</button>
    </form>
  `);
});

app.post('/submit', (req, res) => {
  const { username, email } = req.body;
  res.send(`Данные получены: Имя - ${username}, Email - ${email}`);
});

// Задание 3: Маршрут с параметром
app.get('/user/:id', (req, res) => {
  const userId = req.params.id;
  res.send(`Информация о пользователе с ID ${userId}`);
});

// Задание 4: Подключение маршрутов из отдельного файла
app.use('/users', usersRouter);

// Задание 5: API времени
app.get('/api/time', (req, res) => {
  res.json({ time: new Date().toISOString() });
});

// Статический файл для задания 5
app.get('/time-page', (req, res) => {
  res.send(`
    <html>
      <body>
        <button onclick="getTime()">Получить время</button>
        <div id="time"></div>
        <script>
          function getTime() {
            fetch('/api/time')
              .then(response => response.json())
              .then(data => {
                document.getElementById('time').textContent = 'Текущее время: ' + data.time;
              });
          }
        </script>
      </body>
    </html>
  `);
});


app.listen(3000, () => {
  console.log(`Сервер запущен на http://localhost:3000`);
});