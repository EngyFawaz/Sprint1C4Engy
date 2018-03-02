var mongoose = require('mongoose'),
  moment = require('moment'),
  Validations = require('../utils/Validations'),
  Engy = mongoose.model('Engy');

module.exports.getEngy = function(req, res, next) {
  if (!Validations.isObjectId(req.params.EngyId)) {
    return res.status(422).json({
      err: null,
      msg: 'EngyId parameter must be a valid ObjectId.',
      data: null
    });
  }
  Engy.findById(req.params.EngyId).exec(function(err, Engy) {
    if (err) {
      return next(err);
    }
    if (!Engy) {
      return res
        .status(404)
        .json({ err: null, msg: 'Engy not found.', data: null });
    }
    res.status(200).json({
      err: null,
      msg: 'Engy retrieved successfully.',
      data: Engy
    });
  });
};

module.exports.getEngy = function(req, res, next) {
  Engy.find({}).exec(function(err, Engy) {
    if (err) {
      return next(err);
    }
    res.status(200).json({
      err: null,
      msg: 'Engys retrieved successfully.',
      data: Engy
    });
  });
};

module.exports.getEngyBelowPrice = function(req, res, next) {
  if (!Validations.isNumber(req.params.price)) {
    return res.status(422).json({
      err: null,
      msg: 'price parameter must be a valid number.',
      data: null
    });
  }
  Engy.find({
    price: {
      $lt: req.params.price
    }
  }).exec(function(err, Engy) {
    if (err) {
      return next(err);
    }
    res.status(200).json({
      err: null,
      msg:
        'Engys priced below ' +
        req.params.price +
        ' retrieved successfully.',
      data: Engy
    });
  });
};

module.exports.createEngy = function(req, res, next) {
  var valid =
    req.body.name &&
    Validations.isString(req.body.name) &&
    req.body.price &&
    Validations.isNumber(req.body.price);
    req.body.component &&
    Validations.isString(req.body.component);
    req.body.seller &&
    Validations.isString(req.body.seller);
    
  if (!valid) {
    return res.status(422).json({
      err: null,
      msg: 'name(String) and price(Number) are required fields.',
      data: null
    });
  }
  // Security Check
  delete req.body.createdAt;
  delete req.body.updatedAt;

  Engy.create(req.body, function(err, Engy) {
    if (err) {
      return next(err);
    }
    res.status(201).json({
      err: null,
      msg: 'Engy was created successfully.',
      data: Engy
    });
  });
};

module.exports.updateEngy = function(req, res, next) {
  if (!Validations.isObjectId(req.params.EngyId)) {
    return res.status(422).json({
      err: null,
      msg: 'EngyId parameter must be a valid ObjectId.',
      data: null
    });
  }
  var valid =
    req.body.name &&
    Validations.isString(req.body.name) &&
    req.body.price &&
    Validations.isNumber(req.body.price);
  if (!valid) {
    return res.status(422).json({
      err: null,
      msg: 'name(String) and price(Number) are required fields.',
      data: null
    });
  }
  // Security Check
  delete req.body.createdAt;
  req.body.updatedAt = moment().toDate();

  Engy.findByIdAndUpdate(
    req.params.EngyId,
    {
      $set: req.body
    },
    { new: true }
  ).exec(function(err, updatedEngy) {
    if (err) {
      return next(err);
    }
    if (!updatedEngy) {
      return res
        .status(404)
        .json({ err: null, msg: 'Engy not found.', data: null });
    }
    res.status(200).json({
      err: null,
      msg: 'Engy was updated successfully.',
      data: updatedEngy
    });
  });
};

module.exports.deleteEngy = function(req, res, next) {
  if (!Validations.isObjectId(req.params.EngyId)) {
    return res.status(422).json({
      err: null,
      msg: 'EngyId parameter must be a valid ObjectId.',
      data: null
    });
  }
  Engy.findByIdAndRemove(req.params.EngyId).exec(function(
    err,
    deletedEngy
  ) {
    if (err) {
      return next(err);
    }
    if (!deletedEngy) {
      return res
        .status(404)
        .json({ err: null, msg: 'Engy not found.', data: null });
    }
    res.status(200).json({
      err: null,
      msg: 'Engy was deleted successfully.',
      data: deletedEngy
    });
  });
};
