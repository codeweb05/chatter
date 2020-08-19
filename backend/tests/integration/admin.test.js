'use strict';
const request = require('supertest');
const httpStatus = require('http-status');
const app = require('../../src/app');
const setupTestDB = require('../utils/setupTestDB');
const { adminOneAccessToken } = require('../fixtures/token.fixture');
const { userOne, adminOne, orgOne, insertUsers, insertOrgs, insertAdmins } = require('../fixtures/user.fixture');

setupTestDB();

describe('Admin routes', () => {
	describe('POST /v1/admin/blockUser', () => {
		test('should return 500 if admin tries to block orgAdmin user', async () => {
			await insertOrgs([orgOne]);
			await insertAdmins([adminOne]);

			const payload = {
				userId: orgOne._id,
				isActive: false
			};
			await request(app)
				.post('/v1/admin/blockUser')
				.set('Authorization', `Bearer ${adminOneAccessToken}`)
				.send(payload)
				.expect(httpStatus.INTERNAL_SERVER_ERROR);
		});

		test('should return 201 if admin tries to block user', async () => {
			await insertAdmins([adminOne]);
			await insertUsers([userOne]);

			const payload = {
				userId: userOne._id,
				isActive: false
			};
			await request(app)
				.post('/v1/admin/blockUser')
				.set('Authorization', `Bearer ${adminOneAccessToken}`)
				.send(payload)
				.expect(httpStatus.CREATED);
		});
	});
	describe('POST /v1/admin/setAccess', () => {
		test('should return 500 if admin tries to revoke admin access from orgAdmin user', async () => {
			await insertOrgs([orgOne]);
			await insertAdmins([adminOne]);

			const payload = {
				userId: orgOne._id,
				isAdmin: false
			};
			await request(app)
				.post('/v1/admin/setAccess')
				.set('Authorization', `Bearer ${adminOneAccessToken}`)
				.send(payload)
				.expect(httpStatus.INTERNAL_SERVER_ERROR);
		});

		test('should return 201 if admin tries to revoke admin access from user', async () => {
			await insertAdmins([adminOne]);
			await insertUsers([userOne]);

			const payload = {
				userId: userOne._id,
				isAdmin: false
			};
			await request(app)
				.post('/v1/admin/setAccess')
				.set('Authorization', `Bearer ${adminOneAccessToken}`)
				.send(payload)
				.expect(httpStatus.CREATED);
		});

		test('should return 201 if admin tries to grant admin access from user', async () => {
			await insertAdmins([adminOne]);
			await insertUsers([userOne]);

			const payload = {
				userId: userOne._id,
				isAdmin: true
			};
			await request(app)
				.post('/v1/admin/setAccess')
				.set('Authorization', `Bearer ${adminOneAccessToken}`)
				.send(payload)
				.expect(httpStatus.CREATED);
		});
	});
	describe('POST /v1/admin/deleteUser', () => {
		test('should return 500 if admin tries to delete orgAdmin user', async () => {
			await insertOrgs([orgOne]);
			await insertAdmins([adminOne]);

			const payload = {
				userId: orgOne._id
			};
			await request(app)
				.post('/v1/admin/deleteUser')
				.set('Authorization', `Bearer ${adminOneAccessToken}`)
				.send(payload)
				.expect(httpStatus.INTERNAL_SERVER_ERROR);
		});

		test('should return 201 if admin tries delete  user', async () => {
			await insertAdmins([adminOne]);
			await insertUsers([userOne]);

			const payload = {
				userId: userOne._id
			};
			await request(app)
				.post('/v1/admin/deleteUser')
				.set('Authorization', `Bearer ${adminOneAccessToken}`)
				.send(payload)
				.expect(httpStatus.CREATED);
		});
	});
});
