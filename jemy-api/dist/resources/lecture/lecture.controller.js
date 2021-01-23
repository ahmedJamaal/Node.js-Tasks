"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.getOne = void 0;

var _crud = require("../../utils/crud");

var _lecture = require("./lecture.model");

var _mongoose = _interopRequireDefault(require("mongoose"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const getOne = async (req, res) => {
  var id = new _mongoose.default.Types.ObjectId(req.params.id);

  try {
    console.log('sdss');
    const docs = await _lecture.Lecture.findById(id);

    if (!docs) {
      return res.status(400).send({
        message: 'No Data Found.'
      });
    }

    res.status(200).json({
      data: docs
    });
  } catch (e) {
    console.error(e);
    res.status(400).send({
      message: e.message
    });
  }
};

exports.getOne = getOne;

var _default = (0, _crud.crudControllers)(_lecture.Lecture);

exports.default = _default;