"use strict";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

const advancedResults = (model, populate) => async (req, res, next) => {
  let query; // Copy req.query

  const reqQuery = _objectSpread({}, req.query); // Fields to exclude


  const removeFields = ['select', 'sort', 'page', 'limit']; // Loop over removeFields and delete them from reqQuery

  removeFields.forEach(param => delete reqQuery[param]); // Create query string

  let queryStr = JSON.stringify(reqQuery); // Create operators ($gt, $gte, etc)

  queryStr = queryStr.replace(/\b(gt|gte|lt|lte|in)\b/g, match => `$${match}`); // Finding resource

  query = model.find(JSON.parse(queryStr)); // Select Fields

  if (req.query.select) {
    const fields = req.query.select.split(',').join(' ');
    query = query.select(fields);
  } // Sort


  if (req.query.sort) {
    const sortBy = req.query.sort.split(',').join(' ');
    query = query.sort(sortBy);
  } else {
    query = query.sort('-createdAt');
  } // Pagination


  const page = parseInt(req.query.page, 10) || 1;
  const limit = parseInt(req.query.limit, 10) || 25;
  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;
  const total = await model.countDocuments();
  query = query.skip(startIndex).limit(limit);

  if (populate) {
    query = query.populate(populate);
  } // Executing query


  const results = await query; // Pagination result

  const pagination = {};

  if (endIndex < total) {
    pagination.next = {
      page: page + 1,
      limit
    };
  }

  if (startIndex > 0) {
    pagination.prev = {
      page: page - 1,
      limit
    };
  }

  res.advancedResults = {
    success: true,
    count: results.length,
    pagination,
    data: results
  };
  next();
};

module.exports = advancedResults;