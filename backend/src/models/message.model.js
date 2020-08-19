'use strict';
const mongoose = require('mongoose');
const toJSON = require('../plugins/toJSON');
const MessageSchema = mongoose.Schema(
	{
		fromUserId: {
			type: mongoose.SchemaTypes.ObjectId,
			required: true,
			ref: 'User',
			index: true
		},
		toUserId: {
			type: mongoose.SchemaTypes.ObjectId,
			ref: 'User',
			index: true,
			required: true
		},
		message: {
			type: String,
			trim: true,
			required: true
		}
	},
	{
		timestamps: true
	}
);

// add plugin that converts mongoose to json
MessageSchema.plugin(toJSON);

module.exports = mongoose.model('Message', MessageSchema);
