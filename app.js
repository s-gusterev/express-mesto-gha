const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cardrouter = require('./routes/users');

const { PORT = 3000 } = process.env;
const app = express();

app.use(bodyParser.json());

app.use('/users', cardrouter);

mongoose.connect('mongodb://localhost:27017/mestodb', {
  // useNewUrlParser: true,
  // useCreateIndex: true,
  // useFindAndModify: false,
});

app.listen(PORT, () => {});
