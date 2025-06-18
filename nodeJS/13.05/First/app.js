const http = require('http');

const server = http.createServer((req, res) => {
  const randomNum = Math.floor(Math.random() * 100);
  res.writeHead(200, {'Content-Type': 'text/plain'});
  res.end(`Random: ${randomNum}`);
});

server.listen(3000, () => {
  console.log('Server running at http://localhost:3000/');
});