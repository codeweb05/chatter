'use strict';
const faker = require('faker');
const mongoose = require('mongoose');
const { Message } = require('../../../src/models');

describe('User model', () => {
	describe('User validation', () => {
		let newMessage;
		beforeEach(() => {
			newMessage = {
				message: faker.lorem.words(),
				fromUserId: mongoose.Types.ObjectId(),
				toUserId: mongoose.Types.ObjectId()
			};
		});

		test('should correctly validate a valid user', async () => {
			await expect(new Message(newMessage).validate()).resolves.toBeUndefined();
		});
	});
});
