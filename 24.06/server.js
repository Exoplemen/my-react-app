const express = require('express');
const app = express();
app.use(express.json());

//UTF-8+ 
app.use(express.json({ type: 'application/json' }));
app.use(express.urlencoded({ extended: true }));

// Простая "база данных" в памяти
let cafes = [
  { id: 1, name: "Кофейня у моря", address: "Набережная, 1", lat: 45.123, lng: 39.456 },
  { id: 2, name: "Горная чашка", address: "Горная, 15", lat: 45.456, lng: 39.789 }
];

let reviews = [
  { id: 1, cafeId: 1, userId: "user1", rating: 5, text: "Лучший кофе в городе!", createdAt: "2023-05-01" },
  { id: 2, cafeId: 1, userId: "user2", rating: 4, text: "Хорошее место", createdAt: "2023-05-02" }
];

// Получить список всех кафе с рейтингами
app.get('/cafes', (req, res) => {
  const result = cafes.map(cafe => {
    const cafeReviews = reviews.filter(r => r.cafeId === cafe.id);
    const avg = cafeReviews.reduce((sum, r) => sum + r.rating, 0) / cafeReviews.length || 0;
    return { ...cafe, averageRating: avg, reviewCount: cafeReviews.length };
  });
  res.json(result);
});

// Добавить новое кафе
app.post('/cafes', (req, res) => {
  const { name, address, lat, lng } = req.body;
  if (!name || !address) {
    return res.status(400).json({ error: "Название и адрес обязательны" });
  }

  const newCafe = {
    id: cafes.length + 1,
    name,
    address,
    lat: parseFloat(lat) || 0,
    lng: parseFloat(lng) || 0
  };
  cafes.push(newCafe);
  res.status(201).json(newCafe);
});

// Получить отзывы о кафе
app.get('/cafes/:id/reviews', (req, res) => {
  const cafeId = parseInt(req.params.id);
  const cafeExists = cafes.some(c => c.id === cafeId);
  if (!cafeExists) return res.status(404).json({ error: "Кафе не найдено" });

  const cafeReviews = reviews.filter(r => r.cafeId === cafeId);
  res.json(cafeReviews);
});

// Оставить отзыв о кафе
app.post('/cafes/:id/reviews', (req, res) => {
  const cafeId = parseInt(req.params.id);
  const { userId, rating, text } = req.body;

  if (!cafes.some(c => c.id === cafeId)) {
    return res.status(404).json({ error: "Кафе не найдено" });
  }

  if (!userId || !rating || !text) {
    return res.status(400).json({ error: "Все поля обязательны" });
  }

  if (rating < 1 || rating > 5) {
    return res.status(400).json({ error: "Рейтинг должен быть от 1 до 5" });
  }

  const newReview = {
    id: reviews.length + 1,
    cafeId,
    userId,
    rating: parseInt(rating),
    text,
    createdAt: new Date().toISOString()
  };

  reviews.push(newReview);
  res.status(201).json(newReview);
});

// Запуск сервера
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Сервер запущен на порту ${PORT}`);
  console.log(`Доступные роуты:`);
  console.log(`GET /cafes - список кафе`);
  console.log(`POST /cafes - добавить кафе`);
  console.log(`GET /cafes/:id/reviews - отзывы кафе`);
  console.log(`POST /cafes/:id/reviews - добавить отзыв`);
});