"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.checkEmailandPhone = exports.updateMe = exports.me = void 0;

var _crud = require("../../utils/crud");

var _user = require("./user.model");

const path = require('path');

const ErrorResponse = require('../../utils/errorResponse');

const asyncHandler = require('../../middleware/async');

const me = (req, res) => {
  res.status(200).json({
    data: req.user
  });
};

exports.me = me;

const updateMe = async (req, res) => {
  try {
    const user = await _user.User.findByIdAndUpdate(req.user._id, req.body, {
      new: true
    }).lean().exec();
    res.status(200).json({
      data: user
    });
  } catch (e) {
    console.error(e);
    res.status(400).end();
  }
}; // @desc      Upload photo for user
// @route     PUT /api/user/:id/photo
// @access    Private


exports.updateMe = updateMe;
exports.userPhotoUpload = asyncHandler(async (req, res, next) => {
  const user = await user.findById(req.params.id);

  if (!user) {
    return next(new ErrorResponse(`User not found with id of ${req.params.id}`, 404));
  }

  if (!req.files) {
    return next(new ErrorResponse(`Please upload a file`, 400));
  }

  const file = req.files.file; // Make sure the image is a photo

  if (!file.mimetype.startsWith('image')) {
    return next(new ErrorResponse(`Please upload an image file`, 400));
  } // Check filesize


  if (file.size > process.env.MAX_FILE_UPLOAD) {
    return next(new ErrorResponse(`Please upload an image less than ${process.env.MAX_FILE_UPLOAD}`, 400));
  } // Create custom filename


  file.name = `photo_${user._id}${path.parse(file.name).ext}`;
  file.mv(`${process.env.FILE_UPLOAD_PATH}/${file.name}`, async err => {
    if (err) {
      console.error(err);
      return next(new ErrorResponse(`Problem with file upload`, 500));
    }

    await user.findByIdAndUpdate(req.params.id, {
      photo: file.name
    });
    res.status(200).json({
      success: true,
      data: file.name
    });
  });
});

const checkEmailandPhone = async (req, res) => {
  try {
    const checkPhone = await _user.User.findOne({
      "phone": req.params.phone
    });
    const checkEmail = await _user.User.findOne({
      "email": req.params.email
    });

    if (!checkPhone && !checkEmail) {
      return res.status(200).send(false);
    } else if (checkPhone && !checkEmail) {
      res.status(200).send(true);
    } else if (!checkPhone && checkEmail) {
      res.status(200).send(true);
    }

    res.status(200).send(true);
  } catch (e) {
    console.error(e);
    res.status(400).send({
      "message": e.message
    });
  }
};

exports.checkEmailandPhone = checkEmailandPhone;

var _default = (0, _crud.crudControllers)(_user.User);

exports.default = _default;