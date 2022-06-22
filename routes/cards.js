const cardsrouter = require('express').Router();
const {
  createCard, getCard, getCardId, likeCard, dislikeCard, deleteCard,
} = require('../controllers/cards');

cardsrouter.post('/', createCard);

cardsrouter.get('/', getCard);

cardsrouter.get('/:id', getCardId);

cardsrouter.delete('/:cardId', deleteCard);

cardsrouter.put('/:cardId/likes', likeCard);
cardsrouter.delete('/:cardId/likes', dislikeCard);

module.exports = cardsrouter;
