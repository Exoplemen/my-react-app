//1. Работа с массивом чисел
const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
const filteredNumbers = numbers.filter(num => num % 2 === 0);
const multipliedNumbers = filteredNumbers.map(num => num * 2);
let sum = 0;
multipliedNumbers.forEach(num => sum += num);

console.log(sum);

//2. Работа с массивом строк
const words = ["apple", "banana", "cherry", "date", "elderberry"];
const sortedWords = words.sort((a, b) => a.length - b.length);
const joinedString = sortedWords.join(' ');

console.log(joinedString);

//3. Работа с массивом объектов
const users = [
    { name: "Alice", age: 25 },
    { name: "Bob", age: 30 },
    { name: "Charlie", age: 20 }
];

const bob = users.find(user => user.name === "Bob");
const sortedUsers = users.sort((a, b) => a.age - b.age);
const names = users.map(user => user.name);

console.log(bob);
console.log(sortedUsers);
console.log(names);

//4. Работа со строкой
const sentence = "The quick brown fox jumps over the lazy dog";
const wordsArray = sentence.split(' ');

const longestWord = wordsArray.reduce((longest, current) => 
    current.length > longest.length ? current : longest
, "");

const dashedSentence = sentence.replace(/\s/g, '-');

console.log(longestWord);
console.log(dashedSentence);

//5. Работа с уникальными элементами и разностью массивов
const arr = [1, 2, 3, 4, 5, 5, 5];
const uniqueArr = [...new Set(arr)];

console.log(uniqueArr);
function arrayDifference(arr1, arr2) {
    return arr1.filter(item => !arr2.includes(item));
}

const arr1 = [1, 2, 3, 4, 5];
const arr2 = [3, 4, 5, 6, 7];
console.log(arrayDifference(arr1, arr2));