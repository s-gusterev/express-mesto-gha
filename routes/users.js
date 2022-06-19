const cardrouter = require('express').Router();
const { createUser, getUser, getUserId } = require('../controllers/users');

cardrouter.post('/', createUser);

cardrouter.get('/', getUser);

cardrouter.get('/:id', getUserId);

module.exports = cardrouter;
