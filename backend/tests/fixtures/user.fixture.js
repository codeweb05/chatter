'use strict';
const mongoose = require('mongoose');
const faker = require('faker');
const { User, Org } = require('../../src/models');

const userOneEmail = faker.internet.email().toLowerCase();
const userOneDomain = userOneEmail.split('@')[1].split('.')[0];
const userOne = {
	_id: mongoose.Types.ObjectId(),
	name: faker.name.findName(),
	email: userOneEmail,
	domain: userOneDomain
};

const adminOneEmail = faker.internet.email().toLowerCase();
const adminOneDomain = adminOneEmail.split('@')[1].split('.')[0];

const adminOne = {
	_id: mongoose.Types.ObjectId(),
	name: faker.name.findName(),
	email: adminOneEmail,
	domain: adminOneDomain,
	role: 'admin'
};

const orgEmail = faker.internet.email().toLowerCase();
const orgDomain = orgEmail.split('@')[1].split('.')[0];

const orgOne = {
	_id: mongoose.Types.ObjectId(),
	user: mongoose.Types.ObjectId(),
	name: faker.name.findName(),
	orgName: faker.name.findName(),
	email: orgEmail,
	domain: orgDomain,
	role: 'orgAdmin'
};

const insertUsers = async (users) => {
	await User.insertMany(users);
};
const insertAdmins = async (users) => {
	await User.insertMany(users);
};
const insertOrgs = async (orgs) => {
	await Org.insertMany(orgs);
};

module.exports = {
	userOne,
	adminOne,
	orgOne,
	insertUsers,
	insertAdmins,
	insertOrgs
};
