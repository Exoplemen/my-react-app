const fs = require('fs');

const readableStream = fs.createReadStream('sample.mp4');
const writableStream = fs.createWriteStream('copy.mp4');

readableStream.pipe(writableStream);

readableStream.on('end', () => {
  console.log('Файл успешно скопирован');
}) 