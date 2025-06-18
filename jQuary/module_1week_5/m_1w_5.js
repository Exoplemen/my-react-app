//Первое
function power(base, step) {
    if (step == 0) return 1;
    if (step == 1) return base;
    return base * power(base, step - 1);
}
//Второе
function gcd(a, b) {
    return b === 0 ? a : gcd(b, a % b);
}
//Третье
function maxDigit(n) {
    n = Math.abs(n);
    if (n < 10) return n;
    return Math.max(n % 10, maxDigit(Math.floor(n / 10)));
}
//Четвертое
function isPrime(n, d = 2) {
    if (n < 2) return false;
    if (d * d > n) return true;
    return n % d ? isPrime(n, d + 1) : false;
}
//Пятое
function factors(n, d = 2) {
    if (n === 1) return [];
    return n % d ? factors(n, d + 1) : [d, ...factors(n / d, d)];
}
  function factorize(n) {
    return factors(n).join(' * ') || n.toString();
}
//Шестое
function fibonacci(n) {
    if (n <= 1) return 1;
    return fibonacci(n - 1) + fibonacci(n - 2);
}

console.log(power(2, 3));
console.log(gcd(14, 21));
console.log(maxDigit(5732));
console.log(isPrime(17));
console.log(factorize(18));
console.log(fib(5));