//Задание 1
//Работа с массивом чисел
const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

const evenNumbers = numbers.filter(num => num % 2 === 0);

const multipliedNumbers = evenNumbers.map(num => num * 2);

let sum = 0;
multipliedNumbers.forEach(num => sum += num);

console.log(sum);

//Работа с массивом строк
const words = ["apple", "banana", "cherry", "date", "elderberry"];
const sortedWords = words.sort((a, b) => a.length - b.length);
const combinedString = sortedWords.join(' ');

console.log(combinedString);

//Работа с массивом объектов
const users = [
    { name: "Alice", age: 25 },
    { name: "Bob", age: 30 },
    { name: "Charlie", age: 20 }
];

const bob = users.find(user => user.name === "Bob");

const sortedUsers = users.sort((a, b) => a.age - b.age);

const names = users.map(user => user.name);

console.log(bob); // { name: "Bob", age: 30 }
console.log(sortedUsers); // [{ name: "Charlie", age: 20 }, { name: "Alice", age: 25 }, { name: "Bob", age: 30 }]
console.log(names); // ["Alice", "Bob", "Charlie"]

//Работа со строкой
const sentence = "The quick brown fox jumps over the lazy dog";
const wordsArray = sentence.split(' ');
const longestWord = wordsArray.reduce((longest, current) => current.length > longest.length ? current : longest, "");

const dashedSentence = sentence.replace(/\s/g, '-');
console.log(longestWord);
console.log(dashedSentence);

//Уникальные элементы
const array = [1, 2, 3, 4, 5, 5, 5];
const uniqueArray = [...new Set(array)];

console.log(uniqueArray);
//Разница массивов
function difference(arr1, arr2) {
    return arr1.filter(item => !arr2.includes(item));
}

console.log(difference([1, 2, 3, 4], [2, 4]));

//Задание 2
//Количество гласных
function countVowels(str) {
    const vowels = ['a', 'e', 'i', 'o', 'u'];
    return str.split('').filter(char => vowels.includes(char.toLowerCase())).length;
}

console.log(countVowels("Hello"));
//Квадраты чисел
function squareNumbers(arr) {
    return arr.map(num => num * num);
}

console.log(squareNumbers([1, 2, 3]));
//Длины строк
function stringLengths(arr) {
    return arr.map(str => str.length);
}

console.log(stringLengths(["apple", "banana"]));
//Все ли числа положительные
function allPositive(arr) {
    return arr.every(num => num > 0);
}

console.log(allPositive([1, 2, -3]));
//Первые буквы слов
function firstLetters(arr) {
    return arr.map(str => str[0]).join('');
}

console.log(firstLetters(["apple", "banana"]));
//Увеличение чисел на 1
function incrementByOne(arr) {
    return arr.map(num => num + 1);
}

console.log(incrementByOne([1, 2, 3])); 