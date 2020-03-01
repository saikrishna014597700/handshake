// //import the require dependencies
// var express = require("express");
// var mysql = require("mysql");
// var app = express();
// var bodyParser = require("body-parser");
// var session = require("express-session");
// var cookieParser = require("cookie-parser");
// var cors = require("cors");
// const util = require("util");
// app.set("view engine", "ejs");

// //use cors to allow cross origin resource sharing
// app.use(cors({ origin: "http://localhost:3000", credentials: true }));

// //use express session to maintain session data
// app.use(
//   session({
//     secret: "cmpe273_kafka_passport_mongo",
//     resave: false, // Forces the session to be saved back to the session store, even if the session was never modified during the request
//     saveUninitialized: false, // Force to save uninitialized session to db. A session is uninitialized when it is new but not modified.
//     duration: 60 * 60 * 1000, // Overall duration of Session : 30 minutes : 1800 seconds
//     activeDuration: 5 * 60 * 1000
//   })
// );

// var connection = mysql.createConnection({
//   host: "localhost",
//   user: "root",
//   port: "3306",
//   password: "Demo@123",
//   database: "CMPE273LAB1"
// });

// // app.use(bodyParser.urlencoded({
// //     extended: true
// //   }));
// app.use(bodyParser.json());

// //Allow Access Control
// app.use(function(req, res, next) {
//   res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
//   res.setHeader("Access-Control-Allow-Credentials", "true");
//   res.setHeader(
//     "Access-Control-Allow-Methods",
//     "GET,HEAD,OPTIONS,POST,PUT,DELETE"
//   );
//   res.setHeader(
//     "Access-Control-Allow-Headers",
//     "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers"
//   );
//   res.setHeader("Cache-Control", "no-cache");
//   next();
// });

// var Users = [
//   {
//     username: "admin",
//     password: "admin"
//   }
// ];

// var books = [
//   { BookID: "1", Title: "Book 1", Author: "Author 1" },
//   { BookID: "2", Title: "Book 2", Author: "Author 2" },
//   { BookID: "3", Title: "Book 3", Author: "Author 3" }
// ];
// //Route to handle Post Request Call
// app.post("/login", function(request, response) {
//   var username = request.body.username;
//   var password = request.body.password;
//   if (username && password) {
//     connection.query(
//       "SELECT * FROM student WHERE email = ? AND studentPassword = ?",
//       [username, password],
//       function(error, results, fields) {
//         console.log(results);
//         if (results.length > 0) {
//           response.cookie("cookie", username, {
//             maxAge: 900000,
//             httpOnly: false,
//             path: "/"
//           });
//           // request.session.user = user;
//           response.writeHead(200, {
//             "Content-Type": "text/plain"
//           });
//           // response.end("Successful Login");
//           // response.redirect("/home");
//         } else {
//           response.send("Incorrect Username and/or Password!");
//         }
//         // response.end();
//       }
//     );
//   } else {
//     response.send("Please enter Username and Password!");
//     // response.end()
//   }
// });

// app.post("/companylogin", function(request, response) {
//   var username = request.body.username;
//   var password = request.body.password;
//   if (username && password) {
//     connection.query(
//       "SELECT * FROM company WHERE email = ? AND companyPassword = ?",
//       [username, password],
//       function(error, results, fields) {
//         console.log("Results are:", results);
//         if (results.length > 0) {
//           response.cookie("cookie", username, {
//             maxAge: 900000,
//             httpOnly: false,
//             path: "/"
//           });
//           // request.session.user = user;
//           response.writeHead(200, {
//             "Content-Type": "text/plain"
//           });
//           // response.end("Successful Login");
//           // response.redirect("/home");
//           // response.send("Correct Username and/or Password!");
//         } else {
//           response.send("Incorrect Username and/or Password!");
//         }
//         response.end();
//       }
//     );
//   } else {
//     response.send("Please enter Username and Password!");
//     response.end();
//   }
// });

// app.post("/register", function(req, res) {
//   var today = new Date();
//   var students = {
//     firstName: req.body.firstName,
//     lastName: req.body.lastName,
//     email: req.body.email,
//     studentPassword: req.body.password,
//     collegeName: req.body.univname
//   };
//   connection.query("INSERT INTO student SET ?", students, function(
//     error,
//     results,
//     fields
//   ) {
//     if (error) {
//       console.log("error ocurred", error);
//       res.send({
//         code: 400,
//         failed: "error ocurred"
//       });
//     } else {
//       console.log("The solution is: ", results);
//       res.send({
//         code: 200,
//         success: "User Registered"
//       });
//     }
//   });
// });

// app.get("/home", async function(req, response) {
//   connection.query("SELECT * FROM jobPostings", null, function(
//     error,
//     results,
//     fields
//   ) {
//     if (results.length > 0) {
//       response.send(results);
//     } else {
//       response.send("No Job postings!");
//     }
//     // response.end();
//   });
// });

// const getResults = util.promisify(connection.query).bind(connection);

// // app.get("/profile", async function(req, response) {
// //   var studentresult;
// //   var jobPostingsQuery = "SELECT * FROM studentDetails WHERE studentId = 1";
// //   results = await getResults(jobPostingsQuery);
// //   studentresult = await results;
// //   response.send(studentresult);
// // });

// app.get("/profileEduDetails/:id", async function(req, response) {
//   var studentEduresult;
//   var studentId = req.params.id;
//   var jobPostingsQuery = "SELECT * FROM studentEduDetails WHERE studentId = ?";
//   results = await getResults(jobPostingsQuery, studentId);
//   studentEduresult = await results;
//   response.send(studentEduresult);
// });

// app.get("/profileWorkDetails/:id", async function(req, response) {
//   var studentId = req.params.id;
//   var jobPostingsQuery = "SELECT * FROM workExpDetails WHERE studentId = ?";
//   results = await getResults(jobPostingsQuery, studentId);
//   var studentWorkresult = await results;
//   response.send(studentWorkresult);
// });

// app.get("/events", async function(req, response) {
//   var eventresult;
//   var eventQuery = "SELECT * FROM events";
//   results = await getResults(eventQuery);
//   eventresult = await results;
//   response.send(eventresult);
// });

// app.get("/profilestudentDetails/:id", async function(req, response) {
//   var studentId = req.params.id;
//   console.log("In studentDetails", studentId);
//   var studentQuery = "SELECT * FROM studentDetails where studentId = ?";
//   results = await getResults(studentQuery, studentId);
//   console.log("results are  for student details ", results);
//   studentresult = await results;
//   response.send(studentresult);
// });

// app.get("/student", async function(req, response) {
//   var studentresult;
//   var studentQuery = "SELECT * FROM student";
//   results = await getResults(studentQuery);
//   //console.log(results[1].job_desc);
//   studentresult = await results;
//   response.send(studentresult);
// });

// app.get("/profilestudent/:id", async function(req, response) {
//   var studentId = req.params.id;
//   console.log("In student", studentId);
//   var studentQuery = "SELECT * FROM student where studentId = ?";
//   results = await getResults(studentQuery, studentId);
//   console.log("results are  ", results);
//   studentresult = await results;
//   response.send(studentresult);
// });

// app.put("/myjourney", async function(req, response) {
//   console.log("In myjourney");
//   var id = req.body.id;
//   var value = req.body.myJourney;
//   var data = [value, id];
//   var studentQuery =
//     "UPDATE studentDetails SET carrierObjective = ? WHERE studentDetailsId = ?";
//   results = await getResults(studentQuery, data);
//   //console.log(results[1].job_desc);
//   updateResult = await results;
//   response.send("Updated successfully");
// });

// app.post("/addEduDetails", async function(req, response) {
//   console.log("In addEduDetails");

//   console.log("data iss", req);
//   console.log("data issss", req.body);
//   var eduDetails = req.body;
//   var data = [
//     eduDetails.collegeName,
//     eduDetails.degree,
//     eduDetails.major,
//     eduDetails.yearofPassing,
//     eduDetails.studentId
//   ];
//   console.log("data is", data);
//   var studentEduQuery =
//     "INSERT INTO studentEduDetails SET collegeName = ?,degree = ?,major = ?,yearofPassing = ?, studentId = ?";
//   results = await getResults(studentEduQuery, data);
//   //console.log(results[1].job_desc);
//   updateResult = await results;
//   // response.send("Updated successfully");
// });

// app.post("/addWorkDetails", async function(req, response) {
//   console.log("In workDetails");
//   var workDetails = req.body.data;
//   var data = [
//     workDetails.company,
//     workDetails.role,
//     // workDetails.startDate,
//     // workDetails.endDate,
//     workDetails.studentId
//   ];
//   console.log("data is", data);
//   var studentEduQuery =
//     "INSERT workExpDetails SET companyName = ?,title = ? , studentId = ?";
//   results = await getResults(studentEduQuery, data);
//   //console.log(results[1].job_desc);
//   updateResult = await results;
//   // response.send("Updated successfully");
// });

// app.post("/updateWorkDetails", async function(req, response) {
//   var studentAllWorkDetailsResult = req.body.studentAllWorkDetailsResult;
//   studentAllWorkDetailsResult.map(async studentAllWorkDetailResult => {
//     var data = [
//       studentAllWorkDetailResult.companyName,
//       studentAllWorkDetailResult.title,
//       // studentAllWorkDetailResult.startDate,
//       // studentAllWorkDetailResult.endDate,
//       studentAllWorkDetailResult.workExpDetailsId
//     ];
//     var studentEduQuery =
//       "UPDATE workExpDetails SET companyName = ?,title = ? WHERE workExpDetailsId = ?";
//     results = await getResults(studentEduQuery, data);
//     updateResult = await results;
//     // response.send("Updated successfully");
//   });
// });

// app.post("/updateEduDetails", async function(req, response) {
//   var studentAllEduDetailsResult = req.body.studentAllEduDetailsResult;
//   studentAllEduDetailsResult.map(async studentEduDetail => {
//     var data = [
//       studentEduDetail.degree,
//       studentEduDetail.yearofPassing,
//       studentEduDetail.major,
//       studentEduDetail.collegeName,
//       studentEduDetail.studentEduDetailsId
//     ];
//     var studentEduQuery =
//       "UPDATE studentEduDetails SET degree = ?,yearofPassing = ?,major = ?,collegeName = ? WHERE studentEduDetailsId = ?";
//     results = await getResults(studentEduQuery, data);
//     //console.log(results[1].job_desc);
//     updateResult = await results;
//     // response.send("Updated successfully");
//   });
// });

// app.post("/deleteEduDetails", async function(req, response) {
//   var eduDetailsId = req.body.eduId;
//   var studentEduQuery =
//     "DELETE FROM studentEduDetails WHERE studentEduDetailsId = ?    ";
//   results = await getResults(studentEduQuery, eduDetailsId);
//   //console.log(results[1].job_desc);
//   updateResult = await results;
//   // response.send("Updated successfully");
// });

// app.post("/updateskillSet", async function(req, response) {
//   var studentAllDetailsResult = req.body.studentAllDetailsResult;
//   studentAllDetailsResult.map(async studentAllDetailResult => {
//     var data = [
//       studentAllDetailResult.skillSet,
//       studentAllDetailResult.studentDetailsId
//     ];
//     console.log("data is", data);
//     var studentEduQuery =
//       "UPDATE studentDetails SET skillSet = ? WHERE studentDetailsId = ?";
//     results = await getResults(studentEduQuery, data);
//     //console.log(results[1].job_desc);
//     updateResult = await results;
//     response.send("Updated successfully");
//   });
// });

// app.post("/updateContactdetails", async function(req, response) {
//   console.log("In updateContactdetails");
//   var studentAllDetailsResult = req.body.studentAllDetailsResult;
//   studentAllDetailsResult.map(async studentAllDetailResult => {
//     var data = [
//       studentAllDetailResult.phoneNumber,
//       studentAllDetailResult.city,
//       studentAllDetailResult.state,
//       studentAllDetailResult.country,
//       // studentAllDetailResult.dob,
//       studentAllDetailResult.studentDetailsId
//     ];
//     console.log("data is", data);
//     var studentEduQuery =
//       // "UPDATE studentDetails SET phoneNumber = ?, city = ?,state = ?,country = ?,dob = ? WHERE studentDetailsId = ?";
//       "UPDATE studentDetails SET phoneNumber = ?, city = ?,state = ?,country = ? WHERE studentDetailsId = ?";
//     results = await getResults(studentEduQuery, data);
//     //console.log(results[1].job_desc);
//     updateResult = await results;
//     response.send("Updated successfully");
//   });
// });

// app.post("/updatePersonalInfo", async function(req, response) {
//   console.log("In updatePersonalInfo");
//   var studentBasicDetailsResult = req.body.studentBasicDetailsResult;
//   studentBasicDetailsResult.map(async studentBasicDetailResult => {
//     var data = [
//       studentBasicDetailResult.presentlevelOfEducation,
//       studentBasicDetailResult.presentCourse,
//       studentBasicDetailResult.graduationYear,
//       studentBasicDetailResult.studentId
//     ];
//     console.log("data is", data);
//     var studentQuery =
//       "UPDATE student SET presentlevelOfEducation = ?, presentCourse = ?,graduationYear = ? WHERE studentId = ?";
//     results = await getResults(studentQuery, data);
//     //console.log(results[1].job_desc);
//     updateResult = await results;
//     // response.send("Updated successfully");
//   });
// });

// app.post("/registerToEvent", async function(req, response) {
//   console.log("req is::", req.body);
//   var eventId = req.body.eventid;
//   var companyId = req.body.companyId;
//   var studentId = "1";
//   var data = [studentId, eventId];
//   var registerEventQuery =
//     "INSERT INTO events_registration SET studentId = ?, fk_eventId = ?";
//   results = await getResults(registerEventQuery, data);
//   //console.log(results[1].job_desc);
//   updateResult = await results;
//   response.send("Updated successfully");
// });

// app.post("/applyToJob", async function(req, response) {
//   var jobId = req.body.jobId;
//   var companyId = req.body.companyId;
//   var studentId = "1";
//   var applicationStatus = "Applied";
//   var data = [studentId, jobId, applicationStatus];
//   console.log("data is::", data);
//   var applyToJobQuery =
//     "INSERT INTO job_application SET studentId = ?, fk_jobId = ?, applicationStatus = ?";
//   results = await getResults(applyToJobQuery, data);
//   //console.log(results[1].job_desc);
//   updateResult = await results;
//   response.send("Updated successfully");
// });

// //start your server on port 3001
// app.listen(3001);
// console.log("Server Listening on port 3001");
