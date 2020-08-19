'use strict';
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const config = require('../config/config');
const { User, Org } = require('../models');
const httpStatus = require('http-status');
const ApiError = require('../utils/ApiError');

module.exports = function (passport) {
	const strategyOptions = {
		clientID: config.google.clientId,
		clientSecret: config.google.secret,
		callbackURL: config.google.callbackUrl
	};
	const verifyCallback = async (accessToken, refreshToken, profile, done) => {
		const newUser = {
			googleId: profile.id,
			name: profile.displayName,
			image: profile.photos[0].value,
			email: profile.emails[0].value
		};
		newUser.domain = newUser.email.split('@')[1].split('.')[0];
		if (!(await Org.exists({ domain: newUser.domain }))) {
			done(new ApiError(httpStatus.BAD_REQUEST, 'Your Organisation is not registered'), null);
			return;
		}
		let user = await User.findOne({ email: newUser.email });
		if (user) {
			if (!user.isActive) done(new ApiError(httpStatus.BAD_REQUEST, 'You have been blocked'), null);
			if (user.verifiedAt || user.googleId) done(null, user);
			else done(new ApiError(httpStatus.BAD_REQUEST, 'Please verify your account'), null);
		} else {
			user = await User.create(newUser);
			done(null, user);
		}
	};
	passport.use(new GoogleStrategy(strategyOptions, verifyCallback));
};
