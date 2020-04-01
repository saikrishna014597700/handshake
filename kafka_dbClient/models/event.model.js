var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var event = new Schema({
  eventName: { type: String, max: 100 },
  eventDescription: { type: String },
  time: { type: String },
  date: { type: String },
  location: { type: String },
  eligibility: { type: String },
  registeredStudents: { type: Array }
});

module.exports = mongoose.model("Event", event);
