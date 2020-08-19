'use strict';
const httpStatus = require('http-status');
const { userService } = require('../services');

const getChat = async (req, res) => {
	const chatList = await userService.getChat(req.user);
	res.status(httpStatus.CREATED).json(chatList);
};

module.exports = {
	getChat
};
