var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var student = new Schema(
  {
    name: { type: String, required: true, max: 100 },
    age: { type: Number, required: true }
  },
  { collection: "student" }
);

// Export the model
module.exports = mongoose.model("Student", student);
