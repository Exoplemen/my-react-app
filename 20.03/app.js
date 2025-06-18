// Задание 1: Поиск слова "JavaScript"
const task1 = () => {
  const str = "JavaScript is powerful. JavaScript is versatile.";
  const regex = /JavaScript/g;
  const matches = str.match(regex);
  console.log("Задание 1:", matches);
};
// Задание 2: Поиск чисел
const task2 = () => {
  const str = "The price is 123.45 USD and 67.89 EUR.";
  const regex = /\d+\.?\d*/g;
  const matches = str.match(regex);
  console.log("Задание 2:", matches);
};
// Задание 3: Поиск email-адресов
const task3 = () => {
  const str = "Contact us at support@example.com or sales@example.org.";
  const regex = /\b[\w.-]+@[\w.-]+\.\w+\b/g;
  const matches = str.match(regex);
  console.log("Задание 3:", matches);
};
// Задание 4: Замена "cat" на "dog"
const task4 = () => {
  const str = "The cat sat on the cat.";
  const regex = /cat/g;
  const result = str.replace(regex, "dog");
  console.log("Задание 4:", result);
};
// Задание 5: Поиск дат в формате DD/MM/YYYY
const task5 = () => {
  const str = "Today is 12/05/2023 and tomorrow is 13/05/2023.";
  const regex = /\b\d{2}\/\d{2}\/\d{4}\b/g;
  const matches = str.match(regex);
  console.log("Задание 5:", matches);
};
// Задание 6: Поиск HTML-тегов
const task6 = () => {
  const str = "<p>Hello</p><div>World</div>";
  const regex = /<[^>]+>/g;
  const matches = str.match(regex);
  console.log("Задание 6:", matches);
};
// Задание 7: Поиск слов из 5 букв
const task7 = () => {
  const str = "Regular expressions are powerful tools.";
  const regex = /\b\w{5}\b/g;
  const matches = str.match(regex);
  console.log("Задание 7:", matches);
};
// Задание 8: Замена URL на [URL]
const task8 = () => {
  const str = "Visit https://example.com and http://example.org.";
  const regex = /https?:\/\/[^\s]+/g;
  const result = str.replace(regex, "[URL]");
  console.log("Задание 8:", result);
};

// Задание 9: Поиск специальных символов
const task9 = () => {
  const str = "Hello, world! 123.";
  const regex = /[^\w\s]/g;
  const matches = str.match(regex);
  console.log("Задание 9:", matches);
};
// Задание 10: Валидация пароля
const task10 = () => {
  const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
  const testPassword = (password) => {
    return regex.test(password);
  };
  console.log("Задание 10:");
  console.log("Passw0rd:", testPassword("Passw0rd"));
  console.log("weak:", testPassword("weak"));
  console.log("noNumbersHere:", testPassword("noNumbersHere"));
  console.log("NOLOWERCASE1:", testPassword("NOLOWERCASE1"));
};
// Запуск всех заданий
const runAllTasks = () => {
  task1();
  task2();
  task3();
  task4();
  task5();
  task6();
  task7();
  task8();
  task9();
  task10();
};
runAllTasks();