const { userService } = require('../services');

module.exports = async (req, res, next) => {
	await userService.checkOrgAdmin(req.body.userId);
	next();
};
