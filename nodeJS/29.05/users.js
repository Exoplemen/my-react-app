const express = require('express');
const router = express.Router();

// Mock данные пользователей
const users = [
  { id: 1, name: 'Иван' },
  { id: 2, name: 'Мария' },
  { id: 3, name: 'Алексей' }
];

// Список пользователей
router.get('/', (req, res) => {
  res.send(`
    <h1>Список пользователей</h1>
    <ul>
      ${users.map(user => `<li><a href="/users/${user.id}">${user.name}</a></li>`).join('')}
    </ul>
  `);
});

// Профиль пользователя
router.get('/:id', (req, res) => {
  const user = users.find(u => u.id === parseInt(req.params.id));
  if (user) {
    res.send(`<h1>Профиль пользователя</h1><p>ID: ${user.id}</p><p>Имя: ${user.name}</p>`);
  } else {
    res.status(404).send('Пользователь не найден');
  }
});

module.exports = router;