"use strict";

var _auth = require("../utils/auth");

var _lecture = _interopRequireDefault(require("../resources/lecture/lecture.route"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const express = require('express');

const advancedResults = require('../middleware/advancedResults');

const error = require('../middleware/error');

module.exports = function (app) {
  app.use(express.json());
  app.post('/signup', _auth.signup);
  app.post('/signin', _auth.signin);
  app.post('/api/logout', _auth.logout);
  app.use('/lecture', _lecture.default);
  app.use('/api', _auth.protect);
  app.use(error);
};