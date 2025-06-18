//1 Список покупок
let shoppingList = [
    { name: "Хлеб", quantity: 1, bought: true },
    { name: "Молоко", quantity: 2, bought: false },
    { name: "Яйца", quantity: 10, bought: false },
    { name: "Сыр", quantity: 1, bought: true }
];
// 1.1. Функция вывода списка (сначала не купленные)
function displayShoppingList() {
    // Сортируем: сначала не купленные, потом купленные
    const sortedList = [...shoppingList].sort((a, b) => a.bought - b.bought);
    console.log("Список покупок:");
    sortedList.forEach(item => {
        const status = item.bought ? "куплено" : "не куплено";
        console.log(`${item.name} - ${item.quantity} шт. (${status})`);
    });
}
// 1.2. Функция добавления покупки
function addToShoppingList(productName, quantity) {
    const existingProduct = shoppingList.find(item => item.name.toLowerCase() === productName.toLowerCase());
    if (existingProduct) {
        existingProduct.quantity += quantity;
        console.log(`Количество продукта "${productName}" увеличено на ${quantity}.`);
    } else {
        shoppingList.push({
            name: productName,
            quantity: quantity,
            bought: false
        });
        console.log(`Продукт "${productName}" добавлен в список.`);
    }
}
// 1.3. Функция покупки продукта
function markAsBought(productName) {
    const product = shoppingList.find(item => item.name.toLowerCase() === productName.toLowerCase());
    if (product) {
        product.bought = true;
        console.log(`Продукт "${productName}" отмечен как купленный.`);
    } else {
        console.log(`Продукт "${productName}" не найден в списке.`);
    }
}
displayShoppingList();
addToShoppingList("Молоко", 1);
addToShoppingList("Колбаса", 1);
markAsBought("Яйца");
displayShoppingList();

// 2 Чек в магазине
let receipt = [
    { name: "Хлеб", quantity: 1, price: 30 },
    { name: "Молоко", quantity: 2, price: 80 },
    { name: "Яйца", quantity: 1, price: 120 },
    { name: "Сыр", quantity: 0.5, price: 400 }
];

// 2.1. Функция распечатки чека
function printReceipt() {
    console.log("ЧЕК");
    console.log("--------------------------");
    receipt.forEach(item => {
        console.log(`${item.name} - ${item.quantity} x ${item.price.toFixed(2)} = ${(item.quantity * item.price).toFixed(2)}`);
    });
    console.log("--------------------------");
    console.log(`ИТОГО: ${calculateTotal().toFixed(2)}`);
}

// 2.2. Функция подсчета общей суммы
function calculateTotal() {
    return receipt.reduce((total, item) => total + (item.quantity * item.price), 0);
}

// 2.3. Функция поиска самой дорогой покупки
function getMostExpensiveItem() {
    if (receipt.length === 0) return null;
    
    return receipt.reduce((mostExpensive, item) => {
        const itemTotal = item.quantity * item.price;
        const mostExpensiveTotal = mostExpensive.quantity * mostExpensive.price;
        return itemTotal > mostExpensiveTotal ? item : mostExpensive;
    }, receipt[0]);
}

// 2.4. Функция подсчета средней стоимости товара
function getAveragePrice() {
    if (receipt.length === 0) return 0;
    
    const total = calculateTotal();
    const totalQuantity = receipt.reduce((sum, item) => sum + item.quantity, 0);
    
    return total / totalQuantity;
}

// Примеры использования:
printReceipt();
console.log("Общая сумма:", calculateTotal().toFixed(2));
console.log("Самая дорогая покупка:", getMostExpensiveItem());
console.log("Средняя стоимость товара:", getAveragePrice().toFixed(2));

// 3 массив CSS-стилей
let cssStyles = [
    { property: "color", value: "blue" },
    { property: "font-size", value: "18px" },
    { property: "text-align", value: "center" },
    { property: "text-decoration", value: "underline" }
];

// Функция вывода текста с применением стилей
function printStyledText(styles, text) {
    let styleString = styles.map(style => 
        `${style.property}: ${style.value};`
    ).join(" ");
    
    document.write(`<p style="${styleString}">${text}</p>`);
}

// Пример использования:
printStyledText(cssStyles, "Этот текст будет стилизован согласно заданным CSS-правилам");

// 4 массив аудиторий
let classrooms = [
    { name: "A101", seats: 15, faculty: "Информатика" },
    { name: "B205", seats: 20, faculty: "Математика" },
    { name: "C304", seats: 12, faculty: "Физика" },
    { name: "D102", seats: 18, faculty: "Информатика" },
    { name: "A201", seats: 10, faculty: "Химия" }
];
// 4.1 Функция вывода всех аудиторий
function displayAllClassrooms() {
    console.log("Все аудитории:");
    classrooms.forEach(room => {
        console.log(`${room.name} - ${room.seats} мест, факультет: ${room.faculty}`);
    });
}
// 4.2 вывод аудиторий по факультету
function displayClassroomsByFaculty(faculty) {
    const filtered = classrooms.filter(room => 
        room.faculty.toLowerCase() === faculty.toLowerCase()
    );

    if (filtered.length === 0) {
        console.log(`Аудиторий для факультета "${faculty}" не найдено.`);
        return;
    }

    console.log(`Аудитории факультета "${faculty}":`);
    filtered.forEach(room => {
        console.log(`${room.name} — ${room.seats} мест`);
    });
}
// 4.3 Поиск аудиторий для переданой группы
function findSuitableClassrooms(group) {
    const suitable = classrooms.filter(room => 
        room.faculty === group.faculty && 
        room.seats >= group.students
    );

    if (suitable.length === 0) {
        console.log(`Нет подходящих аудиторий для группы "${group.name}"`);
        return;
    }

    console.log(`Подходящие аудитории для группы "${group.name}":`);
    suitable.forEach(room => {
        console.log(`${room.name} — ${room.seats} мест`);
    });
}
// 4.4 и 4.5 Сортировка аудиторий
//4.4 По количеству мест
function sortClassroomsBySeats() {
    return [...classrooms].sort((a, b) => a.seats - b.seats);
}
// 4.5 По названию(по алфавиту)
function sortClassroomsByName() {
    return [...classrooms].sort((a, b) => a.name.localeCompare(b.name));
}