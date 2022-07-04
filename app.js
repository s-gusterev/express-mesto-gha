const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const usersrouter = require('./routes/users');
const cardsrouter = require('./routes/cards');
const { login, createUser } = require('./controllers/users');
const { auth } = require('./middlewares/auth');

const { PORT = 3000 } = process.env;
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/users', auth, usersrouter);

app.use('/cards', auth, cardsrouter);

app.post('/signin', login);
app.post('/signup', createUser);

app.use((req, res) => {
  res.status(404).send({ message: 'Страницы не существует' });
});

mongoose.connect('mongodb://localhost:27017/mestodb');

app.use((err, req, res, next) => {
  const { statusCode = 500, message } = err;
  res.status(statusCode).send({ message: statusCode === 500 ? 'На сервере произошла ошибка' : message });
  next();
});

app.listen(PORT, () => { console.log(`Сервер работает на порту ${PORT}`); });
