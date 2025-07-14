const express = require('express');
const { MongoClient, ObjectId } = require('mongodb');

const app = express();
app.use(express.json());

// Подключение к MongoDB
const url = 'mongodb://localhost:27017';
const client = new MongoClient(url);
const dbName = 'blogdb';

let db;

async function connectDb() {
  await client.connect();
  db = client.db(dbName);
  console.log('Connected to MongoDB');
}

connectDb().catch(console.error);

// Маршруты API
// Создать статью
app.post('/posts', async (req, res) => {
  try {
    const { title, content, author } = req.body;
    const post = { title, content, author, createdAt: new Date() };
    const result = await db.collection('posts').insertOne(post);
    res.status(201).json({ ...post, _id: result.insertedId });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Получить все статьи
app.get('/posts', async (req, res) => {
  try {
    const posts = await db.collection('posts').find().toArray();
    res.json(posts);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Получить одну статью
app.get('/posts/:id', async (req, res) => {
  try {
    const post = await db.collection('posts').findOne({ _id: new ObjectId(req.params.id) });
    if (!post) return res.status(404).json({ error: 'Post not found' });
    res.json(post);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Обновить статью
app.put('/posts/:id', async (req, res) => {
  try {
    const { title, content, author } = req.body;
    const result = await db.collection('posts').updateOne(
      { _id: new ObjectId(req.params.id) },
      { $set: { title, content, author } }
    );
    if (result.matchedCount === 0) {
      return res.status(404).json({ error: 'Post not found' });
    }
    res.json({ message: 'Post updated' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Удалить статью
app.delete('/posts/:id', async (req, res) => {
  try {
    const result = await db.collection('posts').deleteOne({ _id: new ObjectId(req.params.id) });
    if (result.deletedCount === 0) {
      return res.status(404).json({ error: 'Post not found' });
    }
    res.json({ message: 'Post deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Запуск сервера
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});