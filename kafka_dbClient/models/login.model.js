var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var login = new Schema({
  email: { type: String, max: 100 },
  password: { type: String, max: 100 },
  role: { type: String, max: 100 }
});

// Export the model
module.exports = mongoose.model("Login", login);
