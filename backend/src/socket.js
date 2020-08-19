'use strict';
const config = require('./config/config');
const jwt = require('jwt-then');
const logger = require('./config/logger');
const { userService } = require('./services');

module.exports = (io) => {
	io.use(async (socket, next) => {
		try {
			const token = socket.handshake.query.token;
			const payload = await jwt.verify(token, config.jwt.secret);
			if (payload.exp > Date.now()) throw new Error();
			socket.userId = payload.userId;
			next();
		} catch (err) {
			socket.disconnect();
		}
	});

	io.on('connection', async (socket) => {
		logger.info('connect ' + socket.id);
		logger.info('connect userId ' + socket.userId);

		await userService.saveSocketId(socket.userId, socket.id);

		socket.on('add-message', async (data) => {
			if (data.message === '') {
				io.to(socket.id).emit('add-message-response', {
					error: true,
					message: "Message can't be empty."
				});
			} else if (data.toUserId === '') {
				io.to(socket.id).emit('add-message-response', {
					error: true,
					message: 'Select a user to chat.'
				});
			} else {
				try {
					data = { ...data, fromUserId: socket.userId };
					await userService.checkStatus(data.fromUserId);
					const toSocketId = await userService.getSocketId(data.toUserId);
					await userService.saveMessage(data);
					if (toSocketId) io.to(toSocketId).emit('add-message-response', data);
				} catch (error) {
					let message = 'Could not store messages, server error.';
					if (error.message === 'user blocked') {
						message = 'user blocked';
					} else if (error.message === 'you have been blocked') {
						socket.disconnect();
						return;
					}
					io.to(socket.id).emit('add-message-response', {
						error: true,
						message,
						toUserId: data.toUserId
					});
				}
			}
		});

		socket.on('disconnect', async () => {
			logger.info('dis ' + socket.id);
			await userService.saveSocketId(socket.userId, null);
		});
	});
};
