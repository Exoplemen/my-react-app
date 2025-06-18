const express = require('express');
const helmet = require('helmet');
const escapeHtml = require('escape-html');
const session = require('express-session');
const csrf = require('csurf');
const uuid = require('uuid');
const fs = require('fs');
const morgan = require('morgan');
const path = require('path');
const bodyParser = require('body-parser');

const app = express();

// =============================================
// Задание 1: Защита от XSS атак
// =============================================

// Middleware для HTML-экранирования
app.use((req, res, next) => {
  const escape = (obj) => {
    if (typeof obj !== 'object' || obj === null) return obj;
    
    for (const key in obj) {
      if (typeof obj[key] === 'string') {
        obj[key] = escapeHtml(obj[key]);
      } else if (typeof obj[key] === 'object') {
        escape(obj[key]);
      }
    }
    return obj;
  };
  
  req.query = escape(req.query);
  if (req.body) req.body = escape(req.body);
  req.params = escape(req.params);
  next();
});

// Content Security Policy
app.use(
  helmet.contentSecurityPolicy({
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: ["'self'"],
      styleSrc: ["'self'", "'unsafe-inline'"],
      imgSrc: ["'self'", "data:"],
      fontSrc: ["'self'"],
      objectSrc: ["'none'"],
      upgradeInsecureRequests: [],
    },
  })
);

// Другие защитные HTTP-заголовки
app.use(helmet());
app.use(helmet.xssFilter());
app.use(helmet.frameguard({ action: 'deny' }));
app.use(helmet.noSniff());
app.use(helmet.hidePoweredBy());

// =============================================
// Задание 2: Защита cookie от утечек
// =============================================

// Настройка сессии
app.use(session({
  genid: (req) => uuid.v4(),
  secret: 'your-very-secure-secret-key-12345',
  name: 'secureSessionId',
  cookie: {
    secure: process.env.NODE_ENV === 'production', // В production только HTTPS
    httpOnly: true,
    sameSite: 'strict',
    maxAge: 24 * 60 * 60 * 1000 // 24 часа
  },
  resave: false,
  saveUninitialized: false
}));

// Инициализация CSRF защиты
const csrfProtection = csrf({ cookie: true });
app.use(csrfProtection);

// Middleware для регенерации ID сессии после аутентификации
function regenerateSession(req, res, next) {
  req.session.regenerate((err) => {
    if (err) return next(err);
    next();
  });
}

// =============================================
// Задание 3: Организация логирования
// =============================================

// Создание потока для логов безопасности
const securityLogStream = fs.createWriteStream(
  path.join(__dirname, 'security.log'),
  { flags: 'a' }
);

// Настройка логирования запросов
app.use(morgan('combined', {
  stream: securityLogStream,
  skip: (req, res) => req.path === '/healthcheck'
}));

// Middleware для обнаружения подозрительных запросов
app.use((req, res, next) => {
  const xssPatterns = [
    /<script\b[^>]*>([\s\S]*?)<\/script>/gi,
    /javascript:[^"']*/gi,
    /on\w+="[^"]*"/gi,
    /on\w+='[^']*'/gi,
    /alert\(/gi,
    /document\.cookie/gi
  ];
  
  const checkForXss = (obj) => {
    if (typeof obj !== 'object' || obj === null) return false;
    
    for (const key in obj) {
      if (typeof obj[key] === 'string') {
        for (const pattern of xssPatterns) {
          if (pattern.test(obj[key])) {
            return true;
          }
        }
      } else if (typeof obj[key] === 'object') {
        if (checkForXss(obj[key])) return true;
      }
    }
    return false;
  };
  
  const isSuspicious = checkForXss(req.query) || 
                      checkForXss(req.body) || 
                      checkForXss(req.params);
  
  if (isSuspicious) {
    const logEntry = {
      timestamp: new Date().toISOString(),
      ip: req.ip,
      method: req.method,
      url: req.originalUrl,
      userAgent: req.headers['user-agent'],
      message: 'Попытка XSS атаки',
      payload: JSON.stringify({ query: req.query, body: req.body, params: req.params })
    };
    
    securityLogStream.write(JSON.stringify(logEntry) + '\n');
    return res.status(403).send('Обнаружена попытка атаки');
  }
  
  next();
});

// Функция для логирования событий безопасности
function logSecurityEvent(event) {
  const logEntry = {
    timestamp: new Date().toISOString(),
    ...event
  };
  securityLogStream.write(JSON.stringify(logEntry) + '\n');
}

// =============================================
// Маршруты для демонстрации
// =============================================

app.use(bodyParser.urlencoded({ extended: true }));

// Тестовый маршрут для проверки XSS защиты
app.get('/xss-test', (req, res) => {
  const userInput = req.query.input || '';
  res.send(`
    <html>
      <head>
        <title>XSS Test</title>
      </head>
      <body>
        <h1>XSS Protection Test</h1>
        <p>Your input: ${userInput}</p>
        <form action="/xss-test" method="GET">
          <input type="text" name="input" value="${userInput}">
          <button type="submit">Submit</button>
        </form>
        <p>Try entering: &lt;script&gt;alert('xss')&lt;/script&gt;</p>
      </body>
    </html>
  `);
});

// Маршрут для демонстрации CSRF защиты
app.get('/csrf-form', csrfProtection, (req, res) => {
  res.send(`
    <html>
      <body>
        <h1>CSRF Protected Form</h1>
        <form action="/process-csrf" method="POST">
          <input type="hidden" name="_csrf" value="${req.csrfToken()}">
          <input type="text" name="data" placeholder="Enter some data">
          <button type="submit">Submit</button>
        </form>
      </body>
    </html>
  `);
});

app.post('/process-csrf', csrfProtection, (req, res) => {
  res.send('CSRF protected form processed successfully');
});

// Маршрут для демонстрации защиты сессии
app.get('/login-demo', regenerateSession, (req, res) => {
  req.session.user = { id: 123, name: 'Test User' };
  res.send(`
    <html>
      <body>
        <h1>Session Demo</h1>
        <p>Session regenerated and user authenticated</p>
        <p>Session ID: ${req.sessionID}</p>
        <a href="/session-info">View session info</a>
      </body>
    </html>
  `);
});

app.get('/session-info', (req, res) => {
  res.json({
    sessionId: req.sessionID,
    sessionData: req.session
  });
});

// Health check endpoint
app.get('/healthcheck', (req, res) => {
  res.status(200).send('OK');
});

// Обработка ошибок CSRF
app.use((err, req, res, next) => {
  if (err.code !== 'EBADCSRFTOKEN') return next(err);
  
  logSecurityEvent({
    type: 'CSRF_ATTEMPT',
    ip: req.ip,
    method: req.method,
    url: req.originalUrl,
    userAgent: req.headers['user-agent']
  });
  
  res.status(403).send('Invalid CSRF token');
});

// Запуск сервера
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Test XSS protection: http://localhost:${PORT}/xss-test?input=<script>alert('xss')</script>`);
  console.log(`Test CSRF protection: http://localhost:${PORT}/csrf-form`);
  console.log(`Test session protection: http://localhost:${PORT}/login-demo`);
});