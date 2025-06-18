const symbols = ['|', '/', '-', '\\'];
let i = 0;
const interval = setInterval(() => {
  process.stdout.write(`\rЗагрузка... ${symbols[i]}`);
  i = (i + 1) % symbols.length;
  
}, 200);
setTimeout(() => {
  clearInterval(interval);
  console.log('\nЗагрузка завершена!');
}, 5000)