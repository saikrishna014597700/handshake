var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var company = new Schema(
  {
    companyName: { type: String, required: true, max: 100 },
    companyPassword: { type: String, required: true, max: 100 },
    location: { type: String, max: 100 },
    email: { type: String, max: 100 },
    description: { type: String, max: 1000 },
    phoneNumber: { type: String, max: 100 },
    websiteUrl: { type: String, max: 100 },
    comapnySize: { type: String, max: 100 },
    shortDesc: { type: String, max: 100 },
    founders: { type: String, max: 100 },
    founderInfo: { type: String, max: 600 },
    availPostions: { type: String, max: 100 },
    companyProfilePic: { type: String, max: 100 },
    jobs: { type: Array, max: 100 },
    events: { type: Array, max: 100 }
  },
  { collection: "company" }
);

// Export the model
module.exports = mongoose.model("Company", company);
