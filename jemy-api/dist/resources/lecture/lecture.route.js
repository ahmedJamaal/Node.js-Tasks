"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = require("express");

var _lecture = require("./lecture.model");

var _lecture2 = _interopRequireWildcard(require("./lecture.controller"));

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

const multer = require('multer');

const router = (0, _express.Router)();
/*
var upload = multer({
  storage: storage
});
*/
//get all

router.route('/').get(_lecture2.default.getMany); // update by id 

router.route('/:id').get(_lecture2.default.updateOne); //delete 

router.route('/:id').get(_lecture2.getOne).delete(_lecture2.default.removeOne); // add 
// instrutor

router.route('/').post(_lecture2.default.createOne); // /api/lecture/:id/photo

/*
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
router.route('/').post(upload.single('image'), (req, res) => {
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
*/

var _default = router;
exports.default = _default;