const usersrouter = require('express').Router();
const {
  getUser, getUserId, patchUserProfile, patchUserAvatar, getUserInfo,
} = require('../controllers/users');

usersrouter.get('/', getUser);

usersrouter.get('/me', getUserInfo);

usersrouter.get('/:id', getUserId);

usersrouter.patch('/me', patchUserProfile);

usersrouter.patch('/me/avatar', patchUserAvatar);

module.exports = usersrouter;
