'use strict';
const http = require('http');
const socketio = require('socket.io');
const app = require('./app');
const server = http.createServer(app);
const io = socketio(server);
const config = require('./config/config');
const logger = require('./config/logger');
require('./database');
require('./socket')(io);

server.listen(config.port, () => {
	logger.info(`Listening to port ${config.port}`);
});
