'use strict';
const dotenv = require('dotenv');
const path = require('path');
const Joi = require('@hapi/joi');

dotenv.config({ path: path.join(__dirname, '../../.env') });

const envVarsSchema = Joi.object()
	.keys({
		NODE_ENV: Joi.string().valid('production', 'development', 'test').required(),
		PORT: Joi.number().default(3000),
		MONGODB_URL: Joi.string().required().description('Mongo DB url'),
		GOOGLE_CLIENT_ID: Joi.string().required().description('Google client id'),
		GOOGLE_SECRET: Joi.string().required().description('Google secret'),
		GOOGLE_CALLBACK_URL: Joi.string().required().description('Google callback url'),
		JWT_SECRET: Joi.string().required().description('JWT secret key'),
		APP_ORIGIN: Joi.string().required().description('App origin url'),
		APP_SECRET: Joi.string().required().description('App secret url'),
		JWT_ACCESS_EXPIRATION_MINUTES: Joi.number().default(30).description('minutes after which access tokens expire'),
		JWT_REFRESH_EXPIRATION_DAYS: Joi.number().default(30).description('days after which refresh tokens expire'),
		EMAIL_VERIFICATION_TIMEOUT: Joi.number().default(30).description('time after which verfication email expire'),
		SMTP_HOST: Joi.string().description('server that will send the emails'),
		SMTP_PORT: Joi.number().description('port to connect to the email server'),
		SMTP_USERNAME: Joi.string().description('username for email server'),
		SMTP_PASSWORD: Joi.string().description('password for email server'),
		EMAIL_FROM: Joi.string().description('the from field in the emails sent by the app')
	})
	.unknown();

const { value: envVars, error } = envVarsSchema.prefs({ errors: { label: 'key' } }).validate(process.env);

if (error) {
	throw new Error(`Config validation error: ${error.message}`);
}

module.exports = {
	env: envVars.NODE_ENV,
	port: envVars.PORT,
	mongoose: {
		url: envVars.NODE_ENV === 'test' ? 'mongodb://localhost/chatter' : envVars.MONGODB_URL,
		options: {
			useCreateIndex: true,
			useNewUrlParser: true,
			useUnifiedTopology: true,
			useFindAndModify: false
		}
	},
	google: {
		clientId: envVars.GOOGLE_CLIENT_ID,
		secret: envVars.GOOGLE_SECRET,
		callbackUrl: envVars.GOOGLE_CALLBACK_URL
	},
	whitelist: null,
	jwt: {
		secret: envVars.JWT_SECRET,
		accessExpirationMinutes: envVars.JWT_ACCESS_EXPIRATION_MINUTES,
		refreshExpirationDays: envVars.JWT_REFRESH_EXPIRATION_DAYS,
		resetPasswordExpirationMinutes: 10
	},
	appOrigin: envVars.APP_ORIGIN,
	appSecret: envVars.APP_SECRET,
	emailVericationTimeout: envVars.EMAIL_VERIFICATION_TIMEOUT,
	email: {
		smtp: {
			service: envVars.SMTP_SERVICE,
			port: envVars.SMTP_PORT,
			secure: false,
			auth: {
				user: envVars.SMTP_USERNAME,
				pass: envVars.SMTP_PASSWORD
			}
		},
		from: envVars.EMAIL_FROM
	}
};
