// Задача 1: JSON-объект автомобиля
const car = {
  "brand": "Toyota",
  "model": "Camry",
  "year": 2022,
  "colors": ["Silver", "Black", "White", "Blue"],
  "specs": {
    "engine": "2.5L 4-cylinder",
    "horsepower": 203,
    "transmission": "8-speed automatic"
  }
};

console.log("Задача 1:", JSON.stringify(car, null, 2));

// Задача 2: Анализ JSON о фильме
const movieJSON = `{
  "title": "Inception",
  "year": 2010,
  "director": "Christopher Nolan",
  "actors": ["Leonardo DiCaprio", "Joseph Gordon-Levitt", "Ellen Page"],
  "ratings": {
    "imdb": 8.8,
    "rottenTomatoes": 87
  }
}`;

const movie = JSON.parse(movieJSON);

console.log("Задача 2:");
console.log("Название фильма:", movie.title);
console.log("Год выпуска:", movie.year);
console.log("Первый актёр:", movie.actors[0]);
console.log("Рейтинг IMDB:", movie.ratings.imdb);

// Задача 3: GET-запрос к API пользователей
async function fetchUsers() {
  try {
    const response = await fetch('https://jsonplaceholder.typicode.com/users');
    const users = await response.json();
    
    console.log("Задача 3:");
    users.forEach(user => {
      console.log(`Имя: ${user.name}`);
      console.log(`Email: ${user.email}`);
      console.log(`Город: ${user.address.city}`);
      console.log('---');
    });
  } catch (error) {
    console.error('Ошибка:', error);
  }
}

fetchUsers();
