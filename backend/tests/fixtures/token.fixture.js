'use strict';
const moment = require('moment');
const config = require('../../src/config/config');
const tokenService = require('../../src/services/token.service');
const { userOne, adminOne, orgOne } = require('./user.fixture');

const accessTokenExpires = moment().add(config.jwt.accessExpirationMinutes, 'minutes');
const userOneAccessToken = tokenService.generateToken(userOne._id, accessTokenExpires);
const adminOneAccessToken = tokenService.generateToken(adminOne._id, accessTokenExpires);
const orgAdminOneAccessToken = tokenService.generateToken(orgOne._id, accessTokenExpires);

module.exports = {
	userOneAccessToken,
	adminOneAccessToken,
	orgAdminOneAccessToken
};
