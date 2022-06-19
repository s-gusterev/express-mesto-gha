const usersrouter = require('express').Router();
const { createUser, getUser, getUserId } = require('../controllers/users');

usersrouter.post('/', createUser);

usersrouter.get('/', getUser);

usersrouter.get('/:id', getUserId);

module.exports = usersrouter;
