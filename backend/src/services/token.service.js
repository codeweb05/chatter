'use strict';
const jwt = require('jsonwebtoken');
const moment = require('moment');
const config = require('../config/config');

const generateToken = (userId, expires, secret = config.jwt.secret) => {
	const payload = {
		userId,
		iat: moment().unix(),
		exp: expires.unix()
	};
	return jwt.sign(payload, secret);
};

const generateAuthTokens = async (user) => {
	const accessTokenExpires = moment().add(config.jwt.accessExpirationMinutes, 'minutes');
	const accessToken = generateToken(user, accessTokenExpires);

	const refreshTokenExpires = moment().add(config.jwt.refreshExpirationDays, 'days');
	const refreshToken = generateToken(user, refreshTokenExpires);

	return {
		access: {
			token: accessToken,
			expires: accessTokenExpires.toDate()
		},
		refresh: {
			token: refreshToken,
			expires: refreshTokenExpires.toDate()
		}
	};
};

module.exports = {
	generateToken,
	generateAuthTokens
};
