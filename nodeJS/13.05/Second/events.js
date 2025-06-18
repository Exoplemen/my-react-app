const EventEmitter = require('events');

class Logger extends EventEmitter {
  log(message) {
    const date = new Date().toTimeString().split(' ')[0];
    this.emit('log', { message, date });
  }
}

const logger = new Logger();

logger.on('log', ({ message, date }) => {
  console.log(`[${date}] ${message}`);
});

logger.log('Проверка работы!');