'use strict';
const express = require('express');
const passport = require('passport');
const { catchAsync } = require('../utils');
const { validate } = require('../middlewares');
const { authValidation } = require('../validations');
const { authController } = require('../controllers');

const router = express.Router();

router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));
router.get(
	'/google/callback',
	passport.authenticate('google', { session: false }),
	catchAsync(authController.sendUserToken)
);
router.get('/verify', validate(authValidation.verifyEmail), catchAsync(authController.verifyEmail));
router.post('/orgRegister', validate(authValidation.orgRegister), catchAsync(authController.orgRegister));
router.post('/userRegister', validate(authValidation.userRegister), catchAsync(authController.userRegister));

module.exports = router;
