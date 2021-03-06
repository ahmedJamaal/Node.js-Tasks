"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.crudControllers = exports.filterquesBylgs = exports.getManywithout = exports.pullLecUnit = exports.pushLessonUnit = exports.pushExamUnits = exports.pushLecUnit = exports.pushUnit = exports.pushClassESubject = exports.pushClassSubjectTeacher = exports.pushClassSubject = exports.pushClassTeacher = exports.getClasses = exports.pushClassteachersubject = exports.pushClass = exports.pushGrade = exports.pushLevel = exports.pushLevelandgrade = exports.getProductByOwner = exports.productNew = exports.getProductByVariantColor = exports.getProductByVariant = exports.getProductByBrand = exports.getGradeByLevel = exports.updateHome = exports.filterByRole = exports.filterProductBySubCategory = exports.filterProductByCategory = exports.filterGradeByLevel = exports.filterLectureBySubject = exports.filterByStatus = exports.filterBySubCategory = exports.filterMediaByCategory = exports.filterBlogByCategory = exports.filterByGrade = exports.filterBySubject = exports.filterByLevels = exports.filterByLevel = exports.filterByCategory = exports.filterByLeader = exports.removeOne = exports.updateOne = exports.createOne = exports.getCount = exports.getMany = exports.getManyPaging = exports.getOne = void 0;

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

const asyncHandler = require('../middleware/async');

const getOne = model => async (req, res) => {
  try {
    const doc = await model.findOne({
      _id: req.params.id
    }).lean().exec();

    if (!doc) {
      return res.status(400).send({
        message: 'No Data Found.'
      });
    }

    res.status(200).json({
      data: doc
    });
  } catch (e) {
    console.error(e);
    res.status(400).send({
      message: e.message
    });
  }
};

exports.getOne = getOne;

const getManyPaging = model => asyncHandler(async (req, res, next) => {
  res.status(200).json(res.advancedResults);
});

exports.getManyPaging = getManyPaging;

const getMany = model => async (req, res) => {
  try {
    const docs = await model.find({}) //  .lean()
    // .exec()
    .limit(100); // .pretty()

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

exports.getMany = getMany;

const getCount = model => async (req, res) => {
  try {
    const docs = await model.find({}).count();
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

exports.getCount = getCount;

const createOne = model => async (req, res) => {
  // const createdBy = req.user._id;
  try {
    const doc = await model.create(_objectSpread({}, req.body));
    res.status(201).json({
      data: doc
    });
  } catch (e) {
    console.error(e);
    res.status(400).send({
      message: e.message
    });
  }
};

exports.createOne = createOne;

const updateOne = model => async (req, res) => {
  try {
    const updatedDoc = await model.findOneAndUpdate({
      //  createdBy: req.user._id,
      _id: req.params.id
    }, req.body, {
      new: true
    }).lean().exec();

    if (!updatedDoc) {
      return res.status(400).send({
        message: 'No Data Found.'
      });
    }

    res.status(200).json({
      data: updatedDoc
    });
  } catch (e) {
    console.error(e);
    res.status(400).send({
      message: e.message
    });
  }
};

exports.updateOne = updateOne;

const removeOne = model => async (req, res) => {
  try {
    const removed = await model.findOneAndRemove({
      //createdBy: req.user._id,
      _id: req.params.id
    });

    if (!removed) {
      return res.status(400).send({
        message: 'No Data Found.'
      });
    }

    return res.status(200).json({
      data: removed
    });
  } catch (e) {
    console.error(e);
    res.status(400).send({
      message: e.message
    });
  }
};

exports.removeOne = removeOne;

const filterByLeader = model => async (req, res) => {
  try {
    const doc = await model.find({
      leader_id: req.params.id
    }).lean().exec();

    if (!doc) {
      res.status(400).send({
        message: 'No Data Found.'
      });
    }

    res.status(200).json({
      data: doc
    });
  } catch (e) {
    console.error(e);
    res.status(400).send({
      message: e.message
    });
  }
};

exports.filterByLeader = filterByLeader;

const filterByCategory = model => async (req, res) => {
  try {
    const doc = await model.find({
      category_id: req.params.id
    }).lean().exec();

    if (!doc) {
      res.status(400).send({
        "message": "No Data Found."
      });
    }

    res.status(200).json({
      data: doc
    });
  } catch (e) {
    console.error(e);
    res.status(400).send({
      "message": e.message
    });
  }
};

exports.filterByCategory = filterByCategory;

const filterByLevel = model => async (req, res) => {
  try {
    const doc = await model.find({
      lavel_id: req.params.id
    }).lean().exec();

    if (!doc) {
      res.status(400).send({
        "message": "No Data Found."
      });
    }

    res.status(200).json({
      data: doc
    });
  } catch (e) {
    console.error(e);
    res.status(400).send({
      "message": e.message
    });
  }
};

exports.filterByLevel = filterByLevel;

const filterByLevels = model => async (req, res) => {
  try {
    const doc = await model.find({
      lavels_id: ObjectId(req.params.id)
    }).lean().exec();

    if (!doc) {
      res.status(400).send({
        "message": "No Data Found."
      });
    }

    res.status(200).json({
      data: doc
    });
  } catch (e) {
    console.error(e);
    res.status(400).send({
      "message": e.message
    });
  }
};

exports.filterByLevels = filterByLevels;

const filterBySubject = model => async (req, res) => {
  try {
    const doc = await model.find({
      subject_id: req.params.id
    }).lean().exec();

    if (!doc) {
      res.status(400).send({
        "message": "No Data Found."
      });
    }

    res.status(200).json({
      data: doc
    });
  } catch (e) {
    console.error(e);
    res.status(400).send({
      "message": e.message
    });
  }
};

exports.filterBySubject = filterBySubject;

const filterByGrade = model => async (req, res) => {
  try {
    const doc = await model.find({
      grade_id: req.params.id
    }).lean().exec();

    if (!doc) {
      res.status(400).send({
        "message": "No Data Found."
      });
    }

    res.status(200).json({
      data: doc
    });
  } catch (e) {
    console.error(e);
    res.status(400).send({
      "message": e.message
    });
  }
};

exports.filterByGrade = filterByGrade;

const filterBlogByCategory = model => async (req, res) => {
  try {
    const doc = await model.find({
      category_id: req.params.categoryId
    }).lean().exec();

    if (!doc) {
      res.status(400).send({
        "message": "No Data Found."
      });
    }

    res.status(200).json({
      data: doc
    });
  } catch (e) {
    console.error(e);
    res.status(400).send({
      "message": e.message
    });
  }
};

exports.filterBlogByCategory = filterBlogByCategory;

const filterMediaByCategory = model => async (req, res) => {
  try {
    const doc = await model.find({
      category_id: req.params.categoryId
    }).lean().exec();

    if (!doc) {
      res.status(400).send({
        "message": "No Data Found."
      });
    }

    res.status(200).json({
      data: doc
    });
  } catch (e) {
    console.error(e);
    res.status(400).send({
      "message": e.message
    });
  }
};

exports.filterMediaByCategory = filterMediaByCategory;

const filterBySubCategory = model => async (req, res) => {
  try {
    const doc = await model.find({
      subCategory_id: req.params.id
    }).lean().exec();

    if (!doc) {
      res.status(400).send({
        "message": "No Data Found."
      });
    }

    res.status(200).json({
      data: doc
    });
  } catch (e) {
    console.error(e);
    res.status(400).send({
      "message": e.message
    });
  }
};

exports.filterBySubCategory = filterBySubCategory;

const filterByStatus = model => async (req, res) => {
  try {
    const doc = await model.find({
      status: 'Disactive'
    }).lean().exec();

    if (!doc) {
      res.status(400).send({
        "message": "No Data Found."
      });
    }

    res.status(200).json({
      data: doc
    });
  } catch (e) {
    console.error(e);
    res.status(400).send({
      "message": e.message
    });
  }
};

exports.filterByStatus = filterByStatus;

const filterLectureBySubject = model => async (req, res) => {
  try {
    const doc = await model.find({
      subject_id: req.params.subjectId
    }).lean().exec();

    if (!doc) {
      res.status(400).send({
        "message": "No Data Found."
      });
    }

    res.status(200).json({
      data: doc
    });
  } catch (e) {
    console.error(e);
    res.status(400).send({
      "message": e.message
    });
  }
};

exports.filterLectureBySubject = filterLectureBySubject;

const filterGradeByLevel = model => async (req, res) => {
  try {
    const doc = await model.find({
      lavel_id: req.params.leveld
    }).lean().exec();

    if (!doc) {
      res.status(400).send({
        "message": "No Data Found."
      });
    }

    res.status(200).json({
      data: doc
    });
  } catch (e) {
    console.error(e);
    res.status(400).send({
      "message": e.message
    });
  }
};

exports.filterGradeByLevel = filterGradeByLevel;

const filterProductByCategory = model => async (req, res) => {
  try {
    const doc = await model.find({
      category_id: req.params.categoryId
    }).lean().exec();

    if (!doc) {
      res.status(400).send({
        "message": "No Data Found."
      });
    }

    res.status(200).json({
      data: doc
    });
  } catch (e) {
    console.error(e);
    res.status(400).send({
      "message": e.message
    });
  }
};

exports.filterProductByCategory = filterProductByCategory;

const filterProductBySubCategory = model => async (req, res) => {
  try {
    const doc = await model.find({
      subCategory_id: req.params.subCategoryId
    }).lean().exec();

    if (!doc) {
      res.status(400).send({
        "message": "No Data Found."
      });
    }

    res.status(200).json({
      data: doc
    });
  } catch (e) {
    console.error(e);
    res.status(400).send({
      "message": e.message
    });
  }
};

exports.filterProductBySubCategory = filterProductBySubCategory;

const filterByRole = model => async (req, res) => {
  try {
    const doc = await model.find({
      role_id: req.params.id
    }).lean().exec();

    if (!doc) {
      res.status(400).send({
        "message": "No Data Found."
      });
    }

    res.status(200).json({
      data: doc
    });
  } catch (e) {
    console.error(e);
    res.status(400).send({
      "message": e.message
    });
  }
};

exports.filterByRole = filterByRole;

const updateHome = model => async (req, res) => {
  try {
    const updatedDoc = await model.findOneAndUpdate({
      _id: '5e986669e19db87500a7771e'
    }, req.body, {
      new: true
    }).lean().exec();

    if (!updatedDoc) {
      return res.status(400).send({
        "message": "No Data Found."
      });
    }

    res.status(200).json({
      data: updatedDoc
    });
  } catch (e) {
    console.error(e);
    res.status(400).send({
      "message": e.message
    });
  }
};

exports.updateHome = updateHome;

const getGradeByLevel = model => async (req, res) => {
  try {
    const doc = await model.find({
      level: req.params.title
    }).lean().exec();

    if (!doc) {
      res.status(400).send({
        "message": "No Data Found."
      });
    }

    res.status(200).json({
      data: doc
    });
  } catch (e) {
    console.error(e);
    res.status(400).send({
      "message": e.message
    });
  }
};

exports.getGradeByLevel = getGradeByLevel;

const getProductByBrand = model => async (req, res) => {
  try {
    const doc = await model.find({
      brand: req.params.name
    }).lean().exec();

    if (!doc) {
      res.status(400).send({
        "message": "No Data Found."
      });
    }

    res.status(200).json({
      data: doc
    });
  } catch (e) {
    console.error(e);
    res.status(400).send({
      "message": e.message
    });
  }
};

exports.getProductByBrand = getProductByBrand;

const getProductByVariant = model => async (req, res) => {
  try {
    const doc = await model.find({
      'variants.size': {
        $in: [req.params.size]
      }
    }).lean().exec();

    if (!doc) {
      res.status(400).send({
        "message": "No Data Found."
      });
    }

    res.status(200).json({
      data: doc
    });
  } catch (e) {
    console.error(e);
    res.status(400).send({
      "message": e.message
    });
  }
};

exports.getProductByVariant = getProductByVariant;

const getProductByVariantColor = model => async (req, res) => {
  try {
    const doc = await model.find({
      'variants.color': {
        $in: [req.params.color]
      }
    }).lean().exec();

    if (!doc) {
      res.status(400).send({
        "message": "No Data Found."
      });
    }

    res.status(200).json({
      data: doc
    });
  } catch (e) {
    console.error(e);
    res.status(400).send({
      "message": e.message
    });
  }
};

exports.getProductByVariantColor = getProductByVariantColor;

const productNew = model => async (req, res) => {
  try {
    const doc = await model.find({
      checknew: true
    }).lean().exec();

    if (!doc) {
      res.status(400).send({
        "message": "No Data Found."
      });
    }

    res.status(200).json({
      data: doc
    });
  } catch (e) {
    console.error(e);
    res.status(400).send({
      "message": e.message
    });
  }
};

exports.productNew = productNew;

const getProductByOwner = model => async (req, res) => {
  try {
    const doc = await model.find({
      client: req.params.id
    }).lean().exec();

    if (!doc) {
      res.status(400).send({
        "message": "No Data Found."
      });
    }

    res.status(200).json({
      data: doc
    });
  } catch (e) {
    console.error(e);
    res.status(400).send({
      "message": e.message
    });
  }
};

exports.getProductByOwner = getProductByOwner;

const pushLevelandgrade = model => async (req, res) => {
  try {
    const pushLevels = await model.findOneAndUpdate({
      "_id": req.params.id
    }, {
      "$push": {
        "levels": {
          "_id": req.body.levels,
          "grades": req.body.grades
        }
      }
    });

    if (!pushLevels) {
      return res.status(400).send({
        message: 'No Data Found.'
      });
    }

    res.status(200).json({
      data: pushLevels
    });
  } catch (e) {
    console.error(e);
    res.status(400).send({
      message: e.message
    });
  }
};

exports.pushLevelandgrade = pushLevelandgrade;

const pushLevel = model => async (req, res) => {
  try {
    const pushLevels = await model.findOneAndUpdate({
      "_id": req.params.id
    }, {
      "$push": {
        "levels": {
          "_id": req.body.levels,
          "grades": req.body.grades
        }
      }
    });

    if (!pushLevels) {
      return res.status(400).send({
        message: 'No Data Found.'
      });
    }

    res.status(200).json({
      data: pushLevels
    });
  } catch (e) {
    console.error(e);
    res.status(400).send({
      message: e.message
    });
  }
};

exports.pushLevel = pushLevel;

const pushGrade = model => async (req, res) => {
  try {
    const pushGrades = await model.updateOne({
      "_id": req.params.id,
      "levels._id": req.body.level
    }, {
      "$push": {
        "levels.$.grades": {
          _id: req.body.grades
        }
      }
    });
    console.log("sss");

    if (!pushGrades) {
      return res.status(400).send({
        message: 'No Data Found.'
      });
    }

    res.status(200).json({
      data: pushGrades
    });
  } catch (e) {
    console.error(e);
    res.status(400).send({
      message: e.message
    });
  }
};

exports.pushGrade = pushGrade;

const pushClass = model => async (req, res) => {
  try {
    const pushClasses = await model.findOneAndUpdate({
      "_id": req.params.id,
      "levels._id": req.body.levelId,
      "levels.grades._id": req.body.gradeId
    }, {
      "$push": {
        "levels.$.grades.$[i].classes": {
          "title": req.body.class_info,
          "classSubjects": req.body.subject,
          "classTeachers": req.body.teacher,
          "classStudents": req.body.student
        }
      }
    }, {
      returnOriginal: false,
      arrayFilters: [{
        "i._id": req.body.gradeId
      }]
    }).lean().exec();

    if (!pushClasses) {
      return res.status(400).send({
        message: 'No Data Found.'
      });
    }

    res.status(200).json({
      data: pushClasses
    });
  } catch (e) {
    console.error(e);
    res.status(400).send({
      message: e.message
    });
  }
};

exports.pushClass = pushClass;

const pushClassteachersubject = model => async (req, res) => {
  try {
    const pushClasses = await model.findOneAndUpdate({
      "_id": req.params.id,
      "levels._id": req.body.levelId,
      "levels.grades._id": req.body.gradeId
    }, {
      "$push": {
        "levels.$.grades.$[i].classes": {
          title: req.body.class_info
        },
        "levels.$.grades.$[i].classes": {
          classTeachers: req.body.teacher
        },
        "levels.$.grades.$[i].classes": {
          classSubjects: req.body.subject
        }
      }
    }, {
      arrayFilters: [{
        "i._id": req.body.gradeId
      }]
    });
    console.log("sss");

    if (!pushClasses) {
      return res.status(400).send({
        message: 'No Data Found.'
      });
    }

    res.status(200).json({
      data: pushClasses
    });
  } catch (e) {
    console.error(e);
    res.status(400).send({
      message: e.message
    });
  }
};

exports.pushClassteachersubject = pushClassteachersubject;

const getClasses = model => async (req, res) => {
  try {
    const getClasses = await model.findOne({
      "_id": req.params.id,
      "levels._id": req.body.levelId,
      "levels.grades._id": req.body.gradeId
    });
    console.log("sss");

    if (!getClasses) {
      return res.status(400).send({
        message: 'No Data Found.'
      });
    }

    res.status(200).json({
      data: getClasses
    });
  } catch (e) {
    console.error(e);
    res.status(400).send({
      message: e.message
    });
  }
};

exports.getClasses = getClasses;

const pushClassTeacher = model => async (req, res) => {
  try {
    /*     const pushClassTeachers = await model.findOne( {_id: req.params.id, 
          
        'levels._id': req.params.levelId , 'levels.grades._id':req.params.gradeId ,
        'levels.grades.classes._id':req.params.classId});
        // pushLevels.levels_id.push({_id: req.body.levels_id});
        pushClassTeachers.classTeachers.push(req.body.class_teacher);
        pushClassTeachers.save(); */
    const pushClassTeachers = await model.updateOne({
      "_id": req.params.id,
      "levels._id": req.body.levelId,
      "levels.grades._id": req.body.gradeId,
      "levels.grades.classes._id": req.body.classId
    }, {
      "$push": {
        "levels.$.grades.$[j].classes.$[i].classTeachers": {
          _id: req.body.class_teacher
        }
      }
    }, {
      arrayFilters: [{
        "i._id": req.body.classId
      }, {
        "j._id": req.body.gradeId
      }]
    });
    console.log("sss");

    if (!pushClassTeachers) {
      return res.status(400).send({
        message: 'No Data Found.'
      });
    }

    res.status(200).json({
      data: pushClassTeachers
    });
  } catch (e) {
    console.error(e);
    res.status(400).send({
      message: e.message
    });
  }
};

exports.pushClassTeacher = pushClassTeacher;

const pushClassSubject = model => async (req, res) => {
  try {
    const pushClassSubjects = await model.updateOne({
      "_id": req.params.id,
      "levels._id": req.body.levelId,
      "levels.grades._id": req.body.gradeId,
      "levels.grades.classes._id": req.body.classId
    }, {
      "$push": {
        "levels.$.grades.$[j].classes.$[i].classSubjects": {
          _id: req.body.class_subjects
        }
      }
    }, {
      arrayFilters: [{
        "i._id": req.body.classId
      }, {
        "j._id": req.body.gradeId
      }]
    });
    console.log("sss");

    if (!pushClassSubjects) {
      return res.status(400).send({
        message: 'No Data Found.'
      });
    }

    res.status(200).json({
      data: pushClassSubjects
    });
  } catch (e) {
    console.error(e);
    res.status(400).send({
      message: e.message
    });
  }
};

exports.pushClassSubject = pushClassSubject;

const pushClassSubjectTeacher = model => async (req, res) => {
  try {
    const pushClassSubjectTeachers = await model.updateOne({
      "_id": req.params.id,
      "levels._id": req.body.levelId,
      "levels.grades._id": req.body.gradeId,
      "levels.grades.classes._id": req.body.classId,
      "levels.grades.classes.classSubjects._id": req.body.subjectId
    }, {
      "$push": {
        "levels.$.grades.$[j].classes.$[i].classSubjects.$[k].classSubjTeachers": {
          _id: req.body.class_subjteacher
        }
      }
    }, {
      arrayFilters: [{
        "i._id": req.body.classId
      }, {
        "j._id": req.body.gradeId
      }, {
        "k._id": req.body.subjectId
      }]
    });
    console.log("sss");

    if (!pushClassSubjectTeachers) {
      return res.status(400).send({
        message: 'No Data Found.'
      });
    }

    res.status(200).json({
      data: pushClassSubjectTeachers
    });
  } catch (e) {
    console.error(e);
    res.status(400).send({
      message: e.message
    });
  }
};

exports.pushClassSubjectTeacher = pushClassSubjectTeacher;

const pushClassESubject = model => async (req, res) => {
  try {
    const pushClassESubjects = await model.updateOne({
      "_id": req.params.id,
      "levels._id": req.body.levelId,
      "levels.grades._id": req.body.gradeId,
      "levels.grades.classes._id": req.body.classId,
      "levels.grades.classes.classSubjects._id": req.body.subjectId
    }, {
      "$push": {
        "levels.$.grades.$[j].classes.$[i].classSubjects.$[k].classEsubject": {
          _id: req.body.esubjects
        }
      }
    }, {
      arrayFilters: [{
        "i._id": req.body.classId
      }, {
        "j._id": req.body.gradeId
      }, {
        "k._id": req.body.subjectId
      }]
    });
    console.log("sss");

    if (!pushClassESubjects) {
      return res.status(400).send({
        message: 'No Data Found.'
      });
    }

    res.status(200).json({
      data: pushClassESubjects
    });
  } catch (e) {
    console.error(e);
    res.status(400).send({
      message: e.message
    });
  }
};

exports.pushClassESubject = pushClassESubject;

const pushUnit = model => async (req, res) => {
  try {
    const pushUnits = await model.updateOne({
      _id: req.params.id
    }, {
      "$push": {
        "unit": {
          title: req.body.title,
          startdate: req.body.startdate,
          enddate: req.body.enddate,
          descripe: req.body.unitdesc
        }
      }
    });
    console.log("sss");

    if (!pushUnits) {
      return res.status(400).send({
        message: 'No Data Found.'
      });
    }

    res.status(200).json({
      data: pushUnits
    });
  } catch (e) {
    console.error(e);
    res.status(400).send({
      message: e.message
    });
  }
};

exports.pushUnit = pushUnit;

const pushLecUnit = model => async (req, res) => {
  try {
    const pushLecUnits = await model.updateOne({
      "_id": req.params.id,
      "unit._id": req.body.unitId,
      "unit.lessons._id": req.body.lessonId
    }, {
      "$push": {
        "unit.$.lessons.$[i].lecturesandexams": req.body.lecId
      }
    }, {
      arrayFilters: [{
        "i._id": req.body.lessonId
      }]
    });
    console.log("sss");

    if (!pushLecUnits) {
      return res.status(400).send({
        message: 'No Data Found.'
      });
    }

    res.status(200).json({
      data: pushLecUnits
    });
  } catch (e) {
    console.error(e);
    res.status(400).send({
      message: e.message
    });
  }
};

exports.pushLecUnit = pushLecUnit;

const pushExamUnits = model => async (req, res) => {
  try {
    const pushExamUnit = await model.updateOne({
      "_id": req.params.id,
      "unit._id": req.body.unitId,
      "unit.lessons._id": req.body.lessonId
    }, {
      "$push": {
        "unit.$.lessons.$[i].exams": req.body.examId
      }
    }, {
      arrayFilters: [{
        "i._id": req.body.lessonId
      }]
    });
    console.log("sss");

    if (!pushExamUnit) {
      return res.status(400).send({
        message: 'No Data Found.'
      });
    }

    res.status(200).json({
      data: pushExamUnit
    });
  } catch (e) {
    console.error(e);
    res.status(400).send({
      message: e.message
    });
  }
};
/* export const pushLecUnit = model => async (req, res) => {
  try {
    const pushLecUnits = await model.updateOne(
      { "_id": req.params.id , "unit._id":req.body.unitId ,"lessons._id":req.body.lessonId},

      { "$push": 
          { "unit.$.lessons.$[i].lectures":{_id: req.body.lecId} 
         
          }}, {
            arrayFilters: [
              {"i._id": req.body.lessonId}
          ]
          }
          
      )

console.log("sss");

    if (!pushLecUnits) {
      return res.status(400).send({ message: 'No Data Found.' });
    }

    res.status(200).json({
      data: pushLecUnits
    });
  } catch (e) {
    console.error(e);
    res.status(400).send({ message: e.message });
  }
}; */


exports.pushExamUnits = pushExamUnits;

const pushLessonUnit = model => async (req, res) => {
  try {
    const pushLessonUnits = await model.updateOne({
      "_id": req.params.id,
      "unit._id": req.body.unitId
    }, {
      "$push": {
        "unit.$.lessons": {
          title: req.body.lesson
        }
      }
    });
    console.log("sss");

    if (!pushLessonUnits) {
      return res.status(400).send({
        message: 'No Data Found.'
      });
    }

    res.status(200).json({
      data: pushLessonUnits
    });
  } catch (e) {
    console.error(e);
    res.status(400).send({
      message: e.message
    });
  }
};

exports.pushLessonUnit = pushLessonUnit;

const pullLecUnit = model => async (req, res) => {
  try {
    const pullLecUnits = await model.updateOne({
      "_id": req.params.id,
      "unit._id": req.body.unitId
    }, {
      "$pull": {
        "unit.$.lectures": ObjectId("5f00df9c118bb0774d782b5a")
      }
    });
    console.log("sss");

    if (!pullLecUnits) {
      return res.status(400).send({
        message: 'No Data Found.'
      });
    }

    res.status(200).json({
      data: pullLecUnits
    });
  } catch (e) {
    console.error(e);
    res.status(400).send({
      message: e.message
    });
  }
};

exports.pullLecUnit = pullLecUnit;

const getManywithout = model => async (req, res) => {
  try {
    const doc = await model.find({
      '_id': {
        $in: [req.query.student]
      }
    }).lean().exec();

    if (!doc) {
      res.status(400).send({
        "message": "No Data Found."
      });
    }

    res.status(200).json({
      data: doc
    });
  } catch (e) {
    console.error(e);
    res.status(400).send({
      "message": e.message
    });
  }
};

exports.getManywithout = getManywithout;

const filterquesBylgs = model => async (req, res) => {
  try {
    const doc = await model.find({
      level_id: req.params.levelId,
      grade_id: req.params.gradeId,
      subject_id: req.params.subjectId
    }).lean().exec();

    if (!doc) {
      res.status(400).send({
        "message": "No Data Found."
      });
    }

    res.status(200).json({
      data: doc
    });
  } catch (e) {
    console.error(e);
    res.status(400).send({
      "message": e.message
    });
  }
};

exports.filterquesBylgs = filterquesBylgs;

const crudControllers = model => ({
  getManywithout: getManywithout(model),
  pushClassESubject: pushClassESubject(model),
  pushClassSubjectTeacher: pushClassSubjectTeacher(model),
  pushClassSubject: pushClassSubject(model),
  pushClassTeacher: pushClassTeacher(model),
  pushUnit: pushUnit(model),
  pushLecUnit: pushLecUnit(model),
  pushLessonUnit: pushLessonUnit(model),
  pushExamUnits: pushExamUnits(model),
  pullLecUnit: pullLecUnit(model),
  pushClass: pushClass(model),
  pushGrade: pushGrade(model),
  pushLevel: pushLevel(model),
  getClasses: getClasses(model),
  removeOne: removeOne(model),
  updateOne: updateOne(model),
  getMany: getMany(model),
  getAssets: getManyPaging(model),
  getOne: getOne(model),
  createOne: createOne(model),
  filterByLeader: filterByLeader(model),
  getCount: getCount(model),
  filterByCategory: filterByCategory(model),
  filterByLevel: filterByLevel(model),
  filterByLevels: filterByLevels(model),
  filterBySubject: filterBySubject(model),
  filterByGrade: filterByGrade(model),
  filterBySubCategory: filterBySubCategory(model),
  filterByStatus: filterByStatus(model),
  filterProductByCategory: filterProductByCategory(model),
  filterGradeByLevel: filterGradeByLevel(model),
  filterLectureBySubject: filterLectureBySubject(model),
  filterProductBySubCategory: filterProductBySubCategory(model),
  filterByRole: filterByRole(model),
  updateHome: updateHome(model),
  filterBlogByCategory: filterBlogByCategory(model),
  filterMediaByCategory: filterMediaByCategory(model),
  getProductByBrand: getProductByBrand(model),
  getGradeByLevel: getGradeByLevel(model),
  getProductByVariant: getProductByVariant(model),
  getProductByVariantColor: getProductByVariantColor(model),
  productNew: productNew(model),
  getProductByOwner: getProductByOwner(model)
});

exports.crudControllers = crudControllers;