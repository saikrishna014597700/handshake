//import the require dependencies
var express = require("express");
var mysql = require("mysql");
var app = express();
var bodyParser = require("body-parser");
var session = require("express-session");
var cookieParser = require("cookie-parser");
var cors = require("cors");
const util = require("util");
app.set("view engine", "ejs");
var bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const exjwt = require("express-jwt");
var aws = require("aws-sdk");
require("dotenv").config();

//use cors to allow cross origin resource sharing
app.use(cors({ origin: "http://localhost:3000", credentials: true }));

//use express session to maintain session data
app.use(
  session({
    secret: "cmpe273_kafka_passport_mongo",
    resave: false, // Forces the session to be saved back to the session store, even if the session was never modified during the request
    saveUninitialized: false, // Force to save uninitialized session to db. A session is uninitialized when it is new but not modified.
    duration: 60 * 60 * 1000, // Overall duration of Session : 30 minutes : 1800 seconds
    activeDuration: 5 * 60 * 1000
  })
);

var connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  port: "3306",
  password: "Demo@123",
  database: "CMPE273LAB1"
});

// app.use(bodyParser.urlencoded({
//     extended: true
//   }));
app.use(bodyParser.json());

//Allow Access Control
app.use(function(req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET,HEAD,OPTIONS,POST,PUT,DELETE"
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type,Authorization, Access-Control-Request-Method, Access-Control-Request-Headers"
  );
  res.setHeader("Cache-Control", "no-cache");
  next();
});

const jwtMW = exjwt({
  secret: "keyboard cat 4 ever"
});

app.get("/", jwtMW /* Using the express jwt MW here */, (req, res) => {
  console.log("Web Token Checked.");
  res.send("You are authenticated"); //Sending some response when authenticated
});

//Route to handle Post Request Call
app.post("/login", function(request, response) {
  var username = request.body.username;
  var password = request.body.password;
  if (username && password) {
    connection.query(
      "SELECT * FROM student WHERE email = ?",
      [username],
      function(error, results, fields) {
        if (error) {
          response.end("Invalid Username");
        }
        console.log(results);
        if (results.length > 0) {
          bcrypt.compare(password, results[0].studentPassword, function(
            err,
            result
          ) {
            if (result === true) {
              response.cookie(
                "cookie",
                results[0].studentId + "+" + "student",
                {
                  maxAge: 900000,
                  httpOnly: false,
                  path: "/"
                }
              );
              console.log("Valid!");
              let token = jwt.sign(
                { username: results[0].email },
                "keyboard cat 4 ever",
                { expiresIn: 129600 }
              ); // Signing the token
              response.json({
                sucess: true,
                err: null,
                token
              });
              console.log("Valid!", token);
            } else {
              console.log("Entered Password and Hash do not match!");
              res.status(401).json({
                sucess: false,
                token: null,
                err: "Entered Password and Hash do not match!"
              });
            }
          });
        } else {
          response.end("Invalid Username");
        }
        // response.end();
      }
    );
  }
});

app.post("/companylogin", function(request, response) {
  var username = request.body.username;
  var password = request.body.password;
  if (username && password) {
    connection.query(
      "SELECT * FROM company WHERE email = ? AND companyPassword = ?",
      [username, password],
      function(error, results, fields) {
        console.log("Results are:", results);
        if (results.length > 0) {
          response.cookie("cookie", results[0].companyId + "+" + "company", {
            maxAge: 900000,
            httpOnly: false,
            path: "/"
          });
          // request.session.user = user;
          response.writeHead(200, {
            "Content-Type": "text/plain"
          });
          // response.end("Successful Login");
          // response.redirect("/home");
          // response.send("Correct Username and/or Password!");
        } else {
          response.send("Incorrect Username and/or Password!");
        }
        response.end();
      }
    );
  } else {
    response.send("Please enter Username and Password!");
    response.end();
  }
});

app.post("/register", function(req, res) {
  var today = new Date();
  const saltRounds = 10;
  studentPassword = req.body.password;
  bcrypt.hash(studentPassword, saltRounds, function(err, hash) {
    console.log("Password is", hash);
    var students = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      studentPassword: hash,
      collegeName: req.body.univname
    };
    console.log("Syudent is", students);
    connection.query("INSERT INTO student SET ?", students, function(
      error,
      results,
      fields
    ) {
      if (error) {
        console.log("error ocurred", error);
        res.send({
          code: 400,
          failed: "error ocurred"
        });
      } else {
        console.log("The solution is: ", results);
        connection.query(
          "INSERT INTO studentDetails SET studentId = ?",
          results.insertId,
          function(error, results, fields) {
            if (error) {
              console.log("error ocurred", error);
              res.send({
                code: 400,
                failed: "error ocurred"
              });
            } else {
              console.log("The solution is: ", results);
              res.send({
                code: 200,
                success:
                  "User Registered & created an entry for student details"
              });
            }
          }
        );
        // res.send({
        //   code: 200,
        //   success: "User Registered"
        // });
      }
    });
  });
});

app.get("/home", async function(req, response) {
  connection.query("SELECT * FROM jobPostings", null, function(
    error,
    results,
    fields
  ) {
    if (results.length > 0) {
      response.send(results);
    } else {
      response.send("No Job postings!");
    }
    // response.end();
  });
});

app.get("/getjobDetails/:id", async function(req, response) {
  connection.query(
    "SELECT * FROM jobPostings where jobId = ?",
    req.params.id,
    function(error, results, fields) {
      if (results.length > 0) {
        response.send(results);
      } else {
        response.send("No Job postings!");
      }
      // response.end();
    }
  );
});

app.get("/companyJobPostings/:id", async function(req, response) {
  console.log("Id ios ", req.params.id);
  connection.query(
    "SELECT * FROM jobPostings where fk_companyId = ?",
    req.params.id,
    function(error, results, fields) {
      if (results.length > 0) {
        response.send(results);
      } else {
        response.send("No Job postings!");
      }
      // response.end();
    }
  );
});

app.post("/postJob", async function(req, response) {
  console.log("In postJob");
  var jobDetails = req.body;
  var data = [
    jobDetails.jobTitle,
    jobDetails.location,
    jobDetails.applicationDeadline,
    jobDetails.salary,
    jobDetails.jobDescription,
    jobDetails.jobCategory,
    jobDetails.duties,
    jobDetails.requirements,
    jobDetails.qualifications,
    jobDetails.companyId
  ];
  console.log("data is", data);
  var jobQuery =
    "INSERT INTO jobPostings SET jobTitle = ?,location = ?,applicationDeadline = ?,salary = ?, jobDescription = ?,jobCategory = ?,duties = ?,requirements = ?,qualifications = ?,fk_companyId=?";
  results = await getResults(jobQuery, data);
  //console.log(results[1].job_desc);
  updateResult = await results;
  connection.query(
    "SELECT * FROM jobPostings where fk_companyId = ?",
    jobDetails.companyId,
    function(error, results, fields) {
      if (results.length > 0) {
        response.send(results);
      } else {
        response.send("No Job postings!");
      }
      // response.end();
    }
  ); // response.send("Updated successfully");
});

app.post("/postEvent", async function(req, response) {
  console.log("In postEvent");
  var eventDetails = req.body;
  var data = [
    eventDetails.eventname,
    eventDetails.eventDescription,
    eventDetails.eventtime,
    eventDetails.eventocation,
    eventDetails.eventEligibility,
    eventDetails.companyId
  ];
  console.log("data is", data);
  var jobQuery =
    "INSERT INTO events SET eventname = ?,eventDescription = ?,eventtime = ?,eventLocation = ?, eventEligibility = ?,fk_companyId=?";
  results = await getResults(jobQuery, data);
  //console.log(results[1].job_desc);
  updateResult = await results;
  connection.query(
    "SELECT * FROM events where fk_companyId = ?",
    eventDetails.companyId,
    function(error, results, fields) {
      if (results.length > 0) {
        response.send(results);
      } else {
        response.send("No Job postings!");
      }
      // response.end();
    }
  ); // response.send("Updated successfully");
});

const getResults = util.promisify(connection.query).bind(connection);

// app.get("/profile", async function(req, response) {
//   var studentresult;
//   var jobPostingsQuery = "SELECT * FROM studentDetails WHERE studentId = 1";
//   results = await getResults(jobPostingsQuery);
//   studentresult = await results;
//   response.send(studentresult);
// });

app.get("/profileEduDetails/:id", async function(req, response) {
  var studentEduresult;
  var studentId = req.params.id;
  var jobPostingsQuery = "SELECT * FROM studentEduDetails WHERE studentId = ?";
  results = await getResults(jobPostingsQuery, studentId);
  studentEduresult = await results;
  response.send(studentEduresult);
});

app.get("/profileWorkDetails/:id", async function(req, response) {
  var studentId = req.params.id;
  var jobPostingsQuery = "SELECT * FROM workExpDetails WHERE studentId = ?";
  results = await getResults(jobPostingsQuery, studentId);
  var studentWorkresult = await results;
  response.send(studentWorkresult);
});

app.get("/events", async function(req, response) {
  var eventresult;
  var eventQuery = "SELECT * FROM events";
  results = await getResults(eventQuery);
  eventresult = await results;
  response.send(eventresult);
});

app.get("/companyevents/:id", async function(req, response) {
  var eventresult;
  var companyId = req.params.id;
  console.log("company Id isss", companyId);
  var eventQuery = "SELECT * FROM events where fk_companyId = ?";
  results = await getResults(eventQuery, companyId);
  eventresult = await results;
  response.send(eventresult);
});

app.get("/profilestudentDetails/:id", async function(req, response) {
  var studentId = req.params.id;
  console.log("In studentDetails", studentId);
  var studentQuery = "SELECT * FROM studentDetails where studentId = ?";
  results = await getResults(studentQuery, studentId);
  console.log("results are  for student details ", results);
  studentresult = await results;
  response.send(studentresult);
});

app.get("/eventRegisteredStudents/:id", async function(req, response) {
  var eventId = req.params.id;
  console.log("In eventId", eventId);
  var eventQuery =
    "select * from student JOIN events_registration ON student.studentId = events_registration.studentId and events_registration.fk_eventId=?;";
  results = await getResults(eventQuery, eventId);
  console.log("results are  for event details ", results);
  studentresult = await results;
  response.send(studentresult);
});

app.get("/student", async function(req, response) {
  var studentresult;
  var studentQuery = "SELECT * FROM student";
  results = await getResults(studentQuery);
  //console.log(results[1].job_desc);
  studentresult = await results;
  response.send(studentresult);
});

app.get("/studentSearch/:name", async function(req, response) {
  var data = ["%" + req.params.name + "%", "%" + req.params.name + "%"];

  connection.query(
    `SELECT * FROM student where (firstName LIKE ? OR collegeName LIKE ? )`,
    data,
    function(error, results, fields) {
      console.log("Results areeeee", results);
      if (results) {
        if (results.length > 0) {
          console.log("Results areeeee", results);
          response.send(results);
        } else {
          response.send("No Job postings!");
        }
      }
      // response.end();
    }
  );
});

app.get("/profilestudent/:id", async function(req, response) {
  var studentId = req.params.id;
  console.log("In student", studentId);
  var studentQuery = "SELECT * FROM student where studentId = ?";
  results = await getResults(studentQuery, studentId);
  console.log("results are  ", results);
  studentresult = await results;
  response.send(studentresult);
});

app.get("/profileCompany/:id", async function(req, response) {
  var companyId = req.params.id;
  console.log("In student", companyId);
  var companyQuery = "SELECT * FROM company where companyId = ?";
  results = await getResults(companyQuery, companyId);
  console.log("results are  ", results);
  companyresult = await results;
  response.send(companyresult);
});

app.get("/companyDetails/:id", async function(req, response) {
  var companyId = req.params.id;
  var compQ = "SELECT * FROM company where companyId = ?";
  results = await getResults(compQ, companyId);
  console.log("results are  ", results);
  compRes = await results;
  response.send(compRes);
});

app.put("/myjourney", async function(req, response) {
  var id = req.body[0].studentDetailsId;
  var value = req.body[0].carrierObjective;
  var data = [value, id];
  console.log("Vaslue us", data);
  var studentQuery =
    "UPDATE studentDetails SET carrierObjective = ? WHERE studentDetailsId = ?";
  results = await getResults(studentQuery, data);
  console.log(results);
  updateResult = await results;
  response.send("Updated successfully");
});

app.post("/addEduDetails", async function(req, response) {
  console.log("In addEduDetails");

  console.log("data iss", req);
  console.log("data issss", req.body);
  var eduDetails = req.body;
  var data = [
    eduDetails.collegeName,
    eduDetails.degree,
    eduDetails.major,
    eduDetails.yearofPassing,
    eduDetails.studentId
  ];
  console.log("data is", data);
  var studentEduQuery =
    "INSERT INTO studentEduDetails SET collegeName = ?,degree = ?,major = ?,yearofPassing = ?, studentId = ?";
  results = await getResults(studentEduQuery, data);
  //console.log(results[1].job_desc);
  updateResult = await results;
  // response.send("Updated successfully");
});

app.post("/addWorkDetails", async function(req, response) {
  console.log("In workDetails");
  var workDetails = req.body;
  var data = [
    workDetails.companyName,
    workDetails.title,
    // workDetails.startDate,
    // workDetails.endDate,
    workDetails.description,
    workDetails.studentId
  ];
  console.log("data is", data);
  var studentEduQuery =
    "INSERT workExpDetails SET companyName = ?,title = ? ,description = ?, studentId = ?";
  results = await getResults(studentEduQuery, data);
  //console.log(results[1].job_desc);
  updateResult = await results;
  // response.send("Updated successfully");
});

app.post("/updateWorkDetails", async function(req, response) {
  var studentAllWorkDetailsResult = req.body;
  console.log("updateWorkDetails", studentAllWorkDetailsResult);
  studentAllWorkDetailsResult.map(async studentAllWorkDetailResult => {
    var data = [
      studentAllWorkDetailResult.companyName,
      studentAllWorkDetailResult.title,
      // studentAllWorkDetailResult.startDate,
      // studentAllWorkDetailResult.endDate,
      studentAllWorkDetailResult.workExpDetailsId
    ];
    var studentEduQuery =
      "UPDATE workExpDetails SET companyName = ?,title = ? WHERE workExpDetailsId = ?";
    results = await getResults(studentEduQuery, data);
    updateResult = await results;
    response.send("Updated successfully");
  });
});

app.post("/updateEduDetails", async function(req, response) {
  var studentAllEduDetailsResult = req.body;
  console.log("studentAllEduDetailsResult", studentAllEduDetailsResult);
  studentAllEduDetailsResult.map(async studentEduDetail => {
    var data = [
      studentEduDetail.degree,
      studentEduDetail.yearofPassing,
      studentEduDetail.major,
      studentEduDetail.collegeName,
      studentEduDetail.studentEduDetailsId
    ];
    var studentEduQuery =
      "UPDATE studentEduDetails SET degree = ?,yearofPassing = ?,major = ?,collegeName = ? WHERE studentEduDetailsId = ?";
    results = await getResults(studentEduQuery, data);
    //console.log(results[1].job_desc);
    updateResult = await results;
    response.send("Updated successfully");
  });
});

app.post("/deleteEduDetails", async function(req, response) {
  var eduDetailsId = req.body.eduId;
  var studentEduQuery =
    "DELETE FROM studentEduDetails WHERE studentEduDetailsId = ?    ";
  results = await getResults(studentEduQuery, eduDetailsId);
  //console.log(results[1].job_desc);
  updateResult = await results;
  // response.send("Updated successfully");
});

app.post("/deleteWorkDetails", async function(req, response) {
  var workId = req.body.workId;
  var studentEduQuery =
    "DELETE FROM workExpDetails WHERE workExpDetailsId = ?    ";
  results = await getResults(studentEduQuery, workId);
  //console.log(results[1].job_desc);
  updateResult = await results;
  // response.send("Updated successfully");
});

app.put("/updateskillSet", async function(req, response) {
  var data = [req.body[0].skillSet, req.body[0].studentDetailsId];
  console.log("data is", data);
  var studentEduQuery =
    "UPDATE studentDetails SET skillSet = ? WHERE studentDetailsId = ?";
  results = await getResults(studentEduQuery, data);
  //console.log(results[1].job_desc);
  updateResult = await results;
  response.send("Updated successfully");
});

app.put("/updateContactdetails", async function(req, response) {
  console.log("In updateContactdetails");

  var data = [
    req.body[0].phoneNumber,
    req.body[0].city,
    req.body[0].state,
    req.body[0].country,
    // studentAllDetailResult.dob,
    req.body[0].studentDetailsId
  ];
  console.log("data is", data);
  var studentEduQuery =
    // "UPDATE studentDetails SET phoneNumber = ?, city = ?,state = ?,country = ?,dob = ? WHERE studentDetailsId = ?";
    "UPDATE studentDetails SET phoneNumber = ?, city = ?,state = ?,country = ? WHERE studentDetailsId = ?";
  results = await getResults(studentEduQuery, data);
  //console.log(results[1].job_desc);
  updateResult = await results;
  response.send("Updated successfully");
});

app.put("/updatePersonalInfo", async function(req, response) {
  console.log("In updatePersonalInfo");
  console.log(req.body[0]);
  var data = [
    req.body[0].presentlevelOfEducation,
    req.body[0].presentCourse,
    req.body[0].graduationYear,
    req.body[0].collegeName,
    req.body[0].studentId
  ];
  console.log("data is", data);
  var studentQuery =
    "UPDATE student SET presentlevelOfEducation = ?, presentCourse = ?,graduationYear = ?,collegeName=? WHERE studentId = ?";
  results = await getResults(studentQuery, data);
  //console.log(results[1].job_desc);
  updateResult = await results;
  response.send("Updated successfully");
});

app.post("/registerToEvent", async function(req, response) {
  console.log("req is::", req.body);
  var eventId = req.body.eventid;
  var companyId = req.body.companyId;
  var studentId = "1";
  var data = [studentId, eventId];
  var registerEventQuery =
    "INSERT INTO events_registration SET studentId = ?, fk_eventId = ?";
  results = await getResults(registerEventQuery, data);
  //console.log(results[1].job_desc);
  updateResult = await results;
  response.send("Updated successfully");
});

app.post("/applyToJob", async function(req, response) {
  var jobId = req.body.jobId;
  var companyId = req.body.companyId;
  var studentId = "1";
  var applicationStatus = "Applied";
  var data = [studentId, jobId, applicationStatus];
  console.log("data is::", data);
  var applyToJobQuery =
    "INSERT INTO job_application SET studentId = ?, fk_jobId = ?, applicationStatus = ?";
  results = await getResults(applyToJobQuery, data);
  //console.log(results[1].job_desc);
  updateResult = await results;
  response.send("Updated successfully");
});

// Configure dotenv to load in the .env file
// Configure aws with your accessKeyId and your secretAccessKey
aws.config.update({
  region: "us-east-2", // Put your aws region here
  accessKeyId: "AKIAIEGURI5FGBKERRTQ",
  secretAccessKey: "8AiAob9WMzS/tpbwcGETufNbQYr2CzRK+mLOHj65"
});

const S3_BUCKET = "handshakefiles";
// Now lets export this function so we can call it from somewhere else
app.post("/sign_s3", async function(req, res) {
  console.log("File Upload");
  const s3 = new aws.S3(); // Create a new instance of S3
  const fileName = req.body.fileName;
  const fileType = req.body.fileType;
  // Set up the payload of what we are sending to the S3 api
  const s3Params = {
    Bucket: S3_BUCKET,
    Key: fileName,
    Expires: 500,
    // ContentType: fileType,
    ACL: "public-read"
  };
  console.log("params are", s3Params);
  // Make a request to the S3 API to get a signed URL which we can use to upload our file
  s3.getSignedUrl("putObject", s3Params, (err, data) => {
    if (err) {
      console.log(err);
      res.json({ success: false, error: err });
    }
    // Data payload of what we are sending back, the url of the signedRequest and a URL where we can access the content after its saved.
    const returnData = {
      signedRequest: data,
      url: `https://${S3_BUCKET}.s3.amazonaws.com/${fileName}`
    };
    // Send it all back
    console.log("Return Data Upload", returnData);
    res.json({ success: true, data: { returnData } });
  });
});

//start your server on port 3001
app.listen(3001);
console.log("Server Listening on port 3001");
