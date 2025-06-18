let now = new Date();
let options = { day: 'numeric', month: 'long', year: 'numeric' };
console.log(`Сегодня: ${now.toLocaleDateString('ru-RU', options)}`);
console.log(`Текущая папка: ${process.cwd()}`);