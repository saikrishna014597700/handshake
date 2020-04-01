const Event = require("../models/event.model");
const Student = require("../models/student.model");
const Company = require("../models/company.model");
var mongoose = require("mongoose");
var express = require("express");
var router = express.Router();
var ObjectId = require("mongodb").ObjectID;
// const kafka = require("../kafka/client");

exports.getEvents = function(req, res, next) {
  Event.find()
    .exec()
    .then(docs => {
      res.status(200).json(docs);
    })
    .catch(err => {
      res.status(500).json({ error: err });
    });
};

exports.registeredEvents = async function(req, res, next) {
  var studentId = req.body.studentId;
  console.log("registeredEvents", studentId);
  await Student.findById(studentId, function(err, students) {
    console.log("registeredEvents Array", students.registeredEvents);
    if (err) return res.status(500).json({ error: err });
    var events = Event.find({ _id: { $in: students.registeredEvents } })
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

exports.eventRegisteredStudents = async function(req, res, next) {
  var eventId = req.body.eventId;
  console.log("Event id", eventId);
  await Event.findById(eventId, function(err, events) {
    console.log("registeredEvents Array", events.registrations);
    if (err) return res.status(500).json({ error: err });
    Student.find({ _id: { $in: events.registrations } })
      .exec()
      .then(students => {
        console.log("Reg events are:::", students);
        res.status(200).json(students);
      })
      .catch(err => {
        res.status(500).json({ error: err });
      });
  });
};

exports.upcomingEvents = function(req, res, next) {
  Event.find()
    .sort({ eventtime: -1 })
    .exec()
    .then(events => {
      console.log(events);
      res.status(200).json(events);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ error: err });
    });
};

exports.eventSearch = function(req, res, next) {
  var searchParam = req.params.searchValue;
  console.log("SearchParam by name", searchParam);
  Event.find({
    $or: [
      { eventName: { $regex: searchParam, $options: "i" } },
      { eventLocation: { $regex: searchParam, $options: "i" } }
    ]
  })
    .exec()
    .then(events => {
      console.log(events);
      res.status(200).json(events);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ error: err });
    });
};

exports.companyEventSearch = function(req, res, next) {
  var searchParam = req.body.searchValue;
  var compId = req.body.companyId;
  console.log("SearchParam by name", searchParam, compId);
  Event.find({
    $and: [
      {
        $or: [
          { eventName: { $regex: searchParam, $options: "i" } },
          { eventLocation: { $regex: searchParam, $options: "i" } }
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

exports.postEvent = function(req, res, next) {
  var eventid = new ObjectId();
  var event = new Event({
    _id: eventid,
    eventName: req.body.eventName,
    eventDescription: req.body.eventDescription,
    eventtime: req.body.eventtime,
    eventocation: req.body.eventocation,
    eventEligibility: req.body.eventEligibility,
    companyId: req.body.companyId
  });
  console.log("Req Data is", req.body);
  console.log("Event Data is", event);
  event.save(function(err) {
    if (err) {
      return next(err);
    }
    Company.updateOne(
      { _id: req.body.companyId },
      { $push: { events: eventid } },
      { upsert: true }
    )
      .then(response => {
        Company.findById(req.body.companyId, function(err, company) {
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
      })
      .catch(err => {
        console.log(err);
        return res.status(500).json({ error: err });
      });
  });
};

exports.registerStudentToEvent = function(req, res, next) {
  const { eventId, companyId, studentId } = req.body;
  Event.updateOne(
    { _id: req.body._id },
    { $push: { registrations: studentId } },
    { upsert: true }
  )
    .then(response => {
      Student.updateOne(
        { _id: studentId },
        { $push: { registeredEvents: req.body._id } },
        { upsert: true }
      )
        .then(response => {
          return res.status(200).json("Successfully Updated");
        })
        .catch(err => {
          console.log(err);
          return res.status(500).json({ error: err });
        });
    })
    .catch(err => {
      console.log(err);
      return res.status(500).json({ error: err });
    });
};
