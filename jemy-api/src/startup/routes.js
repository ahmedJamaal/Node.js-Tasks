const express = require('express');
import { signup, signin, protect, logout } from '../utils/auth';
const advancedResults = require('../middleware/advancedResults');
const error = require('../middleware/error');
import lectureRouter from '../resources/lecture/lecture.route';


module.exports = function(app) {
  app.use(express.json());
  app.post('/signup', signup);
  app.post('/signin', signin);
  app.post('/api/logout', logout);


  app.use('/lecture',lectureRouter);
  app.use('/api', protect);


  app.use(error);
};
