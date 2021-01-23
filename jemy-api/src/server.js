const path = require('path');
import express from 'express';
import { json, urlencoded } from 'body-parser';
import morgan from 'morgan';
const dotenv = require('dotenv');
const fileupload = require('express-fileupload');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
const hpp = require('hpp');
const cookieParser = require('cookie-parser');
const compression = require('compression');
import config from './config';
import cors from 'cors';
import { connect } from './utils/db';
const winston = require('winston');
const methodOverride = require('method-override');
const SwaggerParser = require('swagger-parser');
const colors = require('colors');
var fs = require('fs');

export const app = express();

// Load env vars
dotenv.config({ path: './config/config.env' });
require('./startup/logging');
require('./startup/validation')();
app.disable('x-powered-by');
app.enable('trust proxy');
app.use(methodOverride('X-HTTP-Method-Override'));

app.use(cors());
app.options('*', cors());
app.use(helmet());
app.use(json());
app.use(urlencoded({ extended: true }));
app.use(morgan('dev'));

require('./startup/routes')(app);

const limiter = rateLimit({
  max: 100,
  windowMs: 60 * 60 * 1000,
  message: 'Too many requests from this IP, please try again in an hour!'
});
app.use('/api', limiter);
app.use(express.json({ limit: '10kb' }));
app.use(express.urlencoded({ extended: true, limit: '10kb' }));
app.use(cookieParser());
app.use(mongoSanitize());
app.use(xss());
app.use(compression());
app.use(
  fileupload({
    createParentPath: true
  })
);
 
// Set static folder
//app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join('assets')));
console.log(path.join('assets'));
export const start = async () => {
  try {
    await connect();

    app.listen(config.port, () =>
      winston.info(`patientCare API on http://localhost:${config.port}/api`)
    );
  } catch (e) {
    console.error(e);
  }
};

!fs.existsSync(`./assets/uploads`) &&
  fs.mkdirSync(`./assets/uploads`, { recursive: true });
!fs.existsSync(`./assets/category`) && fs.mkdirSync(`./assets/category`, { recursive: true });  
!fs.existsSync(`./assets/product`) && fs.mkdirSync(`./assets/product`, { recursive: true });  
