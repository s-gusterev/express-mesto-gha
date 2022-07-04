const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const NotFoundError = require('../errors/NotFoundError');
const BadRequestError = require('../errors/BadRequestError');
const UnauthorizedError = require('../errors/UnauthorizedError');
const ConflictError = require('../errors/ConflictError');

const createUser = (req, res, next) => {
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
      console.log(err.message);
      if (err.name === 'ValidationError') {
        throw new BadRequestError('Переданы некорректные данные при создании пользователя');
      }
      if (err.code === 11000) {
        throw new ConflictError('Переданы некорректные данные при создании пользователя');
      }
    })
    .catch(next);
};

const login = (req, res, next) => {
  const { email, password } = req.body;

  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, 'secret-token-mesto', { expiresIn: '7d' });
      res.send({ token });
    })
    .catch(() => {
      throw new UnauthorizedError('Неправильные email или пароль');
    })
    .catch(next);
};

const getUser = (req, res, next) => {
  User.find({})
    .then((user) => { res.send({ data: user }); })
    .catch((err) => { next(err); });
};

const getUserInfo = (req, res, next) => {
  const userId = req.user._id;
  User.findById(userId)
    .then((user) => { res.send({ data: user }); })
    .catch((err) => { next(err); });
};

const getUserId = (req, res, next) => {
  User.findById(req.params.id)
    .then((user) => {
      if (!user) {
        throw new NotFoundError(`Пользователь по указанному id ${req.params.id} не найден в базе данных`);
      } else {
        res.send({ data: user });
      }
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        throw new BadRequestError('Некоректно указан id пользователя');
      }
    })
    .catch(next);
};

const patchUserProfile = (req, res, next) => {
  const { name, about } = req.body;
  User.findByIdAndUpdate(req.user._id, { name, about }, { new: true, runValidators: true })
    .then((user) => {
      if (!user) {
        throw new NotFoundError('Пользователь по указанному id не найден в базе данных');
      } else {
        res.send({ data: user });
      }
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        throw new BadRequestError('Переданы некорректные данные при обновлении профиля');
      } else if (err.name === 'CastError') {
        throw new BadRequestError('Не правильно указан id пользователя');
      }
    })
    .catch(next);
};

const patchUserAvatar = (req, res, next) => {
  const avatar = req.body;
  User.findByIdAndUpdate(req.user._id, avatar, { new: true, runValidators: true })
    .then((user) => {
      if (!user) {
        throw new NotFoundError('Пользователь по указанному id не найден в базе данных');
      } else {
        res.send({ data: user });
      }
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        throw new BadRequestError('Переданы некорректные данные при обновлении профиля');
      } else if (err.name === 'CastError') {
        throw new BadRequestError('Не правильно указан id пользователя');
      }
    })
    .catch(next);
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
