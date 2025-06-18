//Первое задание
let car = {
    manufacturer: "Toyota",
    model: "Camry",
    year: 2020,
    averageSpeed: 100
};
  
  function displayCarInfo(carObj) {
    console.log(`Производитель: ${carObj.manufacturer}`);
    console.log(`Модель: ${carObj.model}`);
    console.log(`Год выпуска: ${carObj.year}`);
    console.log(`Средняя скорость: ${carObj.averageSpeed} км/ч`);
}
  
  function calculateTravelTime(carObj, distance) {
    let time = distance / carObj.averageSpeed;
    let breaks = Math.floor(time / 4);
    if (time % 4 === 0) breaks--;
    
    let totalTime = time + breaks;
    let hours = Math.floor(totalTime);
    let minutes = Math.round((totalTime - hours) * 60);
    
    return `${hours} часов ${minutes} минут`;
}
  
displayCarInfo(car);
console.log("Время для преодоления 500 км:", calculateTravelTime(car, 500));

//Второе задание
let frac1 = {top: 5, bottom: 2};
let frac2 = {top: 4, bottom: 3};

function addFrac(f1, f2) {
  let top = f1.top * f2.bottom + f2.top * f1.bottom;
  let bottom = f1.bottom * f2.bottom;
  return {top, bottom};
}

function reduce(frac) {
  let a = frac.top, b = frac.bottom;
  while (b != 0) {
    let temp = b;
    b = a % b;
    a = temp;
  }
  return {
    top: frac.top / a,
    bottom: frac.bottom / a
  };
}

let result = addFrac(frac1, frac2);
result = reduce(result);
alert(`Результат: ${result.top}/${result.bottom}`);

//Третье задание
let time = {
    h: 10,
    m: 30,
    s: 0
};
  function showTime(t) {
    alert(`${t.h}:${t.m}:${t.s}`);
}
  function addSec(t, sec) {
    t.s += sec;

    t.m += Math.floor(t.s / 60);
    t.s = t.s % 60;

    t.h += Math.floor(t.m / 60);
    t.m = t.m % 60;
    
    t.h = t.h % 24;
}

showTime(time);
addSec(time, 90);
showTime(time); 