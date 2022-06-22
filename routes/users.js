const usersrouter = require('express').Router();
const {
  createUser, getUser, getUserId, patchUserProfile, patchUserAvatar,
} = require('../controllers/users');

usersrouter.post('/', createUser);

usersrouter.get('/', getUser);

usersrouter.get('/:id', getUserId);

usersrouter.patch('/me', patchUserProfile);

usersrouter.patch('/me/avatar', patchUserAvatar);

module.exports = usersrouter;
