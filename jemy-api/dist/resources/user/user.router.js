"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = require("express");

var _user = _interopRequireWildcard(require("./user.controllers"));

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

const multer = require('multer');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './assets/uploads');
  },
  filename: (req, file, cb) => {
    var filetype = '';

    if (file.mimetype === 'image/gif') {
      filetype = 'gif';
    }

    if (file.mimetype === 'image/png') {
      filetype = 'png';
    }

    if (file.mimetype === 'image/jpeg') {
      filetype = 'jpg';
    }

    cb(null, 'image-' + Date.now() + '.' + filetype);
  }
});
var upload = multer({
  storage: storage
});
const router = (0, _express.Router)();
router.get('/me', _user.me);
router.put('/', _user.updateMe); // /api/user

router.route('/').get(_user.default.getMany).post(_user.default.createOne); // /api/user/count

router.route('/count').get(_user.default.getCount); // /api/user/role/:id

router.route('/role/:id').get(_user.default.filterByRole); // /api/user/:id

router.route('/:id').get(_user.default.getOne).put(_user.default.updateOne).delete(_user.default.removeOne); // /api/user/:id/info

router.route('/:id/info').put(_user.me); // /api/user/:id/photo

router.route('/photo').post(upload.single('image'), (req, res) => {
  if (!req.file) {
    res.status(500).end("No File uploaded!");
  }

  if (!req.file.mimetype.startsWith('image')) {
    res.status(400).end("Please upload an image file!");
  }

  res.send({
    status: true,
    message: 'File is uploaded',
    data: {
      name: req.file.filename,
      pathLink: 'uploads/' + req.file.filename,
      path: req.file.path,
      mimetype: req.file.mimetype,
      size: req.file.size
    }
  });
});
var _default = router;
exports.default = _default;