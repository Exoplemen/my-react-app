//Первое
function stringStats(str) {
    let letters = 0;
    let digits = 0;
    let others = 0;
    for (let char of str) {
      if (/[a-zA-Z]/.test(char)) {
        letters++;
      } else if (/\d/.test(char)) {
        digits++;
      } else {
        others++;
      }
    }
    return {
      letters: letters,
      digits: digits,
      others: others
    };
}
console.log(stringStats("Hello World! 123"));
//Второе
function numberToText(num) {
    const units = ['', 'один', 'два', 'три', 'четыре', 'пять', 'шесть', 'семь', 'восемь', 'девять'];
    const teens = ['десять', 'одиннадцать', 'двенадцать', 'тринадцать', 'четырнадцать', 'пятнадцать', 'шестнадцать', 'семнадцать', 'восемнадцать', 'девятнадцать'];
    const tens = ['', 'десять', 'двадцать', 'тридцать', 'сорок', 'пятьдесят', 'шестьдесят', 'семьдесят', 'восемьдесят', 'девяносто'];
    if (num < 10 || num > 99) return "Число должно быть двузначным";
    if (num >= 10 && num < 20) {
      return teens[num - 10];
    } else {
      const ten = Math.floor(num / 10);
      const unit = num % 10;
      return tens[ten] + (unit !== 0 ? ' ' + units[unit] : '');
    }
  }
console.log(numberToText(35));
console.log(numberToText(89));
console.log(numberToText(12));
//Третье
function swapCharacters(str) {
    let result = '';
    for (let char of str) {
      if (/[a-z]/.test(char)) {
        result += char.toUpperCase();
      } else if (/[A-Z]/.test(char)) {
        result += char.toLowerCase();
      } else if (/\d/.test(char)) {
        result += '_';
      } else {
        result += char;
      }
    }
    return result;
}
console.log(swapCharacters("Hello World! 123"));
//Четвертое
function cssToCamelCase(css) {
    return css.replace(/-([a-z])/g, (match, letter) => letter.toUpperCase());
}
console.log(cssToCamelCase("font-size"));
console.log(cssToCamelCase("background-color"));
console.log(cssToCamelCase("text-align"));
//Пятое 
function createAbbreviation(phrase) {
    return phrase.split(' ')
      .map(word => word[0].toUpperCase())
      .join('');
}
console.log(createAbbreviation("cascading style sheets"));
console.log(createAbbreviation("объектно ориентированное программирование"));
//Шестое
function concatenateStrings(...strings) {
    return strings.join('');
}
console.log(concatenateStrings("Hello", " ", "World", "!"));
//Седьмое
function calculator(expression) {
    const operators = ['+', '-', '*', '/'];
    let operator = '';
    
    for (let op of operators) {
      if (expression.includes(op)) {
        operator = op;
        break;
      }
    }
    
    if (!operator) return "Неверное выражение";
    
    const [a, b] = expression.split(operator).map(Number);
    
    switch (operator) {
      case '+': return a + b;
      case '-': return a - b;
      case '*': return a * b;
      case '/': return a / b;
      default: return "Неизвестная операция";
    }
}
console.log(calculator("10+5"));
console.log(calculator("20-8"));
console.log(calculator("6*7"));
console.log(calculator("15/3"));
//Восьмое
function parseUrl(url) {
    const protocolEnd = url.indexOf('://');
    const protocol = url.substring(0, protocolEnd);
    const domainStart = protocolEnd + 3;
    const pathStart = url.indexOf('/', domainStart);
    
    const domain = pathStart === -1 
      ? url.substring(domainStart) 
      : url.substring(domainStart, pathStart);
    
    const path = pathStart === -1 ? '/' : url.substring(pathStart);
    
    return {
      protocol: protocol,
      domain: domain,
      path: path
    };
}
console.log(parseUrl("https://itstep.org/ua/about"));
//Девятое
function customSplit(str, separator) {
    const result = [];
    let current = '';
    for (let char of str) {
      if (char === separator) {
        result.push(current);
        current = '';
      } else {
        current += char;
      }
    }
    result.push(current);
    return result;
}
  
console.log(customSplit("10/08/2020", "/"));
//Десятое
function print(template, ...values) {
    return template.replace(/%(\d+)/g, (match, index) => {
      return values[index - 1] !== undefined ? values[index - 1] : match;
    });
}  
console.log(print("Today is %1 %2 %3 %4", "Monday", 10, 8, 2020));