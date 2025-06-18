//Первое задание
/*let age = prompt("Введите ваш возраст: ")

if (age >= 0 && age < 2) {
    alert("Ребенок");
} else if (age >= 12 && age < 18) {
    alert("Подросток");
} else if (age >= 18 && age < 60) {
    alert("Взрослый");
} else if (age >= 60) {
    alert("Пенсионер");
} else {
    alert("Неправильный возраст")
}*/
//Второе задание
/*let num = prompt("Введите число от 0 до 9: ")
switch (num) {
    case 0:
        alert(")")
        break
    case 1:
        alert("!")
        break
    case 2:
        alert("@")
        break
    case 3:
        alert("#")
        break
    case 4:
        alert("$")
        break
    case 5:
        alert("%")
        break
    case 6:
        alert("^")
        break
    case 7:
        alert("&")
        break
    case 8:
        alert("*")
        break
    case 9:
        alert("(")
        break
    default:
        alert("вы ввели число которое меньше или больше чем 0-9")
}*/

//Третье задание
/*let number = prompt("Введите трехзначное число:")
const num1 = number[0];
const num2 = number[1];
const num3 = number[2];
if (num1 == num2 || num1 == num3 || num2 == num3) {
    alert("В числе есть одинаковые цифры.")
} else {
    alert("Все цифры в числе разные.")
}*/

//Четвертое задание
/*let year = prompt("Введите год:")
if ((year % 400 == 0) || (year % 4 == 0 && year % 100 !== 0)) {
    alert(`${year} високосный год`)
} else {
    alert(`${year} не високосный год`)
}*/

//Пятое задание
/*let number = prompt("Введите пятизначное число: ")
if (number.length !== 5)
    alert("Ошибка: нужно ввести ровно пять цифр!")
else if (number[0] === number[4] && number[1] === number[3]) {
    alert(`число ${number} палиндром`)
} else {
    alert(`число ${number} не палиндром`)
}*/

//Шестое задание
/*const exchangeRates = {
    EUR: 0.92,    
    UAH: 36.95,   
    AZN: 1.70     
}
let usdSumm = prompt("Введите сумму в USD:")
let Choose_a_currency = prompt("Выберите валюту: EUR, UAH, AZN")
let convert = usdSumm * exchangeRates[Choose_a_currency];
alert(`${usdSumm} USD = ${convert} ${Choose_a_currency}`);*/

//Седьмое задание
/*const purchaseSumm = prompt("Введите сумму покупки:");
let skidka = 0;
if (purchaseSumm >= 200 && purchaseSumm <= 300) {
    skidka = 3;
  } else if (purchaseSumm >= 300 && purchaseSumm < 500) {
    skidka = 5;
  } else if (purchaseSumm >= 500) {
    skidka = 7;
  }
  const col_voSkidki = purchaseSumm * skidka / 100
  totalSumm = purchaseSumm - col_voSkidki
  alert(`Сумма покупки со скидкой: ${totalSumm} рублей`);*/

//Восьмое задание
/*let circleLength = prompt("Введите длину окружности: ")
let squarePerimetr = prompt("Введите Периметр квадрата: ")
const p = 3.14;
let circleDiametr = circleLength/p;
let quareLength = squarePerimetr/4
if(circleDiametr < quareLength){
    alert("Эта окружность помещается в квадрат")
} else{
    alert("Эта Окружность не помещается в квадрат")
}*/

//Девятое задание
/*let score = 0;
const answer1 = prompt(`1.Настоящее имя "неуязвимого"?
a) Марк
b) Пол
c) Макс`)
if (answer1 == 'a') {
  score += 2;
}
const answer2 = prompt(`2.Кто было девушкой "Неуязвимого" с 1 по 3 сезон?
a) Амбер
b) Ева
c) Вильям`)
if (answer2 == 'b') {
  score += 2;
}
const answer3 = prompt(`3.Кем была оригинальная мама Оливера?
a)Землянином
b)Фраксанкой
c)Вильтрумитом`)
if (answer3 == 'c') {
  score += 2;
}
alert(`Вы набрали ${score} баллов из 6 возможных!`)*/

//Десятое задание
/*let day = prompt("Введите день:")
let month = prompt("Введите месяц:")
let year = prompt("Введите год:")
let currentDate = new Date(year, month, day)
const nextDate = new Date(currentDate)
nextDate.setDate(currentDate.getDate())
const nextDay = nextDate.getDate()
const nextMonth = nextDate.getMonth()
const nextYear = nextDate.getFullYear()
alert(`дата на следующий день: ${nextDay}.${nextMonth}.${nextYear}`);*/