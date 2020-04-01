var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var passportLocalMongoose = require("passport-local-mongoose");

var education = new Schema({
  _id: mongoose.Schema.Types.ObjectId,
  collegeName: { type: String, required: true, max: 100 },
  location: { type: String },
  degree: { type: String },
  major: { type: String },
  yearOfPassing: { type: Number },
  cgpa: { type: Number }
});

var workExperience = new Schema({
  _id: mongoose.Schema.Types.ObjectId,
  companyName: { type: String },
  location: { type: String },
  title: { type: String },
  startDate: { type: String },
  endDate: { type: String },
  description: { type: String }
});

var student = new Schema(
  {
    firstName: { type: String, required: true, max: 100 },
    lastName: { type: String, max: 100 },
    studentPassword: { type: String, max: 100 },
    email: { type: String, max: 100 },
    collegeName: { type: String, max: 100 },
    presentCourse: { type: String, max: 100 },
    presentlevelOfEducation: { type: String, max: 100 },
    graduationYear: { type: String, max: 100 },
    studentProfilePic: { type: String, max: 100 },
    dob: { type: String, max: 100 },
    carrierObjective: { type: String, max: 500 },
    skillSet: { type: String, max: 500 },
    city: { type: String, max: 100 },
    state: { type: String, max: 100 },
    country: { type: String, max: 100 },
    phoneNumber: { type: String, max: 100 },
    educations: [education],
    workExperiences: [workExperience],
    registeredEvents: { type: Array, max: 100 },
    jobApplications: { type: Array, max: 100 }
  },
  { collection: "students" }
);

student.plugin(passportLocalMongoose);
// Export the model
// module.exports = mongoose.model("Student", student);
module.exports = mongoose.model("Student", student);
