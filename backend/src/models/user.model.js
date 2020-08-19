'use strict';
const mongoose = require('mongoose');
const { roles } = require('../config/roles');
const { createHmac } = require('crypto');
const { appOrigin, emailVericationTimeout, appSecret } = require('../config/config');
const toJSON = require('../plugins/toJSON');
const moment = require('moment');

const UserSchema = new mongoose.Schema(
	{
		googleId: {
			type: String
		},
		name: {
			type: String,
			required: true,
			trim: true
		},
		image: String,
		email: {
			type: String,
			required: true,
			unique: true,
			trim: true,
			lowercase: true
		},
		role: {
			type: String,
			enum: roles,
			default: 'user'
		},
		domain: {
			type: String,
			required: true
		},
		socketId: String,
		isActive: {
			type: Boolean,
			default: true
		},
		verifiedAt: Date
	},
	{
		timestamps: true
	}
);

UserSchema.methods.verificationUrl = function () {
	const expires = moment().add(emailVericationTimeout, 'minutes').valueOf();
	const url = `${appOrigin}/v1/auth/verify?userId=${this.id}&expires=${expires}`;
	const token = User.signVerificationUrl(url);
	return `${url}&token=${token}`;
};

UserSchema.statics.signVerificationUrl = (url) => createHmac('sha256', appSecret).update(url).digest('hex');

UserSchema.statics.hasValidVerificationUrl = ({ userId, token, expires }) => {
	const url = `${appOrigin}/v1/auth/verify?userId=${userId}&expires=${expires}`;
	const newToken = User.signVerificationUrl(url);
	return newToken === token && expires >= Date.now();
};

// add plugin that converts mongoose to json
UserSchema.plugin(toJSON);

const User = mongoose.model('User', UserSchema);
module.exports = User;
