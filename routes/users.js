const usersrouter = require('express').Router();

const { celebrate, Joi } = require('celebrate');

const {
  getUser, getUserId, patchUserProfile, patchUserAvatar, getUserInfo,
} = require('../controllers/users');

usersrouter.get('/', getUser);

usersrouter.get('/me', getUserInfo);

usersrouter.get('/:id', celebrate({
  params: Joi.object().keys({
    id: Joi.string().alphanum().length(24),
  }),
}), getUserId);

usersrouter.patch('/me', celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
  }),
}), patchUserProfile);

usersrouter.patch('/me/avatar', celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().regex(/(http|https):\/\/([\w.]+\/?)\S*/),
  }),
}), patchUserAvatar);

module.exports = usersrouter;
