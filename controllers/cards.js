const Card = require('../models/card');

const createCard = (req, res) => {
  const { name, link } = req.body;

  Card.create({ name, link, owner: req.user._id })
    .then((card) => { res.send({ data: card }); })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(400).send({ message: 'Переданы некорректные данные при создании карточки' });
      } else {
        res.status(500).send({ message: 'Неизвестная ошибка' });
      }
    });
};

const getCard = (req, res) => {
  Card.find({})
    .then((card) => { res.send({ data: card }); })
    .catch((err) => { res.status(500).send({ message: 'Произошла ошибка' }); });
};

const getCardId = (req, res) => {
  Card.findById(req.params.id)
    .then((card) => { res.send({ data: card }); })
    .catch((err) => { res.status(500).send({ message: 'Произошла ошибка' }); });
};

const deleteCard = (req, res) => {
  Card.findByIdAndRemove(req.params.cardId)
    .then((card) => { res.send({ data: card }); })
    .catch((err) => { res.status(500).send({ message: 'Произошла ошибка' }); });
};

const likeCard = (req, res) => {
  Card.findByIdAndUpdate(req.params.cardId, { $addToSet: { likes: req.user._id } }, { new: true })
    .then((card) => { res.send({ data: card }); })
    .catch((err) => { res.status(500).send({ message: 'Произошла ошибка' }); });
};

const dislikeCard = (req, res) => {
  Card.findByIdAndUpdate(req.params.cardId, { $pull: { likes: req.user._id } }, { new: true })
    .then((card) => { res.send({ data: card }); })
    .catch((err) => { res.status(500).send({ message: 'Произошла ошибка' }); });
};

module.exports = {
  createCard,
  getCard,
  getCardId,
  likeCard,
  dislikeCard,
  deleteCard,
};
