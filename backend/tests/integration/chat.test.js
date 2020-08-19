'use strict';
const request = require('supertest');
const httpStatus = require('http-status');
const app = require('../../src/app');
const setupTestDB = require('../utils/setupTestDB');
const { userOne, insertUsers } = require('../fixtures/user.fixture');
const { userOneAccessToken } = require('../fixtures/token.fixture');

setupTestDB();
describe('User routes', () => {
	describe('GET /v1/user/chat', () => {
		test('should return 201 and successfully return the chat data', async () => {
			await insertUsers([userOne]);
			await request(app)
				.get('/v1/user/chat')
				.set('Authorization', `Bearer ${userOneAccessToken}`)
				.send()
				.expect(httpStatus.CREATED);
		});
	});
});
