const User = require('../models/user');

const createUser = (req, res) => {
  const { name, about, avatar } = req.body;

  User.create({ name, about, avatar })
    .then((user) => { res.send({ data: user }); })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(400).send({ message: 'Переданы некорректные данные при создании пользователя' });
      } else {
        res.status(500).send({ message: 'Неизвестная ошибка' });
      }
    });
};

const getUser = (req, res) => {
  User.find({})
    .then((user) => { res.send({ data: user }); })
    .catch(() => { res.status(500).send({ message: 'Произошла ошибка' }); });
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
      console.log(err.message);
      if (err.name === 'CastError') {
        res.status(400).send({ message: 'Некоректно указан id пользователя' });
      } else {
        res.status(500).send({ message: 'Неизвестная ошибка' });
      }
    });
};

const patchUserProfile = (req, res) => {
  const { name, about } = req.body;

  User.findByIdAndUpdate(req.user._id, { name, about }, { new: true })
    .then((user) => { res.send({ data: user }); })
    .catch((err) => { res.status(500).send({ message: 'Произошла ошибка' }); });
};

const patchUserAvatar = (req, res) => {
  const avatar = req.body;
  User.findByIdAndUpdate(req.user._id, avatar, { new: true })
    .then((user) => { res.send({ data: user }); })
    .catch((err) => { res.status(500).send({ message: 'Произошла ошибка' }); });
};

module.exports = {
  createUser,
  getUser,
  getUserId,
  patchUserProfile,
  patchUserAvatar,
};
