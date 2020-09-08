const express = require('express');
import { signup, signin, protect, logout } from '../utils/auth';
const advancedResults = require('../middleware/advancedResults');
import userRouter from '../resources/user/user.router';
import userViewRouter from '../resources/user/userView.router';
import settingRouter from '../resources/setting/setting.router';
import roleRouter from '../resources/role/role.router';
import permissionRouter from '../resources/permission/permission.router';
import settingViewRouter from '../resources/setting/settingView.router';
import aboutRouter from '../resources/about/about.router';
import aboutViewRouter from '../resources/about/aboutView.router';

import levelRouter from '../resources/level/level.router';
import levelViewRouter from '../resources/level/levelView.router';
import gradeRouter from '../resources/grades/grade.router';
import gradeViewRouter from '../resources/grades/gradeView.router';
import subjectRouter from '../resources/subjects/subject.router';
import subjectViewRouter from '../resources/subjects/subjectView.router';
import teacherRouter from '../resources/teacher/teacher.router';
import teacherViewRouter from '../resources/teacher/teacherView.router';
import lectureRouter from '../resources/lectures/lecture.router';
import lectureViewRouter from '../resources/lectures/lectureView.router';
import yearRouter from '../resources/years/year.router';
import yearViewRouter from '../resources/years/yearView.router';
import studentYearViewRouter from '../resources/years/studentYearView.router';
import esubjectRouter from '../resources/esubjects/esubject.router';
import esubjectViewRouter from '../resources/esubjects/esubjectView.router';
import studentRouter from '../resources/student/student.router';
import studentViewRouter from '../resources/student/studentView.router';
import sclassRouter from '../resources/schoolclasse/sclass.router';
import sclassViewRouter from '../resources/schoolclasse/sclassView.router';
import sclassStudentRouter from '../resources/schoolclasse/sclassStudent.router';
import quizRouter from '../resources/quiz/quiz.router';
import quizViewRouter from '../resources/quiz/quizView.router';
import questionRouter from '../resources/question/question.router';
import suggestRouter from '../resources/question/suggest.router';
import examRouter from '../resources/exam/exam.router';
import logRouter from '../resources/log/log.router';
import instructorRouter from '../resources/instructor/instructor.router';
import instructorCrudRouter from '../resources/instructor/instructorCrud.router';
const error = require('../middleware/error');


module.exports = function(app) {
  app.use(express.json());
  app.post('/signup', signup);
  app.post('/signin', signin);
  app.post('/api/logout', logout);

  app.use('/api', protect);
  app.use('/api', protect);
  app.use('/api/user', userRouter);
  app.use('/user', userViewRouter);

  app.use('/api/setting', settingRouter);
  app.use('/api/role', roleRouter);
  app.use('/api/permission', permissionRouter);
  app.use('/setting', settingViewRouter);

  app.use('/api/about', aboutRouter);
  app.use('/about', aboutViewRouter);

  app.use('/level', levelViewRouter);
  app.use('/api/level', levelRouter);
  app.use('/grades', gradeViewRouter);
  app.use('/api/grades', gradeRouter);
  app.use('/subjects', subjectViewRouter);
  app.use('/api/subjects', subjectRouter);
  app.use('/esubjects', esubjectViewRouter);
  app.use('/api/esubjects', esubjectRouter);
  app.use('/teacher', teacherViewRouter);
  app.use('/api/teacher', teacherRouter);
  app.use('/lecture', lectureViewRouter);
  app.use('/api/lecture', lectureRouter);
  app.use('/year', yearViewRouter);
  app.use('/studentYear', studentYearViewRouter);
  app.use('/api/year', yearRouter);
  app.use('/student', studentViewRouter);
  app.use('/api/student', studentRouter);
  app.use('/sclass', sclassViewRouter);
  app.use('/api/sclass', sclassRouter);
  app.use('/sclassStudent', sclassStudentRouter);
  app.use('/quiz', quizViewRouter);
  app.use('/api/quiz', quizRouter);
  app.use('/question', questionRouter);
  app.use('/suggest', suggestRouter);
  app.use('/exam', examRouter);
  app.use('/log', logRouter);

app.use('/instructor',instructorRouter);
app.use('/api/instructor',instructorCrudRouter);
  app.use(error);
};
