'use strict';
const express = require('express');
const authRoute = require('./auth.route');
const userRoute = require('./user.route');
const adminRoute = require('./admin.route');
const router = express.Router();

router.use('/auth', authRoute);
router.use('/user', userRoute);
router.use('/admin', adminRoute);

module.exports = router;
