'use strict';
const httpStatus = require('http-status');
const { tokenService, emailService, userService } = require('../services');

const sendUserToken = async (req, res) => {
	const tokens = await tokenService.generateAuthTokens(req.user._id);
	res.status(httpStatus.CREATED).send({
		userId: req.user._id,
		isActive: req.user.isActive,
		name: req.user.name,
		image: req.user.image,
		isAdmin: req.user.role === 'admin' || req.user.role === 'orgAdmin' ? true : undefined,
		...tokens
	});
};

const orgRegister = async (req, res) => {
	await userService.createOrg(req.body);
	res.status(httpStatus.CREATED).send({ message: 'Organisation created' });
};
const userRegister = async (req, res) => {
	const { email } = req.body;
	const user = await userService.createUser(req.body);
	const link = user.verificationUrl();
	await emailService.sendMail({
		to: email,
		subject: 'Verify your email address',
		text: link
	});
	res.status(httpStatus.CREATED).json({ message: 'Verify your email address' });
};
const verifyEmail = async (req, res) => {
	await userService.markAsVerified(req.query);
	res.status(httpStatus.CREATED).json({ message: 'User Verified' });
};

module.exports = {
	sendUserToken,
	orgRegister,
	userRegister,
	verifyEmail
};
