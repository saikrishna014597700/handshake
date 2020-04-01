const Student = require("../models/student.model");
const Job = require("../models/job.model");
var mongoose = require("mongoose");
var express = require("express");
var router = express.Router();
var ObjectId = require("mongodb").ObjectID;
// const kafka = require("../kafka/client");

exports.fetchAllStudents = function(req, res, next) {
  Student.find()
    .exec()
    .then(students => {
      console.log(students);
      res.status(200).json(students);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ error: err });
    });
};
exports.studentSearchComp = function(req, res, next) {
  var searchParam = req.params.searchValue;
  console.log("SearchParam", searchParam);
  Student.find({
    $or: [
      { firstName: { $regex: searchParam, $options: "i" } },
      { collegeName: { $regex: searchParam, $options: "i" } },
      { skillSet: { $regex: searchParam, $options: "i" } }
    ]
  })
    .exec()
    .then(students => {
      console.log(students);
      res.status(200).json(students);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ error: err });
    });
};

exports.getStudent = async function(req, res, next) {
  let filter = req.params;
  // console.log(filter);
  await Student.findById(filter.id, function(err, students) {
    // console.log(students);
    if (err) return res.status(500).json({ error: err });
    return res.status(200).json(students);
  });
};

exports.submitReduxProfileStudent = async function(req, res, next) {
  let filter = req.body;
  console.log("filter is", filter[0]);
  console.log("Student Id is", filter[0]._id);
  await Student.replaceOne({ _id: filter[0]._id }, filter[0], function(
    err,
    response
  ) {
    // console.log(students);
    if (err) return res.status(500).json({ error: err });
    return res.status(200).json(response);
  });
  // await Student.replaceOne({ _id: filter[0]._id }, filter[0]);
};

exports.addEduDetails = async function(req, res, next) {
  let filter = req.body._id;
  console.log("filter issssss", filter);
  const data = {
    _id: new ObjectId(),
    yearofPassing: req.body.yearofPassing,
    collegeName: req.body.collegeName,
    degree: req.body.degree,
    major: req.body.major
  };
  console.log("Add edu details", data);
  await Student.updateOne(
    { _id: filter },
    {
      $push: {
        educations: data
      }
    },
    function(err, response) {
      // console.log(students);
      if (err) {
        console.log(err);
        return res.status(500).json({ error: err });
      }
      console.log(response);
      return res.status(200).json(response);
    }
  );
};

exports.deleteEduDetails = async function(req, res, next) {
  let filter = req.body._id;
  let stuId = req.body.stuId;
  console.log("Delete Edu", filter, stuId);
  await Student.updateOne(
    { _id: stuId },
    { $pull: { educations: { _id: filter } } },
    { multi: true },
    function(err, students) {
      // console.log(students);
      if (err) return res.status(500).json({ error: err });
      console.log(students);
      return res.status(200).json(students);
    }
  );
};

exports.addWorkDetails = async function(req, res, next) {
  let filter = req.body._id;
  console.log("filter issssss", filter);
  const data = {
    _id: new ObjectId(),
    companyName: req.body.companyName,
    title: req.body.title,
    startDate: req.body.startDate,
    endDate: req.body.endDate,
    description: req.body.description
  };
  console.log("Add work details", data);
  await Student.updateOne(
    { _id: filter },
    {
      $push: {
        workExperiences: data
      }
    },
    function(err, response) {
      // console.log(students);
      if (err) {
        console.log(err);
        return res.status(500).json({ error: err });
      }
      console.log(response);
      return res.status(200).json(response);
    }
  );
};

exports.deleteWorkDetails = async function(req, res, next) {
  let filter = req.body._id;
  let stuId = req.body.stuId;
  console.log("Delete Edu", filter, stuId);
  await Student.updateOne(
    { _id: stuId },
    { $pull: { workExperiences: { _id: filter } } },
    { multi: true },
    function(err, students) {
      // console.log(students);
      if (err) return res.status(500).json({ error: err });
      console.log(students);
      return res.status(200).json(students);
    }
  );
};

exports.studentsPost = function(req, res, next) {
  const stude = new Student({
    _id: new mongoose.Types.ObjectId(),
    firstName: req.body.firstName,
    lastName: req.body.lastName
  });
  stude
    .save()
    .then(result => {
      console.log(result);
    })
    .catch(err => console.log(err));
  res.status(201).json({
    message: "Hi error",
    createdStudent: stude
  });
};

exports.student_details = function(req, res, next) {
  // await testStudent.find(filter, async (err, student) => {
  //   if (err) return JSON.stringify(err);
  //   res.send(student);
  // });
  // await testStudent.find(async (err, student) => {
  //   if (err) return JSON.stringify(err);
  //   res.send(student);
  // });
  // res.send(filter);

  var testStudent = new Student({
    firstName: "Alex",
    lastName: "Peter",
    dob: "4.5.1984",
    city: "San Francisco",
    state: "California",
    country: "US",
    collegeName: "San Jose State University",
    careerObjective:
      "Interested in programming and love brainstorming the logic to \
   solve challenging problems. Enthusiastic and self-motivated to learn new tools \
   and technologies. Currently looking for full time Entry Level Software Engineer \
   position where I can effectively use my knowledge, skills & continuous learning \
   process, thus enhancing my caliber, which will enable me to contribute more for \
   Organization's growth as well as \n",
    studentProfilePic: "1584094852577-hmm.jpeg",
    email: "stu3@gmail.com",
    phoneNumber: "9908226945",
    educations: [
      {
        collegeName: "thanmai",
        location: "New York",
        degree: "Bachelors",
        major: "Computer Science",
        yearOfPassing: 2020,
        cgpa: 3.9
      }
    ],
    workExperiences: [
      {
        companyName: "iQuant",
        location: "New York",
        title: "Senior Vice President, Produc",
        startDate: "20-1-2010",
        endDate: "20-3-1010",
        workDescription: "This is the first work description"
      }
    ]
  });

  testStudent.save(function(err) {
    if (err) {
      return next(err);
    }
    res.send("Product Created successfully");
  });
};

//Simple version, without validation or sanitation
exports.test = function(req, res, next) {
  var testStudent = new Job({
    jobTitle: "Software Developer",
    postingDate: "2020-02-02",
    applicationDeadline: "2020-03-03",
    jobLocation: "Dublin",
    salary: "$30 per hour",
    jobDescription: "2 yrs of Experience",
    jobCategory: "Part Time",
    duties: "Good Ethics",
    qualifications: "SE",
    requirements: "2 yrs"
  });

  var testStudent2 = new Job({
    jobTitle: "Android Developer",
    postingDate: "2020-01-01",
    applicationDeadline: "2020-02-02",
    jobLocation: "SFO",
    salary: "$40 per hour",
    jobDescription: "3 yrs of Experience",
    jobCategory: "On Campus",
    duties: "Good Ethics",
    qualifications: "SE",
    requirements: "3 yrs"
  });

  var testStudent3 = new Job({
    jobTitle: "Data Sceientist",
    postingDate: "2020-02-02",
    applicationDeadline: "2020-03-03",
    jobLocation: "Cali",
    salary: "$30 per hour",
    jobDescription: "2 yrs of Experience",
    jobCategory: "Internship",
    duties: "Good Ethics",
    qualifications: "SE",
    requirements: "2 yrs"
  });

  testStudent.save(function(err) {
    if (err) {
      return next(err);
    }
    res.send("Product Created successfully");
  });

  testStudent2.save(function(err) {
    if (err) {
      return next(err);
    }
    res.send("Product Created successfully");
  });

  testStudent3.save(function(err) {
    if (err) {
      return next(err);
    }
    res.send("Product Created successfully");
  });
};
