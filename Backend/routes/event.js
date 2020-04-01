var express = require("express");
var router = express.Router();

const event_controller = require("../controllers/event.controller");

// a simple test url to check that all of our files are communicating correctly.

router.get("/getEvents", event_controller.getEvents);

router.post("/registeredEvents", event_controller.registeredEvents);

router.get("/upcomingEvents", event_controller.getEvents);

router.post("/postEvent", event_controller.postEvent);

router.get("/eventSearch/:searchValue", event_controller.eventSearch);

router.post(
  "/eventRegisteredStudents",
  event_controller.eventRegisteredStudents
);

router.post("/companyEventSearch", event_controller.companyEventSearch);

router.post("/registerStudentToEvent", event_controller.registerStudentToEvent);

module.exports = router;
