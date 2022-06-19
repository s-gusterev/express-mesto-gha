const cardsrouter = require('express').Router();
const { createCard, getCard, getCardId } = require('../controllers/cards');

cardsrouter.post('/', createCard);

cardsrouter.get('/', getCard);

cardsrouter.get('/:id', getCardId);

module.exports = cardsrouter;
