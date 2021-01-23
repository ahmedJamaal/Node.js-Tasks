"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Lecture = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const lectureSchema = new _mongoose.default.Schema({
  name: {
    type: String,
    trim: true,
    required: true
  },
  instructorName: {
    type: String
  },
  courseId: {
    type: String
  },
  lectureInfo: {
    filetype: {
      type: String,
      enum: ['video', 'image', 'pdf', 'slide']
    },
    fileLocation: {
      type: String,
      enum: ['server', 'external'],
      default: 'server'
    },
    time: {
      type: Date
    },
    lectutreUrl: {
      type: String
    }
  }
}, {
  timestamps: true
});

const Lecture = _mongoose.default.model('lecture', lectureSchema);

exports.Lecture = Lecture;