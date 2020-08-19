'use strict';
const Joi = require('@hapi/joi');

const orgRegister = {
	body: Joi.object().keys({
		email: Joi.string().required().email(),
		name: Joi.string().required(),
		domain: Joi.string().required(),
		orgName: Joi.string().required()
	})
};

const userRegister = {
	body: Joi.object().keys({
		email: Joi.string().required().email(),
		name: Joi.string().required()
	})
};

const verifyEmail = Joi.object({
	userId: Joi.string().required(),
	token: Joi.string().required(),
	expires: Joi.date().timestamp().required()
});

const refreshTokens = {
	body: Joi.object().keys({
		refreshToken: Joi.string().required()
	})
};

module.exports = {
	orgRegister,
	userRegister,
	refreshTokens,
	verifyEmail
};
