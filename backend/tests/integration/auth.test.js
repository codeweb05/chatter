'use strict';
const request = require('supertest');
const faker = require('faker');
const httpStatus = require('http-status');
const httpMocks = require('node-mocks-http');
const moment = require('moment');
const app = require('../../src/app');
const config = require('../../src/config/config');
const { auth } = require('../../src/middlewares');
const ApiError = require('../../src/utils/ApiError');
const setupTestDB = require('../utils/setupTestDB');
const { roleRights } = require('../../src/config/roles');
const { userOne, orgOne, adminOne, insertUsers, insertOrgs } = require('../fixtures/user.fixture');
const { userOneAccessToken, adminOneAccessToken } = require('../fixtures/token.fixture');
const { tokenService } = require('../../src/services');

setupTestDB();

describe('Auth routes', () => {
	describe('POST /v1/auth/orgRegister', () => {
		let newOrg;
		beforeEach(() => {
			const email = faker.internet.email().toLowerCase();
			const domain = email.split('@')[1].split('.')[0];
			newOrg = {
				orgName: faker.name.findName(),
				name: faker.name.findName(),
				email,
				domain
			};
		});

		test('should return 201 and successfully register a organisation if request data is ok', async () => {
			await request(app).post('/v1/auth/orgRegister').send(newOrg).expect(httpStatus.CREATED);
		});

		test('should return 400 error if email is invalid', async () => {
			newOrg.email = 'invalidEmail';

			await request(app).post('/v1/auth/orgRegister').send(newOrg).expect(httpStatus.BAD_REQUEST);
		});

		test('should return 400 error if email is already used', async () => {
			await insertUsers([userOne]);
			newOrg.email = userOne.email;

			await request(app).post('/v1/auth/orgRegister').send(newOrg).expect(httpStatus.BAD_REQUEST);
		});
		test('should return 400 error if domain is already used', async () => {
			await insertOrgs([orgOne]);
			newOrg.domain = orgOne.domain;
			await request(app).post('/v1/auth/orgRegister').send(newOrg).expect(httpStatus.BAD_REQUEST);
		});
	});
	describe('POST /v1/auth/userRegister', () => {
		let newUser;
		beforeEach(() => {
			newUser = {
				name: faker.name.findName(),
				email: faker.internet.email().toLowerCase()
			};
		});

		test('should return 201 and successfully register a user if request data is ok and organisation is present ', async () => {
			await insertOrgs([orgOne]);
			newUser.email = faker.lorem.word() + '@' + orgOne.domain + '.com';
			await request(app).post('/v1/auth/userRegister').send(newUser).expect(httpStatus.CREATED);
		}, 10000);

		test('should return 400 error if email is invalid', async () => {
			newUser.email = 'invalidEmail';

			await request(app).post('/v1/auth/orgRegister').send(newUser).expect(httpStatus.BAD_REQUEST);
		});

		test('should return 400 error if email is already used', async () => {
			await insertUsers([userOne]);
			newUser.email = userOne.email;

			await request(app).post('/v1/auth/orgRegister').send(newUser).expect(httpStatus.BAD_REQUEST);
		});
		test('should return 400 error if organisation is not registered', async () => {
			await request(app).post('/v1/auth/orgRegister').send(newUser).expect(httpStatus.BAD_REQUEST);
		});
	});
});

describe('Auth middleware', () => {
	test('should call next with no errors if access token is valid', async () => {
		await insertUsers([userOne]);
		const req = httpMocks.createRequest({ headers: { Authorization: `Bearer ${userOneAccessToken}` } });
		const next = jest.fn();

		await auth()(req, httpMocks.createResponse(), next);

		expect(next).toHaveBeenCalledWith();
		expect(req.user._id).toEqual(userOne._id);
	});

	test('should call next with unauthorized error if access token is not found in header', async () => {
		await insertUsers([userOne]);
		const req = httpMocks.createRequest();
		const next = jest.fn();

		await auth()(req, httpMocks.createResponse(), next);

		expect(next).toHaveBeenCalledWith(expect.any(ApiError));
		expect(next).toHaveBeenCalledWith(
			expect.objectContaining({ statusCode: httpStatus.UNAUTHORIZED, message: 'Please authenticate' })
		);
	});

	test('should call next with unauthorized error if access token is not a valid jwt token', async () => {
		await insertUsers([userOne]);
		const req = httpMocks.createRequest({ headers: { Authorization: 'Bearer randomToken' } });
		const next = jest.fn();

		await auth()(req, httpMocks.createResponse(), next);

		expect(next).toHaveBeenCalledWith(expect.any(ApiError));
		expect(next).toHaveBeenCalledWith(
			expect.objectContaining({ statusCode: httpStatus.UNAUTHORIZED, message: 'Please authenticate' })
		);
	});

	test('should call next with unauthorized error if access token is generated with an invalid secret', async () => {
		await insertUsers([userOne]);
		const tokenExpires = moment().add(config.jwt.accessExpirationMinutes, 'minutes');
		const accessToken = tokenService.generateToken(userOne._id, tokenExpires, 'invalidSecret');
		const req = httpMocks.createRequest({ headers: { Authorization: `Bearer ${accessToken}` } });
		const next = jest.fn();

		await auth()(req, httpMocks.createResponse(), next);

		expect(next).toHaveBeenCalledWith(expect.any(ApiError));
		expect(next).toHaveBeenCalledWith(
			expect.objectContaining({ statusCode: httpStatus.UNAUTHORIZED, message: 'Please authenticate' })
		);
	});

	test('should call next with unauthorized error if access token is expired', async () => {
		await insertUsers([userOne]);
		const tokenExpires = moment().subtract(1, 'minutes');
		const accessToken = tokenService.generateToken(userOne._id, tokenExpires);
		const req = httpMocks.createRequest({ headers: { Authorization: `Bearer ${accessToken}` } });
		const next = jest.fn();

		await auth()(req, httpMocks.createResponse(), next);

		expect(next).toHaveBeenCalledWith(expect.any(ApiError));
		expect(next).toHaveBeenCalledWith(
			expect.objectContaining({ statusCode: httpStatus.UNAUTHORIZED, message: 'Please authenticate' })
		);
	});

	test('should call next with unauthorized error if user is not found', async () => {
		const req = httpMocks.createRequest({ headers: { Authorization: `Bearer ${userOneAccessToken}` } });
		const next = jest.fn();

		await auth()(req, httpMocks.createResponse(), next);

		expect(next).toHaveBeenCalledWith(expect.any(ApiError));
		expect(next).toHaveBeenCalledWith(
			expect.objectContaining({ statusCode: httpStatus.UNAUTHORIZED, message: 'Please authenticate' })
		);
	});

	test('should call next with forbidden error if user does not have required rights', async () => {
		await insertUsers([userOne]);
		const req = httpMocks.createRequest({ headers: { Authorization: `Bearer ${userOneAccessToken}` } });
		const next = jest.fn();

		await auth('anyRight')(req, httpMocks.createResponse(), next);

		expect(next).toHaveBeenCalledWith(expect.any(ApiError));
		expect(next).toHaveBeenCalledWith(
			expect.objectContaining({ statusCode: httpStatus.FORBIDDEN, message: 'Forbidden' })
		);
	});

	test('should call next with no errors if user has required rights', async () => {
		await insertUsers([adminOne]);
		const req = httpMocks.createRequest({
			headers: { Authorization: `Bearer ${adminOneAccessToken}` },
			params: { userId: userOne._id.toHexString() }
		});
		const next = jest.fn();

		await auth(...roleRights.get('admin'))(req, httpMocks.createResponse(), next);

		expect(next).toHaveBeenCalledWith();
	});
});
