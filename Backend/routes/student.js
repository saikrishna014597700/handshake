var express = require("express");
var router = express.Router();
const student_controller = require("../controllers/student.controller");
var multer = require("multer");
var fs = require("fs");

var fileStorage = multer.diskStorage({
  destination: function(req, file, cb) {
    console.log("req in storage", req.query.id);
    cb(null, "./HandshakeFiles/resumes");
  },
  filename: function(req, file, cb) {
    cb(null, req.query.studentId + "_" + req.query.jobId + ".pdf");
  }
});

var studentProfileStorage = multer.diskStorage({
  destination: function(req, file, cb) {
    console.log("req in storage", req.query.studentId);
    cb(null, "./HandshakeFiles/students/");
  },
  filename: function(req, file, cb) {
    cb(null, req.query.studentId + ".jpeg");
  }
});

router.get("/student-details", student_controller.student_details);

router.post(
  "/submitReduxProfileStudent",
  student_controller.submitReduxProfileStudent
);

router.post("/addEduDetails", student_controller.addEduDetails);

router.post("/deleteEduDetails", student_controller.deleteEduDetails);

router.post("/addWorkDetails", student_controller.addWorkDetails);

router.post("/deleteWorkDetails", student_controller.deleteWorkDetails);

router.get("/test", student_controller.test);

router.get("/fetchAllStudents", student_controller.fetchAllStudents);

router.get(
  "/studentSearchComp/:searchValue",
  student_controller.studentSearchComp
);

router.get("/getStudent/:id", student_controller.getStudent);

router.post("/studentsPost", student_controller.studentsPost);

router.post("/uploadFile", async function(req, res) {
  if (req.query.type === "resume") {
    upload(req, res, function(err) {
      if (err instanceof multer.MulterError) {
        // console.log('error',err)
        return res.status(500).json(err);
      } else if (err) {
        // console.log('error',err)
        return res.status(500).json(err);
      }
      // console.log('response',res.file)
      return res.status(200).send(req.file);
    });
  } else if (req.query.type === "studentProfilePic") {
    console.log("Image uplaoding");
    imageUpload(req, res, function(err) {
      if (err instanceof multer.MulterError) {
        console.log("error", err);
        return res.status(500).json(err);
      } else if (err) {
        console.log("error", err);
        return res.status(500).json(err);
      }
      console.log("response issss", res.file);
      return res.status(200).send(req.file);
    });
  }
});

module.exports = router;
