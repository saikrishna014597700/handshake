// const passwordHash = require("password-hash");
// const Users = require("../dbSchema/users");
const Student = require("../models/student.model");

async function handle_request(msg, callback) {
  let res = {};

  // let payload = { _id: "5e766f5f1c9d440000a89f97", msg: msg };
  // res.status = 200;
  // res.message = payload;
  // callback(null, res);

  await Student.find((err, students) => {
    if (err) {
      return callback(err);
    }
    // res.send(students);
    res.status = 200;
    res.message = { results: students };
    callback(null, res);
  });
}

exports.handle_request = handle_request;
