const { expect } = require('chai');
const request = require('supertest');
const app = require('../app');

describe('Integration Tests for Todo API', () => {
  let testTodoId;

  // Тест для GET /todos
  describe('GET /todos', () => {
    it('should return an array of todos', async () => {
      const res = await request(app)
        .get('/todos')
        .expect(200);
      
      expect(res.body).to.be.an('array');
      expect(res.body.length).to.be.greaterThan(0);
    });
  });

  // Тест для POST /todos
  describe('POST /todos', () => {
    it('should create a new todo with valid data', async () => {
      const newTodo = { text: 'New integration test todo' };
      const res = await request(app)
        .post('/todos')
        .send(newTodo)
        .expect(201);
      
      expect(res.body).to.have.property('id');
      expect(res.body.text).to.equal(newTodo.text);
      
      // Сохраняем ID для последующих тестов
      testTodoId = res.body.id;
    });

    it('should return 400 for invalid data', async () => {
      const invalidTodo = { text: 123 }; // Неправильный тип
      await request(app)
        .post('/todos')
        .send(invalidTodo)
        .expect(400);
    });
  });

  // Тест для GET /todos/:id
  describe('GET /todos/:id', () => {
    it('should return a todo by existing id', async () => {
      const res = await request(app)
        .get(`/todos/${testTodoId}`)
        .expect(200);
      
      expect(res.body.id).to.equal(testTodoId);
    });

    it('should return 404 for non-existent id', async () => {
      await request(app)
        .get('/todos/999999')
        .expect(404);
    });
  });

  // Тест для PUT /todos/:id
  describe('PUT /todos/:id', () => {
    it('should update an existing todo', async () => {
      const updatedData = { text: 'Updated text from integration test' };
      const res = await request(app)
        .put(`/todos/${testTodoId}`)
        .send(updatedData)
        .expect(200);
      
      expect(res.body.text).to.equal(updatedData.text);
    });

    it('should return 404 when updating non-existent todo', async () => {
      await request(app)
        .put('/todos/999999')
        .send({ text: 'Should fail' })
        .expect(404);
    });

    it('should return 400 for invalid data', async () => {
      await request(app)
        .put(`/todos/${testTodoId}`)
        .send({ text: 123 }) // Неправильный тип
        .expect(400);
    });
  });

  // Тест для DELETE /todos/:id
  describe('DELETE /todos/:id', () => {
    it('should delete an existing todo', async () => {
      await request(app)
        .delete(`/todos/${testTodoId}`)
        .expect(204);
    });

    it('should return 404 when deleting non-existent todo', async () => {
      await request(app)
        .delete('/todos/999999')
        .expect(404);
    });
  });
});