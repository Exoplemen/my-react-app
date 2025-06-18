const { expect } = require('chai');
const app = require('../app');

// Выносим бизнес-логику в отдельные функции для тестирования
const todoService = {
  findTodoById: (todos, id) => todos.find(t => t.id === id),
  updateTodoText: (todos, id, newText) => {
    const index = todos.findIndex(t => t.id === id);
    if (index === -1) return null;
    todos[index] = { ...todos[index], text: newText };
    return todos[index];
  }
};

describe('Unit Tests for Todo Business Logic', () => {
  let todos;

  beforeEach(() => {
    // Инициализируем тестовые данные перед каждым тестом
    todos = [
      { id: 1, text: 'Learn Node.js' },
      { id: 2, text: 'Write tests with Mocha/Chai' }
    ];
  });

  describe('findTodoById', () => {
    it('should find an existing todo by id', () => {
      const result = todoService.findTodoById(todos, 1);
      expect(result).to.deep.equal({ id: 1, text: 'Learn Node.js' });
    });

    it('should return undefined for non-existent id', () => {
      const result = todoService.findTodoById(todos, 999);
      expect(result).to.be.undefined;
    });
  });

  describe('updateTodoText', () => {
    it('should update text of an existing todo', () => {
      const result = todoService.updateTodoText(todos, 1, 'Updated text');
      expect(result.text).to.equal('Updated text');
      expect(todos[0].text).to.equal('Updated text');
    });

    it('should return null when trying to update non-existent todo', () => {
      const result = todoService.updateTodoText(todos, 999, 'New text');
      expect(result).to.be.null;
      expect(todos.length).to.equal(2); // Массив не должен измениться
    });
  });
});