const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

const createUser = (req, res) => {
  const {
    name = undefined,
    about = undefined,
    avatar = undefined,
    email,
    password,
  } = req.body;
  bcrypt
    .hash(password, 10)
    .then((hash) => {
      const user = () => User.create(
        {
          name, about, avatar, email, password: hash,
        },
      );
      return user();
    })
    .then((user) => { res.send({ data: user }); })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(400).send({ message: 'Переданы некорректные данные при создании пользователя' });
      } else {
        res.status(500).send({ message: 'Произошла ошибка' });
      }
    });
};

const login = (req, res) => {
  const { email, password } = req.body;

  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, 'secret-token-mesto', { expiresIn: '7d' });
      res.send({ token });
    })
    .catch((err) => {
      res.status(401).send({ message: err.message });
    });
};

const getUser = (req, res) => {
  User.find({})
    .then((user) => { res.send({ data: user }); })
    .catch(() => { res.status(500).send({ message: 'Произошла ошибка' }); });
};

const getUserInfo = (req, res) => {
  const userId = req.user._id;
  User.findById(userId)
    .then((user) => { res.send({ data: user }); })
    .catch(() => {
      res.status(500).send({ message: 'Произошла ошибка' });
    });
};

const getUserId = (req, res) => {
  User.findById(req.params.id)

    .then((user) => {
      if (!user) {
        res.status(404).send({ message: `Пользователь по указанному id ${req.params.id} не найден в базе данных` });
      } else {
        res.send({ data: user });
      }
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(400).send({ message: 'Некоректно указан id пользователя' });
      } else {
        res.status(500).send({ message: 'Произошла ошибка' });
      }
    });
};

const patchUserProfile = (req, res) => {
  const { name, about } = req.body;
  User.findByIdAndUpdate(req.user._id, { name, about }, { new: true, runValidators: true })
    .then((user) => {
      if (!user) {
        res.status(404).send({ message: 'Пользователь по указанному id не найден в базе данных' });
      } else {
        res.send({ data: user });
      }
    })

    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(400).send({ message: 'Переданы некорректные данные при обновлении профиля' });
      } else if (err.name === 'CastError') {
        res.status(400).send({ message: 'Не правильно указан id пользователя' });
      } else {
        res.status(500).send({ message: 'Произошла ошибка' });
      }
    });
};

const patchUserAvatar = (req, res) => {
  const avatar = req.body;
  User.findByIdAndUpdate(req.user._id, avatar, { new: true, runValidators: true })
    .then((user) => {
      if (!user) {
        res.status(404).send({ message: 'Пользователь по указанному id не найден в базе данных' });
      } else {
        res.send({ data: user });
      }
    })

    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(400).send({ message: 'Переданы некорректные данные при обновлении профиля' });
      } else if (err.name === 'CastError') {
        res.status(400).send({ message: 'Не правильно указан id пользователя' });
      } else {
        res.status(500).send({ message: 'Произошла ошибка' });
      }
    });
};

module.exports = {
  createUser,
  getUser,
  getUserId,
  patchUserProfile,
  patchUserAvatar,
  login,
  getUserInfo,
};
