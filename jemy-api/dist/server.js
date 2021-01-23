"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.start = exports.app = void 0;

var _express = _interopRequireDefault(require("express"));

var _bodyParser = require("body-parser");

var _morgan = _interopRequireDefault(require("morgan"));

var _config = _interopRequireDefault(require("./config"));

var _cors = _interopRequireDefault(require("cors"));

var _db = require("./utils/db");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const path = require('path');

const dotenv = require('dotenv');

const fileupload = require('express-fileupload');

const rateLimit = require('express-rate-limit');

const helmet = require('helmet');

const mongoSanitize = require('express-mongo-sanitize');

const xss = require('xss-clean');

const hpp = require('hpp');

const cookieParser = require('cookie-parser');

const compression = require('compression');

const winston = require('winston');

const methodOverride = require('method-override');

const SwaggerParser = require('swagger-parser');

const colors = require('colors');

var fs = require('fs');

const app = (0, _express.default)(); // Load env vars

exports.app = app;
dotenv.config({
  path: './config/config.env'
});

require('./startup/logging');

require('./startup/validation')();

app.disable('x-powered-by');
app.enable('trust proxy');
app.use(methodOverride('X-HTTP-Method-Override'));
app.use((0, _cors.default)());
app.options('*', (0, _cors.default)());
app.use(helmet());
app.use((0, _bodyParser.json)());
app.use((0, _bodyParser.urlencoded)({
  extended: true
}));
app.use((0, _morgan.default)('dev'));

require('./startup/routes')(app);

const limiter = rateLimit({
  max: 100,
  windowMs: 60 * 60 * 1000,
  message: 'Too many requests from this IP, please try again in an hour!'
});
app.use('/api', limiter);
app.use(_express.default.json({
  limit: '10kb'
}));
app.use(_express.default.urlencoded({
  extended: true,
  limit: '10kb'
}));
app.use(cookieParser());
app.use(mongoSanitize());
app.use(xss());
app.use(compression());
app.use(fileupload({
  createParentPath: true
})); // Set static folder
//app.use(express.static(path.join(__dirname, 'public')));

app.use(_express.default.static(path.join('assets')));
console.log(path.join('assets'));

const start = async () => {
  try {
    await (0, _db.connect)();
    app.listen(_config.default.port, () => winston.info(`patientCare API on http://localhost:${_config.default.port}/api`));
  } catch (e) {
    console.error(e);
  }
};

exports.start = start;
!fs.existsSync(`./assets/uploads`) && fs.mkdirSync(`./assets/uploads`, {
  recursive: true
});
!fs.existsSync(`./assets/category`) && fs.mkdirSync(`./assets/category`, {
  recursive: true
});
!fs.existsSync(`./assets/product`) && fs.mkdirSync(`./assets/product`, {
  recursive: true
});