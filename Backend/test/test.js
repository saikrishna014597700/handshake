var app = require("../index");
var chai = require("chai");
chai.use(require("chai-http"));
var expect = require("chai").expect;

var agent = require("chai").request.agent(app);

describe("Handshake App", function() {
  it("GET /allstudentDetails - Verifying all students", function(done) {
    agent
      .get("/allstudentDetails")
      .then(function(res) {
        //console.log('res',res.body)
        expect(res.body.length).to.equal(4);
        done();
      })
      .catch(e => {
        done(e);
      });
  });
  it("GET /events - Verifying all events", function(done) {
    agent
      .get("/events")
      .then(function(res) {
        //console.log('res',res.body)
        expect(res.body.length).to.equal(2);
        done();
      })
      .catch(e => {
        done(e);
      });
  });
  it("GET /getjobDetails - Verifying Job posting ", function(done) {
    agent
      .get("/getjobDetails/2")
      .then(function(res) {
        // console.log("res", res.body);
        expect(res.body.length).to.equal(1);
        done();
      })
      .catch(e => {
        done(e);
      });
  });
  it("GET /companyJobPostings - Verifying all job postings of company", function(done) {
    agent
      .get("/companyJobPostings/1")
      .then(function(res) {
        // console.log("res", res.body);
        expect(res.body.length).to.equal(3);
        done();
      })
      .catch(e => {
        done(e);
      });
  });
  it("GET /studentjobs - Verifying all student applied job postings", function(done) {
    agent
      .get("/studentjobs/49")
      .then(function(res) {
        // console.log("res", res.body);
        expect(res.body.length).to.equal(2);
        done();
      })
      .catch(e => {
        done(e);
      });
  });
});
