const express = require('express');
const bodyParser = require('body-parser');

// Инициализируем приложение
const app = express();

// Middleware
app.use(bodyParser.json());

// Временное "хранилище" задач в памяти
let todos = [
  { id: 1, text: 'Learn Node.js' },
  { id: 2, text: 'Write tests with Mocha/Chai' }
];

// === Маршруты ===

// Получить все задачи
app.get('/todos', (req, res) => {
  res.status(200).json(todos);
});

// Создать новую задачу
app.post('/todos', (req, res) => {
  const { text } = req.body;

  if (!text || typeof text !== 'string') {
    return res.status(400).json({ error: 'Text is required and must be a string.' });
  }

  const newTodo = {
    id: Date.now(),
    text
  };

  todos.push(newTodo);

  res.status(201).json(newTodo);
});

// Получить задачу по ID
app.get('/todos/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const todo = todos.find(t => t.id === id);

  if (!todo) {
    return res.status(404).json({ error: 'Todo not found.' });
  }

  res.status(200).json(todo);
});

// Обновить задачу
app.put('/todos/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const index = todos.findIndex(t => t.id === id);

  if (index === -1) {
    return res.status(404).json({ error: 'Todo not found.' });
  }

  const { text } = req.body;

  if (!text || typeof text !== 'string') {
    return res.status(400).json({ error: 'Text is required and must be a string.' });
  }

  todos[index] = { ...todos[index], text };
  res.status(200).json(todos[index]);
});

// Удалить задачу
app.delete('/todos/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const index = todos.findIndex(t => t.id === id);

  if (index === -1) {
    return res.status(404).json({ error: 'Todo not found.' });
  }

  todos.splice(index, 1);
  res.status(204).send();
});

// Экспортируем приложение для тестирования
module.exports = app;