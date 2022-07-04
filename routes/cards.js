const cardsrouter = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const {
  createCard, getCard, getCardId, likeCard, dislikeCard, deleteCard,
} = require('../controllers/cards');

cardsrouter.post('/', celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    link: Joi.string().required().regex(/(http|https):\/\/([\w.]+\/?)\S*/),
  }),
}), createCard);

cardsrouter.get('/', getCard);

cardsrouter.get('/:id', celebrate({
  params: Joi.object().keys({
    id: Joi.string().alphanum().length(24),
  }),
}), getCardId);

cardsrouter.delete('/:cardId', celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().alphanum().length(24),
  }),
}), deleteCard);

cardsrouter.put('/:cardId/likes', celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().alphanum().length(24),
  }),
}), likeCard);
cardsrouter.delete('/:cardId/likes', celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().alphanum().length(24),
  }),
}), dislikeCard);

module.exports = cardsrouter;
