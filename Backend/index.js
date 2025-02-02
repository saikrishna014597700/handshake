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
var passport = require("passport");
require("dotenv").config();
var multer = require("multer");
var fs = require("fs");
const connectDB = require("./config/db");
var studentMongoRouter = require("./routes/student");
var loginRouter = require("./routes/login");
var jobRouter = require("./routes/job");
var eventRouter = require("./routes/event");
var companyRouter = require("./routes/company");
var router = express.Router();

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

var companyProfileStorage = multer.diskStorage({
  destination: function(req, file, cb) {
    console.log("req in storage", req.query.studentId);
    cb(null, "./HandshakeFiles/company/");
  },
  filename: function(req, file, cb) {
    cb(null, req.query.companyId + ".jpeg");
  }
});

var imageUpload = multer({ storage: studentProfileStorage }).single(
  "studentProfileStorage"
);

var upload = multer({ storage: fileStorage }).single("file");

var companyImageUpload = multer({ storage: companyProfileStorage }).single(
  "companyProfileStorage"
);

//use cors to allow cross origin resource sharing
app.use(cors({ origin: "http://localhost:3000", credentials: true }));
app.use(passport.initialize());
app.use(passport.session());
app.use(
  require("express-session")({
    secret: "Hello World, this is a session",
    resave: false,
    saveUninitialized: false
  })
);
// passport.serializeUser(User.serializeUser());
// passport.deserializeUser(User.deserializeUser());

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

connectDB();

// var pool = mysql.createPool({
//   connectionLimit: 600,
//   host: "localhost",
//   user: "root",
//   port: "3306",
//   password: "Demo@123",
//   database: "CMPE273LAB1",
//   debug: false
// });
// [10:41 PM, 3/12/2020] Saikrishna Nandikonda🏹: pool.getConnection(function(err, connection) {
//       if (err) {
//         connection.release();
//         throw err;
//       }
//       connection.query(
//         "SELECT * FROM student WHERE email = ?",
//         [username],
//         function(error, results, fields) {
//           if (error) {
//             response.end("Invalid Username");
//           }
//           console.log(results);
//           if (results.length > 0) {
//             bcrypt.compare(password, results[0].studentPassword, function(
//               err,
//               result
//             ) {
//               if (result === true) {
//                 response.cookie(
//                   "cookie",
//                   results[0].studentId + "+" + "student",
//                   {
//                     maxAge: 900000,
//                     httpOnly: false,
//                     path: "/"
//                   }
//                 );
//                 console.log("Valid!");
//                 let token = jwt.sign(
//                   { username: results[0].email },
//                   "keyboard cat 4 ever",
//                   { expiresIn: 129600 }
//                 ); // Signing the token
//                 response.json({
//                   sucess: true,
//                   err: null,
//                   token
//                 });
//                 console.log("Valid!", token);
//               } else {
//                 console.log("Entered Password and Hash do not match!");
//                 res.status(401).json({
//                   sucess: false,
//                   token: null,
//                   err: "Entered Password and Hash do not match!"
//                 });
//               }
//             });
//           } else {
//             response.end("Invalid Username");
//           }
//           // response.end();
//         }
//       );
//     });
// app.use(bodyParser.urlencoded({
//     extended: true
//   }));
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true
  })
);
app.use("/student-mongo", studentMongoRouter);
app.use("/personaLogin", loginRouter);
app.use("/job-mongo", jobRouter);
app.use("/event-mongo", eventRouter);
app.use("/company-mongo", companyRouter);

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

app.post("/upload", function(req, res) {
  upload(req, res, function(err) {
    if (err instanceof multer.MulterError) {
      console.log("1 is", err);
      return res.status(500).json(err);
    } else if (err) {
      console.log("2 is", err);
      return res.status(500).json(err);
    }
    return res.status(200).send(req.file);
  });
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
  console.log("Results are:", username, password);
  if (username && password) {
    connection.query(
      "SELECT * FROM company WHERE email = ? and companyPassword = ?",
      [username, password],
      function(error, results, fields) {
        if (error) {
          response.send("Login Failed");
        }
        response.cookie("cookie", results[0].companyId + "+" + "company", {
          maxAge: 900000,
          httpOnly: false,
          path: "/"
        });
        response.send("Login successed");
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

app.post("/companyregister", function(req, res) {
  var today = new Date();
  const saltRounds = 10;
  companyPassword = req.body.companyPassword;
  bcrypt.hash(companyPassword, saltRounds, function(err, hash) {
    console.log("Password is", hash);
    var company = {
      email: req.body.email,
      companyName: req.body.companyName,
      companyPassword: companyPassword,
      location: req.body.location
    };
    console.log("Company is", company);
    connection.query("INSERT INTO company SET ?", company, function(
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
        // console.log("The solution is: ", results);
        // connection.query(
        //   "INSERT INTO studentDetails SET studentId = ?",
        //   results.insertId,
        //   function(error, results, fields) {
        //     if (error) {
        //       console.log("error ocurred", error);
        //       res.send({
        //         code: 400,
        //         failed: "error ocurred"
        //       });
        //     } else {
        //       console.log("The solution is: ", results);
        res.send({
          code: 200,
          success: "Company Registered & created an entry for student details"
        });
        //   }
        // }
        // );
        // res.send({
        //   code: 200,
        //   success: "User Registered"
        // });
      }
    });
  });
});

app.post("/uploadFile", async function(req, res) {
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
  } else if (req.query.type === "companyProfilePic") {
    console.log("Image uplaoding");
    companyImageUpload(req, res, function(err) {
      if (err instanceof multer.MulterError) {
        console.log("error", err);
        return res.status(500).json(err);
      } else if (err) {
        console.log("error", err);
        return res.status(500).json(err);
      }
      console.log("response", res.file);
      return res.status(200).send(req.file);
    });
  }
});

app.get("/home", async function(req, response) {
  connection.query(
    "SELECT * FROM jobPostings JOIN company on jobPostings.fk_companyId=company.companyId",
    null,
    function(error, results, fields) {
      if (results.length > 0) {
        console.log("Results are", results);
        response.send(results);
      } else {
        response.send("No Job postings!");
      }
      // response.end();
    }
  );
});

app.get("/getStudentAppliedJobIds/:id", async function(req, response) {
  connection.query(
    "SELECT fk_jobId FROM job_application where studentId = ?",
    req.params.id,
    function(error, results, fields) {
      if (results.length > 0) {
        response.send(results);
      } else {
        var result = [];
        response.send(result);
      }
      // response.end();
    }
  );
});

app.get("/getStudentRegisteredEvents/:id", async function(req, response) {
  connection.query(
    "SELECT fk_eventId FROM events_registration where studentId = ?",
    req.params.id,
    function(error, results, fields) {
      if (results.length > 0) {
        response.send(results);
      } else {
        var result = [];
        response.send(result);
      }
      // response.end();
    }
  );
});

app.get("/studentjobs/:id", async function(req, response) {
  var studentId = req.params.id;
  connection.query(
    "select * from jobPostings JOIN job_application where jobPostings.jobId = job_application.fk_jobId and job_application.studentId=?",
    studentId,
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

app.post("/studentjobsOnStatus/:id", async function(req, response) {
  var studentId = req.params.id;
  var status = req.body.status;
  var data = [studentId, status];
  console.log("Data is ", data);
  connection.query(
    "select * from jobPostings JOIN job_application where jobPostings.jobId = job_application.fk_jobId and job_application.studentId=? and applicationStatus = ?",
    data,
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

app.post("/studentjobsOnCategory/:id", async function(req, response) {
  var studentId = req.params.id;
  var status = req.body.status;
  var data = [
    "%" + req.body.searchValue + "%",
    "%" + req.body.searchValue + "%",
    "%" + req.body.searchValue + "%",
    req.body.category
  ];

  console.log("Data is ", data);
  connection.query(
    "SELECT * FROM jobPostings JOIN company ON jobPostings.fk_companyId=company.companyId  WHERE (jobPostings.jobTitle LIKE ? OR jobPostings.jobLocation LIKE ? OR company.companyName LIKE ?) and jobPostings.jobCategory like ?",
    data,
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

app.get("/studentAppliedjob/", async function(req, response) {
  console.log("IN APPLOIEDDD", data);
  var studentId = req.body.studentId;
  var jobId = req.body.jobId;
  var data = [jobId, studentId];
  console.log("IN APPLOIEDDD", data);
  connection.query(
    "select * from job_application JOIN student where job_application.studentId = student.studentId and job_application.fk_jobId=? and job_application.studentId = ?",
    data,
    function(error, results, fields) {
      if (results.length > 0) {
        response.send(results);
        console.log("results HTMLTextAreaElement", results);
      } else {
        response.send("No Job postings!");
      }
      // response.end();
    }
  );
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
    "SELECT * FROM jobPostings JOIN company on jobPostings.fk_companyId = company.companyId AND jobPostings.fk_companyId = ?",
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
  var today = new Date();
  var month = today.getMonth() + 1;
  var day = today.getDate();
  var year = today.getFullYear();
  if (month < 10) {
    month = "0" + month;
  }
  if (day < 10) {
    day = "0" + day;
  }
  var todayDate = year + "/" + month + "/" + day;
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
    todayDate,
    jobDetails.companyId
  ];
  console.log("data is", data);
  var jobQuery =
    "INSERT INTO jobPostings SET jobTitle = ?,jobLocation = ?,applicationDeadline = ?,salary = ?, jobDescription = ?,jobCategory = ?,duties = ?,requirements = ?,qualifications = ?,postingDate = ?,fk_companyId=?";
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
  var eventQuery = "SELECT * FROM events order by eventtime ASC";
  results = await getResults(eventQuery);
  eventresult = await results;
  response.send(eventresult);
});

app.get("/eventsRegistered/:id", async function(req, response) {
  var studentId = req.params.id;
  var eventQuery =
    "SELECT * FROM events  JOIN events_registration where events.eventId = events_registration.fk_eventId and events_registration.studentId=? order by eventtime ASC";
  results = await getResults(eventQuery, studentId);
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

app.post("/updateCompanyProfile/:id", async function(req, response) {
  var companyprofile = req.body;
  console.log("studentAllEduDetailsResult", companyprofile);
  companyprofile.map(async companyprofilee => {
    var data = [
      companyprofilee.companyName,
      companyprofilee.location,
      companyprofilee.shortDesc,
      companyprofilee.comapnySize,
      companyprofilee.description,
      companyprofilee.founders,
      companyprofilee.founderInfo,
      companyprofilee.email,
      companyprofilee.phoneNumber,
      companyprofilee.websiteUrl,
      companyprofilee.availPostions,
      req.query.filePath,
      req.params.id
    ];
    console.log("studentAllEduDetailsResult222", data);
    var studentEduQuery =
      "UPDATE company SET companyName = ?,location = ?,shortDesc = ?,comapnySize = ?,description = ?,founders = ?,founderInfo = ?,email = ?,phoneNumber = ?,websiteUrl = ?,availPostions = ?,companyProfilePic=? WHERE companyId = ?";
    results = await getResults(studentEduQuery, data);
    //console.log(results[1].job_desc);
    updateResult = await results;
    response.send("Updated successfully");
  });
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

app.get("/jobAppliedStudents/:id", async function(req, response) {
  var jobId = req.params.id;
  console.log("In eventId", jobId);
  var jobQ =
    "select * from student JOIN job_application ON student.studentId = job_application.studentId and job_application.fk_jobId=?;";
  results = await getResults(jobQ, jobId);
  console.log("results are  for event details ", results);
  studentresult = await results;
  response.send(studentresult);
});

app.get("/allstudentDetails", async function(req, response) {
  var studentresult;
  var studentQuery =
    "SELECT * FROM student JOIN studentDetails ON student.studentId = studentDetails.studentId";
  results = await getResults(studentQuery);
  //console.log(results[1].job_desc);
  studentresult = await results;
  response.send(studentresult);
});

app.get("/studentSearch/:name", async function(req, response) {
  var data = [
    "%" + req.params.name + "%",
    "%" + req.params.name + "%",
    "%" + req.params.name + "%"
  ];

  connection.query(
    `SELECT * FROM student JOIN studentDetails ON student.studentId= studentDetails.studentId AND (student.firstName LIKE ? OR student.collegeName LIKE ? OR studentDetails.skillSet LIKE ?)`,
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

app.get("/eventSearch/:name", async function(req, response) {
  var data = ["%" + req.params.name + "%", "%" + req.params.name + "%"];

  connection.query(
    `SELECT * FROM events  WHERE eventName LIKE ? OR eventLocation LIKE ?`,
    data,
    function(error, results, fields) {
      console.log("Results areeeee", results);
      if (results) {
        if (results.length > 0) {
          console.log("Results areeeee", results);
          response.send(results);
        } else {
          response.send("No event postings!");
        }
      }
      // response.end();
    }
  );
});

app.get("/file/:name", (req, res) => {
  const name = req.params.name;
  // console.log("/file req.params: " + JSON.stringify(req.params));
  const path = __dirname + "/HandshakeFiles/" + req.query.role + "/" + name;
  console.log("/PATHHH" + path);
  try {
    if (fs.existsSync(path)) {
      res.sendFile(path);
    } else {
      res.status(400);
      res.statusMessage("Not Found");
      res.end();
    }
  } catch (err) {
    res.status(500);
    console.log("/file/:name error: " + err);
    res.end();
  }
});

app.post("/companyeventSearch/:name", async function(req, response) {
  var data = [
    "%" + req.params.name + "%",
    "%" + req.params.name + "%",
    req.body.companyId
  ];

  connection.query(
    `SELECT * FROM events  WHERE (eventName LIKE ? OR eventLocation LIKE ?) and fk_companyId=? `,
    data,
    function(error, results, fields) {
      console.log("Results areeeee", results);
      if (results) {
        if (results.length > 0) {
          console.log("Results areeeee", results);
          response.send(results);
        } else {
          response.send("No event postings!");
        }
      }
      // response.end();
    }
  );
});

app.get("/jobPostingSearch/:name", async function(req, response) {
  var data = [
    "%" + req.params.name + "%",
    "%" + req.params.name + "%",
    "%" + req.params.name + "%"
  ];

  connection.query(
    `SELECT * FROM jobPostings JOIN company ON jobPostings.fk_companyId=company.companyId  WHERE (jobPostings.jobTitle LIKE ? OR jobPostings.jobLocation LIKE ? OR company.companyName LIKE ?)`,
    data,
    function(error, results, fields) {
      console.log("Results areeeee", results);
      if (results) {
        if (results.length > 0) {
          console.log("Results areeeee", results);
          response.send(results);
        } else {
          response.send("No job postings!");
        }
      }
      // response.end();
    }
  );
});

app.post("/companyjobPostingSearch/:name", async function(req, response) {
  var data = [
    "%" + req.params.name + "%",
    "%" + req.params.name + "%",
    "%" + req.params.name + "%",
    req.body.companyId
  ];
  console.log("In data", data);
  connection.query(
    `SELECT * FROM jobPostings JOIN company ON jobPostings.fk_companyId=company.companyId  WHERE (jobPostings.jobTitle LIKE ? OR jobPostings.jobLocation LIKE ? OR company.companyName LIKE ?) AND jobPostings.fk_companyId=?`,
    data,
    function(error, results, fields) {
      console.log("Results areeeee", results);
      if (results) {
        if (results.length > 0) {
          console.log("Results areeeee", results);
          response.send(results);
        } else {
          response.send("No job postings!");
        }
      }
      // response.end();
    }
  );
});

app.post("/companyjobPostingSearchOnCategory/:companyId", async function(
  req,
  response
) {
  var data = [
    "%" + req.body.searchValue + "%",
    "%" + req.body.searchValue + "%",
    "%" + req.body.searchValue + "%",
    "%" + req.body.category + "%",
    req.params.companyId
  ];
  console.log("In data", data);
  connection.query(
    `SELECT * FROM jobPostings JOIN company ON jobPostings.fk_companyId=company.companyId  WHERE (jobPostings.jobTitle LIKE ? OR jobPostings.jobLocation LIKE ? OR company.companyName LIKE ?) AND jobPostings.jobCategory LIKE ? AND jobPostings.fk_companyId=?`,
    data,
    function(error, results, fields) {
      console.log("Results areeeee", results);
      if (results) {
        if (results.length > 0) {
          console.log("Results areeeee", results);
          response.send(results);
        } else {
          response.send("No job postings!");
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
  if (results.length > 0) {
    response.send(studentresult);
  } else {
    response.send("No Job postings!");
  }
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

app.post("/updatePersonalInfo/:id", async function(req, response) {
  var path = req.query.filePath;
  console.log("In updatePersonalInfo", path);
  console.log(req.body[0]);
  var data = [
    req.body[0].presentlevelOfEducation,
    req.body[0].presentCourse,
    req.body[0].graduationYear,
    req.body[0].collegeName,
    path,
    req.body[0].studentId
  ];
  // var data2 = [path, req.body[0].studentId];
  console.log("data is", data);
  var studentQuery =
    "UPDATE student SET presentlevelOfEducation = ?, presentCourse = ?,graduationYear = ?,collegeName=?,studentProfilePic = ? WHERE studentId = ?";
  results = await getResults(studentQuery, data);
  // var student2Query =
  //   "UPDATE studentDetails SET profilePicture = ? WHERE studentId = ?";
  // results = await getResults(student2Query, data2);
  //console.log(results[1].job_desc);
  updateResult = await results;
  response.send("Updated successfully");
});
/////////////////////////////////Change These
app.post("/registerToEvent", async function(req, response) {
  console.log("req is::", req.body);
  var eventId = req.body.eventid;
  var companyId = req.body.companyId;
  var studentId = req.body.studentId;
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
  var studentId = req.body.studentId;
  var resumePath = req.body.resumePath;
  var applicationStatus = "Pending";
  var today = new Date();

  var month = today.getMonth() + 1;
  var day = today.getDate();
  var year = today.getFullYear();
  if (month < 10) {
    month = "0" + month;
  }
  if (day < 10) {
    day = "0" + day;
  }
  var applicationDate = year + "/" + day + "/" + month;
  console.log("Application Date", applicationDate);
  var data = [studentId, jobId, applicationStatus, applicationDate, resumePath];
  console.log("data is::", data);
  var applyToJobQuery =
    "INSERT INTO job_application SET studentId = ?, fk_jobId = ?, applicationStatus = ?,applicationDate=?,studentJobResume=?";
  results = await getResults(applyToJobQuery, data);
  //console.log(results[1].job_desc);
  updateResult = await results;
  response.send("Updated successfully");
});

app.post("/changeJobApplicationsStatus", async function(req, response) {
  var jobId = req.body.jobId;
  var studentId = req.body.studentId;
  var applicationStatus = req.body.status;
  var data = [applicationStatus, studentId, jobId];
  console.log("data is::", data);
  var applyToJobQuery =
    "UPDATE job_application SET  applicationStatus = ? WHERE studentId = ? AND fk_jobId = ?";
  results = await getResults(applyToJobQuery, data);
  //console.log(results[1].job_desc);
  updateResult = await results;
  response.send("Updated successfully");
});

// Configure dotenv to load in the .env file
// Configure aws with your accessKeyId and your secretAccessKey
aws.config.update({
  region: "us-east-2", // Put your aws region here
  accessKeyId: "AKIA4JSQ7Q3AMXZ3DA7X",
  secretAccessKey: "xFpWLR7TbeXyKFurNVDrEr56zXGjFjqMU/k3emYd"
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

module.exports = app;
