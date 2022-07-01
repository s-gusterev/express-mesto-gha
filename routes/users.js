const usersrouter = require('express').Router();
const {
  getUser, getUserId, patchUserProfile, patchUserAvatar,
} = require('../controllers/users');

usersrouter.get('/', getUser);

usersrouter.get('/:id', getUserId);

usersrouter.patch('/me', patchUserProfile);

usersrouter.patch('/me/avatar', patchUserAvatar);

module.exports = usersrouter;
