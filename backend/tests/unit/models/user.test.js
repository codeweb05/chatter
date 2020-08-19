'use strict';
const faker = require('faker');
const { User } = require('../../../src/models');

describe('User model', () => {
	describe('User validation', () => {
		let newUser;
		beforeEach(() => {
			const email = faker.internet.email().toLowerCase();
			const domain = email.split('@')[1].split('.')[0];
			newUser = {
				name: faker.name.findName(),
				email,
				domain,
				role: 'user'
			};
		});

		test('should correctly validate a valid user', async () => {
			await expect(new User(newUser).validate()).resolves.toBeUndefined();
		});

		test('should throw a validation error if role is unknown', async () => {
			newUser.role = 'invalid';
			await expect(new User(newUser).validate()).rejects.toThrow();
		});
	});
});
