var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var company = new Schema({
  companyID: { type: String, required: true, max: 100 },
  companyName: { type: String, required: true, max: 100 },
  location: { type: String, required: true, max: 100 },
  description: { type: String, max: 1000 },
  contactInfo: { type: String, max: 100 },
  profilePicture: { type: String, max: 1000 },
  jobs: { type: Array, max: 100 },
  events: { type: Array, max: 100 }
});

// Export the model
module.exports = mongoose.model("Company", company);
