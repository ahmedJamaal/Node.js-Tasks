import config from '../config';
import { User } from '../resources/user/user.model';
import jwt from 'jsonwebtoken';
const {
  sendWelcomeEmail,
  sendCancelationEmail
} = require('../emails/sendGrid');

export const newToken = user => {
  return jwt.sign({ id: user.id }, config.secrets.jwt, {
    expiresIn: config.secrets.jwtExp
  });
};

export const verifyToken = token =>
  new Promise((resolve, reject) => {
    jwt.verify(token, config.secrets.jwt, (err, payload) => {
      if (err) return reject(err);
      resolve(payload);
    });
  });

export const signup = async (req, res) => {
  if (!req.body.email || !req.body.password || !req.body.name) {
    return res.status(400).send({ message: 'need email and password' });
  }

  try {
    const user = await User.create(req.body);

    sendWelcomeEmail(user.email, user.name);

    const token = newToken(user);
    const id = user.id;
    return res.status(201).send({ token, id, user });
  } catch (e) {
    return res.status(500).send({ message: e.message });
  }
};

export const signin = async (req, res) => {
  if (!req.body.email || !req.body.password) {
    return res.status(400).send({ message: 'need email and password' });
  }

  const invalid = { message: 'Invalid email and password combination' };

  try {
    const user = await User.findOne({ email: req.body.email })
      .select('email password type name photo studentID teacherID')
      .exec();

    if (!user) {
      return res.status(401).send(invalid);
    }

    const match = await user.checkPassword(req.body.password);

    if (!match) {
      return res.status(401).send(invalid);
    }

    const token = newToken(user);
    const id = user.id;
    const studentID = user.studentID;
    return res.status(201).send({ token, id, studentID, user });
  } catch (e) {
    console.error(e);
    res.status(500).send({ message: e.message });
  }
};

export const protect = async (req, res, next) => {
  const bearer = req.headers.authorization;

  if (!bearer || !bearer.startsWith('Bearer ')) {
    return res.status(401).send({ message: 'Not a valid token.' });
  }

  const token = bearer.split('Bearer ')[1].trim();
  let payload;
  try {
    payload = await verifyToken(token);
  } catch (e) {
    return res.status(401).send({ message: 'Not a valid token.' });
  }

  const user = await User.findById(payload.id)
    .select('-password')
    .lean()
    .exec();

  if (!user) {
    return res.status(401).send({ message: 'Not a valid token.' });
  }

  req.user = user;
  next();
};

export const logout = async (req, res, next) => {
  verify(req.body.token)
    .then(decoded => decoded.exp - parseInt(new Date().getTime() / 1000))
    .then(expiration => redis.set(req.body.token, true, 'EX', expiration))
    .send('ok');
};
