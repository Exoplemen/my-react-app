const http = require('http');
const fs = require('fs');

const server = http.createServer((req, res) => {
  res.setHeader('Content-Type', 'text/html; charset=utf-8');
  
  if (req.url === '/text') {
    res.end('Простой текстовый ответ с русскими буквами: Привет!');
    return;
  }
  
  if (req.url === '/html') {
    fs.readFile('index.html', (err, data) => {
      if (err) {
        res.end('Ошибка: файл не найден');
        return;
      }
      res.end(data);
    });
    return;
  }
  
  if (req.url.startsWith('/search')) {
    const query = req.url.split('?')[1] || '';
    const params = new URLSearchParams(query);
    const searchTerm = params.get('q') || '';
    
    res.end(`Вы искали: ${searchTerm} (русские буквы работают)`);
    return;
  }
  
  if (req.url === '/form' && req.method === 'GET') {
    res.end(`
      <form method="POST" action="/submit">
        <input name="username" placeholder="Введите имя">
        <button>Отправить</button>
      </form>
    `);
    return;
  }

  if (req.url === '/submit' && req.method === 'POST') {
    let body = '';
    req.on('data', chunk => body += chunk);
    req.on('end', () => {
      const username = body.split('=')[1] || 'не указано';
      res.end(`Получено: ${decodeURIComponent(username)} (русские буквы сохраняются)`);
    });
    return;
  }
  
  res.end(`
    <h1>Главная страница</h1>
    <p>Проверка русских символов: Привет, мир!</p>
    <ul>
      <li><a href="/text">Текст</a></li>
      <li><a href="/html">HTML файл</a></li>
      <li><a href="/search?q=тест">Поиск</a></li>
      <li><a href="/form">Форма</a></li>
    </ul>
  `);
});

fs.writeFileSync('index.html', `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>HTML файл</title>
</head>
<body>
  <h1>Это HTML файл</h1>
  <p>Русские символы работают: Привет!</p>
</body>
</html>
`);
server.listen(5000, () => console.log('Сервер запущен на порту 5000'));//Порт 5000 а не 3000