'use strict';
const setupTestDB = require('../../utils/setupTestDB');
const { userOne, insertUsers } = require('../../fixtures/user.fixture');
const { userService } = require('../../../src/services');

setupTestDB();

describe('User service', () => {
	describe('saveSocketId getSocketId function', () => {
		test('should socket id saved in db', async () => {
			await insertUsers([userOne]);
			const socketId = 'socketId';
			await userService.saveSocketId(userOne._id, socketId);
			const dbSocketId = await userService.getSocketId(userOne._id);
			expect(dbSocketId).toBe(socketId);
		});
		test('should throw error if user is blocked', async () => {
			userOne.isActive = false;
			await insertUsers([userOne]);
			const action = async () => {
				await userService.getSocketId(userOne._id);
			};
			await expect(action()).rejects.toThrow('user blocked');
		});
	});
	describe('checkStatus function', () => {
		test('should thow error if user is not active', async () => {
			userOne.isActive = false;
			await insertUsers([userOne]);
			const action = async () => {
				await userService.checkStatus(userOne._id);
			};
			await expect(action()).rejects.toThrow('you have been blocked');
		});
		test('should NOT thow error if user is not active', async () => {
			userOne.isActive = true;
			await insertUsers([userOne]);
			const action = async () => {
				await userService.checkStatus(userOne._id);
			};
			await expect(action()).resolves.toBe();
		});
	});
});
