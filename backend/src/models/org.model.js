'use strict';
const mongoose = require('mongoose');
const toJSON = require('../plugins/toJSON');

const OrgSchema = new mongoose.Schema(
	{
		domain: {
			type: String,
			required: true,
			trim: true,
			unique: true
		},
		orgName: {
			type: String,
			required: true,
			trim: true,
			unique: true
		},
		user: {
			type: mongoose.SchemaTypes.ObjectId,
			ref: 'User',
			required: true
		}
	},
	{
		timestamps: true
	}
);

// add plugin that converts mongoose to json
OrgSchema.plugin(toJSON);

const Org = mongoose.model('Org', OrgSchema);
module.exports = Org;
