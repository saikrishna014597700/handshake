var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var school = new Schema({
  collegeName: { type: String, required: true, max: 100 },
  location: { type: String },
  degree: { type: String },
  major: { type: String },
  yearOfPassing: { type: Number },
  CGPA: { type: Number }
});

var workExperience = new Schema({
  companyName: { type: String, required: true, max: 100 },
  location: { type: String },
  title: { type: String },
  startDate: { type: String },
  endDate: { type: String },
  workDescription: { type: String }
});

var skill = new Schema({
  skillID: { type: String, max: 100 },
  skill: { type: String }
});

var student = new Schema({
  studentID: { type: String, required: true, max: 100 },
  studentName: { type: String, required: true, max: 100 },
  primarySchool: { type: String, required: true, max: 150 },
  DOB: { type: String, max: 100 },
  city: { type: String, max: 100 },
  state: { type: String, max: 100 },
  country: { type: String, max: 100 },
  collegeName: { type: String, max: 100 },
  studentJourney: { type: String, max: 1000 },
  profilePictureS3: { type: String, max: 1000 },
  email: { type: String, max: 100 },
  phoneNumber: { type: String, max: 100 },
  schools: [school],
  workExperiences: [workExperience],
  skills: [skill],
  eventRegistrations: { type: Array, max: 100 },
  jobApplications: { type: Array, max: 100 }
});

module.exports = mongoose.model("Student", student);
