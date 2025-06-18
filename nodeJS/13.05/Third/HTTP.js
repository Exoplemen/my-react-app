const http = require('http');
const EventEmitter = require('events');

const eventEmitter = new EventEmitter();

const server = http.createServer((req, res) => {
  if (req.url === '/admin') {
    eventEmitter.emit('route', '/admin');
    res.end('Admin page');
  } else {
    res.end('Main page');
  }
});

eventEmitter.on('route', (route) => {
  console.log('Доступ к админке!');
});

server.listen(3000, () => {
  console.log('Server running at http://localhost:3000/');
});