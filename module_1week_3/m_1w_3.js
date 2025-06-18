//Первое задание
/*const start = +prompt("Введите начало диапазона:");
const end = +prompt("Введите конец диапазона:");
let sum = 0; 
for (let i = start; i <= end; i++) {
    sum += i;
}
alert(`Сумма чисел от ${start} до ${end} равна ${sum}.`);*/

//Второе задание
/*let a = prompt("Введите первое число:");
let b = prompt("Введите второе число:");
while (b !== 0) {
    let temp = b;
    b = a % b;
    a = temp;
}
alert(`Наибольший общий делитель: ${a}`);*/

//Третье задание
/*let number = +prompt("Введите число:");
if (number == 0) {
    alert("У нуля делитель это любое ненулевое число!");
} else {
    const delnumber = number < 0 ? -number : number;
    alert(`Делители числа ${number}:`);
    for (let i = 1; i <= delnumber; i++) {
        if (delnumber % i === 0) {
            alert(i);
        }
    }
}*/
//Четвертое задание
/*let number = +prompt("Введите число: ");
let count = 0
if (number == 0) {
    count = 1
}
    while (number > 0) {
        number = number / 10
        count++
    }

alert(`Количество цифр: ${count}`)*/
//Пятое задание
/*let positive = 0;
let negative = 0;
let zero = 0;
let even = 0;
let odd = 0;
for (let i = 1; i <= 10; i++) {
    let number = +prompt(`Введите ${i} число:`);
    if (number > 0) {
        positive++;
    } else if (number < 0) {
        negative++;
    } else {
        zero++;
    }
    if (number !== 0) {
        if (number % 2 === 0) {
            even++;
        } else {
            odd++;
        }
    }
}
alert(`Положительных: ${positive} Отрицательных: ${negative} Нулей: ${zero} Чётных : ${even} Нечётных: ${odd}`);*/

//Шестое задание
/*let calculate = true;

while (calculate) {
    const num1 = +prompt("Введите первое число:");
    const operator = prompt("Введите оператор (+, -, *, /):");
    const num2 = +prompt("Введите второе число:");
    let result;
    switch (operator) {
        case "+":
            result = num1 + num2;
            break;
        case "-":
            result = num1 - num2;
            break;
        case "*":
            result = num1 * num2;
            break;
        case "/":
            result = num1 / num2;
            break;
        default:
            result = "Неверный оператор!";
    }
    alert(`Результат: ${result}`);
    const answer = prompt("Хотите решить ещё один пример? (да или нет)");
    calculate = answer === 'да';
}
alert("Спасибо за то, что пользуетесь калькулятором!");*/

//Седьмое задание
/*let number = prompt("Введите число:");
let shift = parseInt(prompt("На сколько цифр сдвинуть?"));
let numStr = number.toString();
let length = numStr.length;
let realShift = shift % length;
let shiftedNumber = "";
for (let i = realShift; i < length; i++) {
        shiftedNumber += numStr[i];
}
for (let i = 0; i < realShift; i++) {
        shiftedNumber += numStr[i];
}
alert(`Результат: ${shiftedNumber}`);*/

//Восьмое задание
/*let daysOfWeek = ['Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота', 'Воскресенье'];
let currentDay = 0;
do {
    const userResponse = confirm(`${daysOfWeek[currentDay]}. Хотите увидеть следующий день?`);
    currentDay = (currentDay + 1) % daysOfWeek.length;
    if (!userResponse) break;
} while (true);
alert("Спасибо за использование календаря!");*/

//Девятое задание
/*for (let i = 2; i <= 9; i++) {
    console.log(`Таблица умножения на ${i}:`);
    for (let j = 1; j <= 10; j++) {
        console.log(`${i} x ${j} = ${i * j}`);
    }
}*/

//Десятое задание
/*alert("Загадайте число от 0 до 100. Я попробую угадать его!");
let min = 0;
let max = 100;
let attempts = 0;
while (true) {
    attempts++;
    const guess = Math.floor((min + max) / 2);
    const answer = prompt(`Ваше число:
    > ${guess} (больше)
    < ${guess} (меньше)
    = ${guess} (угадал)
    Попытка №${attempts}`);
    if (answer === ">") {
        min = guess + 1;
    } else if (answer === "<") {
        max = guess - 1;
    } else if (answer === "=") {
        alert(`Ура! Я угадал число ${guess} за ${attempts} попыток!`);
        break;
    } else {
        alert("Пожалуйста, введите '>', '<' или '='");
    }
}*/