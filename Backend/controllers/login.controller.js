const Student = require("../models/student.model");
var mongoose = require("mongoose");
var express = require("express");
var router = express.Router();
var passportLocalMongoose = require("passport-local-mongoose");

exports.studentLogin = function(req, res, next) {
  var username = request.body.username;
  var password = request.body.password;
  if (username && password) {
  }
  Student.find()
    .exec()
    .then(docs => {
      console.log(docs);
      res.status(200).json(docs);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ error: err });
    });
};

// exports.students = function(req, res, next) {
//   Student.find()
//     .exec()
//     .then(docs => {
//       console.log(docs);
//       res.status(200).json(docs);
//     })
//     .catch(err => {
//       console.log(err);
//       res.status(500).json({ error: err });
//     });
// };

// exports.studentsPost = function(req, res, next) {
//   const stude = new Student({
//     _id: new mongoose.Types.ObjectId(),
//     firstName: req.body.firstName,
//     lastName: req.body.lastName
//   });
//   stude
//     .save()
//     .then(result => {
//       console.log(result);
//     })
//     .catch(err => console.log(err));
//   res.status(201).json({
//     message: "Hi error",
//     createdStudent: stude
//   });
// };
