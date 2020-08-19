'use strict';
const Joi = require('@hapi/joi');
const { objectId } = require('./custom.validation');

const blockUser = {
	body: Joi.object().keys({
		userId: Joi.string().required().custom(objectId),
		isActive: Joi.boolean().required()
	})
};

const setAccess = {
	body: Joi.object().keys({
		userId: Joi.string().required().custom(objectId),
		isAdmin: Joi.boolean().required()
	})
};

const deleteUser = {
	body: Joi.object().keys({
		userId: Joi.string().required().custom(objectId)
	})
};
const messageHistory = {
	body: Joi.object().keys({
		userId1: Joi.string().required().custom(objectId),
		userId2: Joi.string().required().custom(objectId)
	})
};

module.exports = {
	blockUser,
	setAccess,
	deleteUser,
	messageHistory
};
