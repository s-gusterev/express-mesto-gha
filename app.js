const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const usersrouter = require('./routes/users');
const cardsrouter = require('./routes/cards');

const { PORT = 3000 } = process.env;
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use((req, res, next) => {
  req.user = {
    _id: '62aeee494fb961b9842c61d4',
  };

  next();
});

app.use('/users', usersrouter);

app.use('/cards', cardsrouter);

app.use((req, res) => {
  res.status(404).send({ message: 'Страницы не существует' });
});

mongoose.connect('mongodb://localhost:27017/mestodb', {
});

app.listen(PORT, () => { console.log(`Сервер работает на порту ${PORT}`); });
