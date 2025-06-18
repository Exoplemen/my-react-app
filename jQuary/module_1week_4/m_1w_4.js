//Первое
function compare(a, b) {
    return a < b ? -1 : a > b ? 1 : 0;
}
//Второе
function fact(n) {
    let res = 1;
    for (let i = 2; i <= n; i++) res *= i;
    return res;
}
//Третье
function makeNumber(a, b, c) {
    return a * 100 + b * 10 + c;

}
//Четвертое
function area(a, b) {
    return b === undefined ? a * a : a * b;
}
//Пятое
function isPerfect(n) {
    let sum = 0;
    for (let i = 1; i < n; i++) 
      if (n % i === 0) sum += i;
    return sum === n;
}
//Шестое
function findPerfect(min, max) {
    let result = [];
    for (let i = min; i <= max; i++)
      if (isPerfect(i)) result.push(i);
    return result;
  }
//Седьмое
function showTime(h, m = 0, s = 0) {
    return `${h}:${m < 10 ? '0' + m : m}:${s < 10 ? '0' + s : s}`;
  }
//Восьмое
function toSeconds(h, m, s) {
    return h * 3600 + m * 60 + s;
  }
//Девятое
function toTime(seconds) {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = seconds % 60;
    return showTime(h, m, s);
}
//Десятое
function dateDiff(h1, m1, s1, h2, m2, s2) {
    const diff = Math.abs(toSeconds(h1, m1, s1) - toSeconds(h2, m2, s2));
    return toTime(diff);
}
console.log(compare(4, 5));
console.log(fact(13)); 
console.log(makeNumber(1, 9, 9)); 
console.log(area(5, 10));
console.log(isPerfect(28));
console.log(findPerfect(1, 1000));
console.log(showTime(10, 5));
console.log(toSeconds(1, 1, 5));
console.log(toTime(3665));
console.log(dateDiff(10, 30, 0, 9, 15, 0));