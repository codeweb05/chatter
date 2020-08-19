'use strict';
const roles = ['user', 'admin', 'orgAdmin'];

const roleRights = new Map();
roleRights.set(roles[0], []);
roleRights.set(roles[1], ['manageUsers']);
roleRights.set(roles[2], ['manageUsers']);

module.exports = {
	roles,
	roleRights
};
