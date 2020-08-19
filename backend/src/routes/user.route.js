'use strict';

const express = require('express');
const { auth } = require('../middlewares');
const { userController } = require('../controllers');

const router = express.Router();

router.get('/chat', auth(), userController.getChat);

module.exports = router;
