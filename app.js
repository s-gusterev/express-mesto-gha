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

mongoose.connect('mongodb://localhost:27017/mestodb', {
  // useNewUrlParser: true,
  // useCreateIndex: true,
  // useFindAndModify: false,
});

app.listen(PORT, () => {});
