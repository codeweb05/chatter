'use strict';
const express = require('express');
const { catchAsync } = require('../utils');
const { validate, checkAdmin, auth } = require('../middlewares');
const { adminValidation } = require('../validations');
const { adminController } = require('../controllers');

const router = express.Router();

router.post(
	'/deleteUser',
	auth('manageUsers'),
	catchAsync(checkAdmin),
	validate(adminValidation.deleteUser),
	catchAsync(adminController.deleteUser)
);
router.post(
	'/blockUser',
	auth('manageUsers'),
	catchAsync(checkAdmin),
	validate(adminValidation.blockUser),
	catchAsync(adminController.blockUser)
);
router.post(
	'/setAccess',
	auth('manageUsers'),
	catchAsync(checkAdmin),
	validate(adminValidation.setAccess),
	catchAsync(adminController.setAccess)
);
router.post(
	'/messageHistory',
	// auth('manageUsers'), // commented this line for easy access from postman
	validate(adminValidation.messageHistory),
	catchAsync(adminController.messageHistory)
);

module.exports = router;
