'use strict';
const faker = require('faker');
const mongoose = require('mongoose');
const { Org } = require('../../../src/models');

describe('User model', () => {
	describe('User validation', () => {
		let newOrg;
		beforeEach(() => {
			newOrg = {
				orgName: faker.name.findName(),
				domain: faker.name.findName(),
				user: mongoose.Types.ObjectId()
			};
		});

		test('should correctly validate a valid user', async () => {
			await expect(new Org(newOrg).validate()).resolves.toBeUndefined();
		});
	});
});
