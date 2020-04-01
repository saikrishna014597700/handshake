const Company = require("../models/company.model");
const Student = require("../models/student.model");
const Job = require("../models/job.model");
const Event = require("../models/event.model");
var mongoose = require("mongoose");
var express = require("express");
var router = express.Router();

exports.fetchParticularCompany = function(req, res, next) {
  console.log("In Company Controller", req.params.companyId);
  Company.findOne({ _id: req.params.companyId })
    .exec()
    .then(company => {
      // console.log("Jobs are", docs);
      res.status(200).json(company);
    })
    .catch(err => {
      // console.log(err);
      res.status(500).json({ error: err });
    });
};

exports.uploadFile = function(req, res, next) {
  if (req.query.type === "companyProfilePic") {
    console.log("Image uplaoding");
    companyImageUpload(req, res, function(err) {
      if (err instanceof multer.MulterError) {
        console.log("error", err);
        return res.status(500).json(err);
      } else if (err) {
        console.log("error", err);
        return res.status(500).json(err);
      }
      console.log("response", res.file);
      return res.status(200).send(req.file);
    });
  }
};

exports.companyEvents = async function(req, res, next) {
  var companyId = req.body.companyId;
  console.log("companyEvents", companyId);
  await Company.findById(companyId, function(err, company) {
    console.log("ompanyEvents Array", company.events);
    if (err) return res.status(500).json({ error: err });
    Event.find({ _id: { $in: company.events } })
      .exec()
      .then(events => {
        console.log("Reg events are:::", events);
        res.status(200).json(events);
      })
      .catch(err => {
        res.status(500).json({ error: err });
      });
  });
};

exports.companyJobs = async function(req, res, next) {
  var companyId = req.body.companyId;
  console.log("companyEvents", companyId);
  await Company.findById(companyId, function(err, company) {
    console.log("ompanyEvents Array", company.jobs);
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
};

exports.updateCompanyProfile = async function(req, res, next) {
  let filter = req.params.companyId;
  console.log("filter is:::", filter, req.body[0]);
  await Company.replaceOne({ _id: filter }, req.body[0], function(
    err,
    response
  ) {
    console.log("Replaced", response);
    if (err) return res.status(500).json({ error: err });
    Company.findById(filter, function(err, company) {
      if (err) return res.status(500).json({ error: err });
      return res.status(200).json(company);
    });
  });
};
