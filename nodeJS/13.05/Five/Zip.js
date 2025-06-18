let fs = require('fs');
let zlib = require('zlib');
let gzip = zlib.createGzip();

let input = fs.createReadStream('data.txt');
let output = fs.createWriteStream('data.txt.gz');

input.pipe(gzip).pipe(output);

output.on('finish', () => {
  console.log('Файл успешно сжат');
})