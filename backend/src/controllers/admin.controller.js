'use strict';
const httpStatus = require('http-status');
const { userService } = require('../services');

const blockUser = async (req, res) => {
	await userService.blockUser(req.body);
	res.status(httpStatus.CREATED).json({ message: 'success' });
};

const setAccess = async (req, res) => {
	await userService.setAccess(req.body);
	res.status(httpStatus.CREATED).json({ message: 'success' });
};

const deleteUser = async (req, res) => {
	await userService.deleteUser(req.body.userId);
	res.status(httpStatus.CREATED).json({ message: 'success' });
};

module.exports = {
	setAccess,
	blockUser,
	deleteUser
};
