var express = require("express");
var router = express.Router();
const Student = require("../models/student.model");
const Company = require("../models/company.model");
var bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { check, validationResult } = require("express-validator");
// const Student = require("../models/student.model");

const login_controller = require("../controllers/login.controller");

// router.post("/login", login_controller.studentLogin);

router.post(
  "/login",
  [
    check("email", "Please enter a valid email").isEmail(),
    check("studentPassword", "Please enter a valid password").isLength({
      min: 6
    })
  ],
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array()
      });
    }

    const { email, studentPassword } = req.body;
    try {
      let user = await Student.find({
        email: email
      });
      if (!user.length > 0)
        return res.status(400).json({
          message: "User Not Exist"
        });

      console.log("user", user);
      console.log("studentPassword", studentPassword);
      console.log("user.studentPassword", user[0].studentPassword);
      const isMatch = await bcrypt.compare(
        studentPassword,
        user[0].studentPassword
      );
      console.log("isMatch", isMatch);
      if (!isMatch) {
        res.cookie("cookie", user[0]._id + "+" + "student", {
          maxAge: 900000,
          httpOnly: false,
          path: "/"
        });
        return res.status(400).json({
          message: "Incorrect Password !"
        });
      }
      const payload = {
        user: {
          id: user[0]._id
        }
      };
      console.log("payload", payload);
      jwt.sign(
        payload,
        "secret",
        {
          expiresIn: 3600
        },
        (err, token) => {
          if (err) throw err;
          res.status(200).json({
            token,
            cookie: user[0]._id + "+" + "student"
          });
        }
      );
    } catch (e) {
      console.error(e);
      res.status(500).json({
        message: "Server Error"
      });
    }
  }
);

router.post(
  "/register",
  [
    check("email", "Please enter a valid email").isEmail(),
    check("studentPassword", "Please enter a valid password").isLength({
      min: 6
    })
  ],
  async (req, res) => {
    console.log("Hii");
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array()
      });
    }
    console.log("req.body", req.body);
    const {
      firstName,
      email,
      studentPassword,
      lastName,
      collegeName
    } = req.body;

    console.log("test", email);
    try {
      let user = await Student.find({
        email: email
      });
      console.log("user", user);
      if (user.length > 0) {
        return res.status(400).json({
          msg: "User Already Exists"
        });
      }

      user = new Student({
        firstName,
        email,
        studentPassword,
        lastName,
        collegeName
      });
      console.log("user", user);
      const salt = await bcrypt.genSalt(10);
      user.studentPassword = await bcrypt.hash(studentPassword, salt);
      console.log("studentPassword", user.studentPassword);
      await user.save();

      const payload = {
        user: {
          id: user[0]._id
        }
      };

      jwt.sign(
        payload,
        "randomString",
        {
          expiresIn: 10000
        },
        (err, token) => {
          if (err) throw err;
          res.status(200).json({
            token
          });
        }
      );
    } catch (err) {
      console.log(err.message);
      res.status(500).send("Error in Saving");
    }
  }
);

router.post(
  "/loginCompany",
  [
    check("email", "Please enter a valid email").isEmail(),
    check("companyPassword", "Please enter a valid password").isLength({
      min: 6
    })
  ],
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array()
      });
    }

    const { email, companyPassword } = req.body;
    try {
      let user = await Company.find({
        email: email
      });
      if (!user.length > 0)
        return res.status(400).json({
          message: "User Not Exist"
        });

      console.log("user", user);
      console.log("studentPassword", companyPassword);
      console.log("user.studentPassword", user[0].companyPassword);
      const isMatch = await bcrypt.compare(
        companyPassword,
        user[0].companyPassword
      );
      console.log("isMatch", isMatch);
      if (!isMatch) {
        res.cookie("cookie", user[0]._id + "+" + "company", {
          maxAge: 900000,
          httpOnly: false,
          path: "/"
        });
        return res.status(400).json({
          message: "Incorrect Password !"
        });
      }
      const payload = {
        user: {
          id: user[0].id
        }
      };
      console.log("payload", payload);
      jwt.sign(
        payload,
        "secret",
        {
          expiresIn: 3600
        },
        (err, token) => {
          if (err) throw err;
          res.status(200).json({
            token,
            cookie: user[0]._id + "+" + "company"
          });
        }
      );
    } catch (e) {
      console.error(e);
      res.status(500).json({
        message: "Server Error"
      });
    }
  }
);

router.post(
  "/registerCompany",
  [
    check("email", "Please enter a valid email").isEmail(),
    check("companyPassword", "Please enter a valid password").isLength({
      min: 6
    })
  ],
  async (req, res) => {
    console.log("Hii");
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array()
      });
    }
    console.log("req.body", req.body);
    const { email, companyName, companyPassword, location } = req.body;

    console.log("test", email);
    try {
      let user = await Company.find({
        email: email
      });
      console.log("user", user);
      if (user.length > 0) {
        return res.status(400).json({
          msg: "User Already Exists"
        });
      }

      user = new Company({
        companyName,
        email,
        companyPassword,
        location
      });
      console.log("user", user);
      const salt = await bcrypt.genSalt(10);
      user.companyPassword = await bcrypt.hash(companyPassword, salt);
      await user.save();

      const payload = {
        user: {
          id: user.id
        }
      };

      jwt.sign(
        payload,
        "randomString",
        {
          expiresIn: 10000
        },
        (err, token) => {
          if (err) throw err;
          res.status(200).json({
            token
          });
        }
      );
    } catch (err) {
      console.log(err.message);
      res.status(500).send("Error in Saving");
    }
  }
);

// router.post("/companylogin", login_controller.companyLogin);

// router.post("/register", login_controller.studentRegister);

// router.post("/companyregister", login_controller.companyRegister);

module.exports = router;
