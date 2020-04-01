const Job = require("../models/job.model");
var mongoose = require("mongoose");
var express = require("express");
var router = express.Router();
var ObjectId = require("mongodb").ObjectID;
const Student = require("../models/student.model");
const Company = require("../models/company.model");
// const kafka = require("../kafka/client");

//Simple version, without validation or sanitation
exports.test = function(req, res) {
  res.send("Greetings from the Test controller!");
};

exports.getJobPostings = function(req, res, next) {
  // console.log("In Jobs Controller");
  Job.find()
    .exec()
    .then(docs => {
      // console.log("Jobs are", docs);
      res.status(200).json(docs);
    })
    .catch(err => {
      // console.log(err);
      res.status(500).json({ error: err });
    });
};

exports.fetchParticularJob = function(req, res, next) {
  console.log("In Jobs Controller", req.params.jobId);
  Job.findOne({ _id: req.params.jobId })
    .exec()
    .then(job => {
      // console.log("Jobs are", docs);
      res.status(200).json(job);
    })
    .catch(err => {
      // console.log(err);
      res.status(500).json({ error: err });
    });
};

exports.jobSearchOnName = function(req, res, next) {
  var searchParam = req.body.searchValue;
  console.log("SearchParam by name", searchParam);
  Job.find({
    $or: [
      { jobTitle: { $regex: searchParam, $options: "i" } },
      { jobLocation: { $regex: searchParam, $options: "i" } }
    ]
  })
    .exec()
    .then(jobs => {
      console.log(jobs);
      res.status(200).json(jobs);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ error: err });
    });
};

exports.jobSearchOnNameAndCat = function(req, res, next) {
  var searchParam = req.body.searchValue;
  var searchParamCat = req.body.category;
  console.log("SearchParam by cat", searchParam, searchParamCat);
  Job.find({
    $and: [
      {
        $or: [
          { jobTitle: { $regex: searchParam, $options: "i" } },
          { jobLocation: { $regex: searchParam, $options: "i" } }
        ]
      },
      { jobCategory: { $regex: searchParamCat, $options: "i" } }
    ]
  })
    .exec()
    .then(jobs => {
      console.log(jobs);
      res.status(200).json(jobs);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ error: err });
    });
};

exports.companyJobSearchOnNameAndCat = function(req, res, next) {
  var searchParam = req.body.searchValue;
  var searchParamCat = req.body.category;
  var companyId = req.body.companyId;
  console.log("SearchParam by cat", searchParam, searchParamCat);
  Job.find({
    $and: [
      {
        $or: [
          { jobTitle: { $regex: searchParam, $options: "i" } },
          { jobLocation: { $regex: searchParam, $options: "i" } }
        ]
      },
      { jobCategory: { $regex: searchParamCat, $options: "i" } },
      { companyId: companyId }
    ]
  })
    .exec()
    .then(jobs => {
      console.log(jobs);
      res.status(200).json(jobs);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ error: err });
    });
};

exports.companyJobSearch = function(req, res, next) {
  var searchParam = req.body.searchValue;
  var compId = req.body.companyId;
  console.log("SearchParam by name", searchParam, compId);
  Job.find({
    $and: [
      {
        $or: [
          { jobTitle: { $regex: searchParam, $options: "i" } },
          { jobLocation: { $regex: searchParam, $options: "i" } }
        ]
      },
      { companyId: compId }
    ]
  })
    .exec()
    .then(companyEvents => {
      console.log(companyEvents);
      res.status(200).json(companyEvents);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ error: err });
    });
};

exports.postJob = function(req, res, next) {
  var jobId = new ObjectId();
  var today = new Date();
  var month = today.getMonth() + 1;
  var day = today.getDate();
  var year = today.getFullYear();
  if (month < 10) {
    month = "0" + month;
  }
  if (day < 10) {
    day = "0" + day;
  }
  var todayDate = year + "/" + month + "/" + day;
  var job = new Job({
    _id: jobId,
    jobTitle: req.body.jobTitle,
    jobLocation: req.body.location,
    applicationDeadline: req.body.applicationDeadline,
    salary: req.body.salary,
    jobDescription: req.body.jobDescription,
    jobCategory: req.body.jobCategory,
    duties: req.body.duties,
    requirements: req.body.requirements,
    qualifications: req.body.qualifications,
    companyId: req.body.companyId,
    postingDate: todayDate
  });
  console.log("Req Data is", req.body);
  console.log("Event Data is", job);
  job.save(function(err) {
    if (err) {
      return next(err);
    }
    Company.updateOne(
      { _id: req.body.companyId },
      { $push: { jobs: jobId } },
      { upsert: true }
    )
      .then(response => {
        Company.findById(req.body.companyId, function(err, company) {
          console.log("oCmpanyJobs Array", company.jobs);
          if (err) return res.status(500).json({ error: err });
          Job.find({ _id: { $in: company.jobs } })
            .exec()
            .then(jobs => {
              console.log("Reg events are:::", jobs);
              res.status(200).json(jobs);
            })
            .catch(err => {
              res.status(500).json({ error: err });
            });
        });
      })
      .catch(err => {
        console.log(err);
        return res.status(500).json({ error: err });
      });
  });
  eventId;
};

exports.jobAppliedStudents = async function(req, res, next) {
  var jobId = req.body.jobId;
  console.log("Event id", jobId);
  await Job.findById(jobId, function(err, jobs) {
    console.log("Jobs are", jobs);
    if (err) return res.status(500).json({ error: err });
    Student.find({ _id: { $in: jobs.jobApplicants } })
      .exec()
      .then(students => {
        console.log("Job Applied Students are", students);
        res.status(200).json(students);
      })
      .catch(err => {
        res.status(500).json({ error: err });
      });
  });
};
