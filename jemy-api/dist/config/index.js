"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _lodash = require("lodash");

// const env = 'production';
const env = 'development'; //process.env.NODE_ENV || 'development';

const baseConfig = {
  env,
  isDev: env === 'development',
  isTest: env === 'testing',
  isProd: env == 'production',
  port: 2946,
  secrets: {
    jwt: process.env.JWT_SECRET,
    jwtExp: '100d'
  }
};
let envConfig = {};

switch (env) {
  case 'dev':
  case 'development':
    envConfig = require('./dev').config;
    break;

  case 'prod':
  case 'production':
    envConfig = require('./prod').config;
    break;

  case 'test':
  case 'testing':
    envConfig = require('./testing').config;
    break;

  default:
    envConfig = require('./dev').config;
}

var _default = (0, _lodash.merge)(baseConfig, envConfig);

exports.default = _default;