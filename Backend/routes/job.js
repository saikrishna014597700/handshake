var express = require("express");
var router = express.Router();

const job_controller = require("../controllers/job.controller");

// a simple test url to check that all of our files are communicating correctly.

router.get("/getJobPostings", job_controller.getJobPostings);

router.post("/jobSearchOnName", job_controller.jobSearchOnName);

router.post("/companyJobSearch", job_controller.companyJobSearch);

router.post("/jobSearchOnNameAndCat", job_controller.jobSearchOnNameAndCat);

router.post(
  "/companyJobSearchOnNameAndCat",
  job_controller.companyJobSearchOnNameAndCat
);

router.post("/jobAppliedStudents", job_controller.jobAppliedStudents);

router.post("/postJob", job_controller.postJob);

router.post("/fetchParticularJob/:jobId", job_controller.fetchParticularJob);

// router.post("/postJob", job_controller.postJob);

module.exports = router;
