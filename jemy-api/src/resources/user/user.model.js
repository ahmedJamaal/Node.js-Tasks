import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
const geocoder = require('../../utils/geocoder');
const validator = require('validator');

const userSchema = new mongoose.Schema(
  {
    user_id:{
      type: Number,
      auto:true,
      index:true,
      requried:true     
    }, 
    code:String,
    status:{
      type:String,
      enum:['active','disactive'],
      default:'active'
    },
    email: {
      type: String,
      required: [true, 'Please provide your email'],
      unique: true,
      trim: true,
      validate: [validator.isEmail, 'Please provide a valid email']
    },
    password: {
      type: String,
      required: [true, 'Please provide a password']
    },
    passwordConfirm: {
      type: String,
      required: [true, 'Please confirm your password'],
      validate: {
        // This only works on CREATE and SAVE!!!
        validator: function(el) {
          return el === this.password;
        },
        message: 'Passwords are not the same!'
      }
    },
    name: {
      type: String,
      required: [true, 'Please tell us your name!'],
      trim: true
    },
    lastName: {
      type: String,
      required: [true, 'Please tell us your last name!'],
      trim: true
    },

    phone: {
      type: String,

      trim: true,
      maxlength: [20, 'Phone number can not be longer than 20 characters']
    },
    type: {
      enum: ['student', 'admin','teacher','user'],
      default: 'student',
      type: String
    },
    photo: {
      type: String
    },
    role_id:{
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'role'
    },
    studentID:{
      type: mongoose.SchemaTypes.ObjectId
    },
    teacherID:{
      type: mongoose.SchemaTypes.ObjectId
    }
  },
  { timestamps: true }
);

userSchema.pre('save', function(next) {
  if (!this.isModified('password')) {
    return next();
  }

  bcrypt.hash(this.password, 8, (err, hash) => {
    if (err) {
      return next(err);
    }

    this.password = hash;
    next();
  });
  // Delete passwordConfirm field
  this.passwordConfirm = undefined;
});
userSchema.pre('save', function(next) {
  if (!this.isModified('password') || this.isNew) return next();

  this.passwordChangedAt = Date.now() - 1000;
  next();
});

userSchema.methods.checkPassword = function(password) {
  const passwordHash = this.password;
  return new Promise((resolve, reject) => {
    bcrypt.compare(password, passwordHash, (err, same) => {
      if (err) {
        return reject(err);
      }

      resolve(same);
    });
  });
};

export const User = mongoose.model('user', userSchema);
