var mongoose = require("mongoose");

const Student = require("../models/student.model");
const Login = require("../models/login.model");
const { log } = require("../helpers/logger");
const ResponseModel = require("../helpers/utils");

const signUpDBController = reqBody => {
  const { email, password, studentName, collegeName } = reqBody;
  return new Promise((resolve, reject) => {
    let session = null;
    mongoose
      .startSession()
      .then(_session => {
        session = _session;
        return Login.find({
          email: email
        });
      })
      .then(user => {
        if (user.length > 0) {
          throw { error: "User already exists" };
        }
      })
      .then(async () => {
        const user = new Login({
          email,
          password,
          role: "student"
        });
        console.log("user", user);
        session.startTransaction();
        return user.save({ session });
      })
      .then(student => {
        console.log(student.id);
        student = new Student({
          studentID: student.id,
          studentName: studentName,
          primarySchool: collegeName
        });
        return student.save({ session });
      })
      .then(student => {
        session.commitTransaction().catch(ex => {
          console.log("commitTransaction err: " + ex);
        });
        resolve(new ResponseModel(true, student));
      })
      .catch(err => {
        session.abortTransaction().catch(ex => {
          console.log("abortTransaction err: " + ex);
        });
        console.log(err);
        reject(new ResponseModel(false, err));
      });
  });
};

module.exports = { signUp: signUpDBController };
