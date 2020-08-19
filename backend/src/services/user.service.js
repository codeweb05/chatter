'use strict';
const httpStatus = require('http-status');
const { User, Org, Message } = require('../models');
const ApiError = require('../utils/ApiError');

const createUser = async (params) => {
	if (await User.exists({ email: params.email })) {
		throw new ApiError(httpStatus.BAD_REQUEST, 'Email already taken');
	}
	const domain = params.email.split('@')[1].split('.')[0];
	if (await Org.exists({ domain })) {
		return await User.create({ ...params, domain });
	}
	throw new ApiError(httpStatus.BAD_REQUEST, 'Your Organisation is not registered');
};

const createOrg = async ({ domain, orgName, email, name }) => {
	if (await User.exists({ email })) {
		throw new ApiError(httpStatus.BAD_REQUEST, 'Email already registered');
	}
	if (await Org.exists({ domain })) {
		throw new ApiError(httpStatus.BAD_REQUEST, 'Organisation already registered');
	}
	const newUser = { email, name, domain, role: 'orgAdmin', verifiedAt: Date.now() };
	const user = await User.create(newUser);
	const org = {
		domain,
		orgName,
		user
	};
	return await Org.create(org);
};

const markAsVerified = async (query) => {
	const user = await User.findById(query.userId);
	if (!user || !User.hasValidVerificationUrl(query)) {
		throw new ApiError(httpStatus.BAD_REQUEST, 'Invalid activation link');
	}
	if (user.verifiedAt) {
		throw new ApiError(httpStatus.BAD_REQUEST, 'Email already verified');
	}

	user.verifiedAt = new Date();
	await user.save();
};

const getChat = async ({ _id: userId, domain }) => {
	return await User.aggregate([
		{
			$match: {
				_id: { $ne: userId },
				domain: { $eq: domain }
			}
		},
		{
			$project: {
				name: 1,
				isActive: 1,
				isOrgAdmin: {
					$cond: { if: { $eq: ['$role', 'orgAdmin'] }, then: true, else: false }
				},
				isAdmin: {
					$cond: { if: { $eq: ['$role', 'admin'] }, then: true, else: false }
				},
				userId: '$_id',
				_id: 0
			}
		},
		{
			$lookup: {
				from: 'messages',
				let: { userId: '$userId' },
				pipeline: [
					{
						$match: {
							$expr: {
								$or: [
									{
										$and: [{ $eq: ['$toUserId', userId] }, { $eq: ['$fromUserId', '$$userId'] }]
									},
									{
										$and: [{ $eq: ['$toUserId', '$$userId'] }, { $eq: ['$fromUserId', userId] }]
									}
								]
							}
						}
					},
					{ $project: { _id: 0 } }
				],
				as: 'messages'
			}
		}
	]);
};

const saveSocketId = async (userId, socketId) => {
	return await User.findOneAndUpdate({ _id: userId }, { $set: { socketId } });
};
const getSocketId = async (userId) => {
	const data = await User.findOne({ _id: userId });
	if (data) {
		if (!data.isActive) throw new Error('user blocked');
		return data.socketId;
	}
};
const checkStatus = async (userId) => {
	const data = await User.findOne({ _id: userId }, { isActive: 1, _id: 0 });
	if (!data.isActive) throw new Error('you have been blocked');
};
const saveMessage = async (message) => {
	return await Message.create(message);
};
const blockUser = async ({ userId, isActive }) => {
	return await User.findOneAndUpdate({ _id: userId }, { $set: { isActive } });
};
const setAccess = async ({ userId, isAdmin }) => {
	const role = isAdmin ? 'admin' : 'user';
	return await User.findOneAndUpdate({ _id: userId }, { $set: { role } });
};
const checkOrgAdmin = async (userId) => {
	const user = await User.findOne({ _id: userId }, { role: 1, _id: 0 });
	if (user.role === 'orgAdmin') throw new ApiError(httpStatus.FORBIDDEN, 'Cannot remove org admin acccess');
};
const deleteUser = async (userId) => {
	return await User.findOneAndDelete({ _id: userId });
};

module.exports = {
	createUser,
	markAsVerified,
	createOrg,
	getChat,
	saveSocketId,
	getSocketId,
	saveMessage,
	blockUser,
	setAccess,
	checkStatus,
	checkOrgAdmin,
	deleteUser
};
