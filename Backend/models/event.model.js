var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var event = new Schema({
  eventName: { type: String, required: true, max: 100 },
  eventDescription: { type: String },
  eventtime: { type: Date },
  companyId: { type: String, required: true },
  eventLocation: { type: String },
  eventEligibility: { type: String },
  registrations: { type: Array }
});

// Export the model
module.exports = mongoose.model("Event", event);
