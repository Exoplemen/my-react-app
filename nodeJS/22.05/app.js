let http = require('http');
let fs = require('fs');
let url = require('url');
let querystring = require('querystring');

let server = http.createServer((req, res) => {
  let parsedUrl = url.parse(req.url, true);
  let pathname = parsedUrl.pathname;

  if (pathname === '/text') {
    res.writeHead(200, { 
      'Content-Type': 'text/plain; charset=utf-8' 
    });
    res.end('Это простой текстовый ответ от сервера');
    return;
  }

  if (pathname === '/html') {
    fs.readFile('./index.html', 'utf8', (err, data) => {
      if (err) {
        res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
        res.end('HTML файл не найден');
        return;
      }
      res.writeHead(200, { 
        'Content-Type': 'text/html; charset=utf-8' 
      });
      res.end(data);
    });
    return;
  }

  if (pathname === '/search') {
    let query = parsedUrl.query;
    res.writeHead(200, { 
      'Content-Type': 'application/json; charset=utf-8' 
    });
    res.end(JSON.stringify({
      message: 'Результаты поиска',
      query: query.q || '',
      params: query
    }, null, 2));
    return;
  }

  if (pathname === '/form' && req.method === 'POST') {
    let body = '';
    
    req.on('data', chunk => {
      body += chunk.toString();
    });
    
    req.on('end', () => {
      let formData = querystring.parse(body);
      res.writeHead(200, { 
        'Content-Type': 'application/json; charset=utf-8' 
      });
      res.end(JSON.stringify({
        message: 'Форма успешно отправлена',
        formData: formData
      }, null, 2));
    });
    return;
  }

  res.writeHead(200, { 
    'Content-Type': 'text/html; charset=utf-8' 
  });
  res.end(`
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="UTF-8">
      <title>Node.js Сервер</title>
    </head>
    <body>
      <h1>Примеры работы сервера:</h1>
      <ul>
        <li><a href="/text">Задание 1: Простой текстовый ответ</a></li>
        <li><a href="/html">Задание 2: Отдача HTML-файла</a></li>
        <li><a href="/search?q=nodejs&page=1">Задание 3: Обработка GET-параметров</a></li>
        <li>
          Задание 4: Отправка формы методом POST
          <form action="/form" method="POST">
            <input type="text" name="username" placeholder="Имя пользователя">
            <input type="email" name="email" placeholder="Email">
            <button type="submit">Отправить</button>
          </form>
        </li>
      </ul>
    </body>
    </html>
  `);
});

let htmlContent = `<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>Пример HTML</title>
</head>
<body>
  <h1>Это HTML файл, отдаваемый сервером</h1>
  <p>Пример работы второго задания</p>
</body>
</html>`;

fs.writeFile('./index.html', htmlContent, 'utf8', (err) => {
  if (err) {
    console.error('Ошибка при создании HTML файла:', err);
    return;
  }
  console.log('HTML файл создан');
});

server.listen(3000, () => {
  console.log(`Сервер запущен на http://localhost:3000`);
});