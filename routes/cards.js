const cardsrouter = require('express').Router();
const {
  createCard, getCard, getCardId, likeCard, dislikeCard,
} = require('../controllers/cards');

cardsrouter.post('/', createCard);

cardsrouter.get('/', getCard);

cardsrouter.get('/:id', getCardId);

cardsrouter.put('/:cardId/likes', likeCard);
cardsrouter.delete('/:cardId/likes', dislikeCard);

module.exports = cardsrouter;
