const usersrouter = require('express').Router();
const { createUser, getUser, getUserId, patchUserProfile } = require('../controllers/users');

usersrouter.post('/', createUser);

usersrouter.get('/', getUser);

usersrouter.get('/:id', getUserId);
usersrouter.patch('/me', patchUserProfile);

module.exports = usersrouter;
