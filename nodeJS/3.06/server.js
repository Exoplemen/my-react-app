const express = require('express');
const exphbs = require('express-handlebars');
const ejs = require('ejs');
const pug = require('pug');

const app = express();

// Handlebars setup
app.engine('hbs', exphbs.engine({ extname: '.hbs' }));
app.set('view engine', 'hbs');
app.set('views', './views/handlebars');

// EJS setup
app.set('view engine', 'ejs');
app.set('views', './views/ejs');

// Pug setup
app.set('view engine', 'pug');
app.set('views', './views/pug');

const students = [
  { id: 1, name: "Иван", age: 20, grade: "A" },
  { id: 2, name: "Мария", age: 21, grade: "B" },
  { id: 3, name: "Алексей", age: 19, grade: "A" },
  { id: 4, name: "Ольга", age: 22, grade: "C" }
];

// Handlebars route
app.get('/handlebars', (req, res) => {
  res.render('students', { 
    title: 'Список студентов', 
    students: students 
  });
});

// EJS route
app.get('/ejs', (req, res) => {
  res.render('students', { 
    title: 'Список студентов', 
    students: students 
  });
});

// Pug route
app.get('/pug', (req, res) => {
  res.render('students', { 
    title: 'Список студентов', 
    students: students 
  });
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});