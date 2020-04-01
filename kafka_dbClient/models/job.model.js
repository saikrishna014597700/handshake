var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var jobApplicant = new Schema({
  studentID: { type: String },
  status: { type: String }
});

var job = new Schema({
  jobTitle: { type: String, required: true, max: 100 },
  postingDate: { type: String },
  applicationDeadline: { type: String },
  location: { type: String },
  salary: { type: Number },
  jobDescription: { type: String },
  jobCategory: { type: String },
  jobApplicants: [jobApplicant]
});

// Export the model
module.exports = mongoose.model("Job", job);
