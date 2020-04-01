var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var jobApplicant = new Schema({
  studentID: { type: String },
  status: { type: String }
});

var job = new Schema({
  jobTitle: { type: String, required: true, max: 100 },
  postingDate: { type: Date },
  applicationDeadline: { type: String },
  jobLocation: { type: String },
  salary: { type: String },
  jobDescription: { type: String },
  jobCategory: { type: String },
  duties: { type: String },
  qualifications: { type: String },
  requirements: { type: String },
  jobApplicants: { type: Array },
  companyId: { type: String }
});

// Export the model
module.exports = mongoose.model("Job", job);
