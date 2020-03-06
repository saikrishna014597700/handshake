import React, { Component } from "react";
import "../../profile.css";
import "../../App.css";
import axios from "axios";
import cookie from "react-cookies";
import { Redirect } from "react-router";

class JobDescription extends Component {
  constructor() {
    super();
    this.state = {
      jobDetails: [],
      companyDetails: [],
      redirect: null
    };
    this.registerToJobDetails = this.registerToJobDetails.bind(this);
    this.getAppliedStudents = this.getAppliedStudents.bind(this);
  }
  //get the books data from backend
  componentDidMount() {
    console.log("in componentDidMount");
    axios
      .get(`http://localhost:3001/getjobDetails/${this.props.match.params.id}`)
      .then(response => {
        //update the state with the response data
        console.log("res is  :::", response);
        this.setState({
          jobDetails: this.state.jobDetails.concat(response.data)
        });
        if (this.state.jobDetails[0]) {
          var comapnyDetails = this.state.jobDetails[0].fk_companyId;
          console.log("Abc is ", comapnyDetails);
        }
        axios
          .get(`http://localhost:3001/companyDetails/${comapnyDetails}`)
          .then(response => {
            //update the state with the response data
            console.log("res is  :::", response);
            this.setState({
              companyDetails: this.state.companyDetails.concat(response.data)
            });
          });
      });
  }

  render() {
    if (this.state.redirect) {
      return <Redirect to={this.state.redirect} />;
    }
    //iterate over books to create a table row
    let jobDetails = this.state.jobDetails.map(jobPosting => {
      console.log("xxxx::::", jobPosting);
      return (
        <div class="card3">
          <h4>Job Title : {jobPosting.jobTitle}</h4>
          <h4>Category : {jobPosting.jobCategory}</h4>
          <h4>
            Posting Date: {jobPosting.postingDate}
            <button
              class="btn success"
              onClick={event =>
                this.registerToJobDetails(
                  event,
                  jobPosting.jobId,
                  jobPosting.fk_companyId
                )
              }
            >
              Apply
            </button>
          </h4>
          <h4>Application Deadline:{jobPosting.applicationDeadline}</h4>
          <h4>Salary : {jobPosting.salary}</h4>
          <br />
          <br />
          <h3>Job Description: </h3>
          <h4>{jobPosting.jobdescription}</h4>
          <h3>Job Duties: </h3>
          <h4>{jobPosting.duties}</h4>
          <h3>Job Qualification: </h3>
          <h4>{jobPosting.qualifications}</h4>

          <h3>Job Requirements: </h3>
          <h4>{jobPosting.requirements}</h4>
        </div>
      );
    });

    let companyDetails = this.state.companyDetails.map(companyDetail => {
      return (
        <div class="card3">
          <h4> Name : {companyDetail.companyName}</h4>
          <h4> Location : {companyDetail.location}</h4>
          <h4>Website Url: {companyDetail.websiteUrl}</h4>
          <h4>Phone: {companyDetail.phoneNumber}</h4>
          <h4>Email: {companyDetail.email} </h4>
          <br />
          <button
            class="btn success"
            // onClick={event =>
            //   this.registerToJobDetails(
            //     event,
            //     jobPosting.jobId,
            //     jobPosting.fk_companyId
            //   )
            // }
          >
            Profile
          </button>
          <br />
          <br />
        </div>
      );
    });

    //if not logged in go to login page
    let redirectVar = null;
    if (!cookie.load("cookie")) {
      redirectVar = <Redirect to="/login" />;
    }
    let viewRegisteredStudents;
    console.log("ABC", cookie.load("cookie"));
    console.log("ABCC", cookie.load("cookie").split("+")[1] === "company");
    if (
      cookie.load("cookie") &&
      cookie.load("cookie").split("+")[1] === "company"
    ) {
      console.log("ABCcccc", cookie.load("cookie"));
      viewRegisteredStudents = (
        <button
          class="btn success"
          onClick={event => this.getAppliedStudents()}
        >
          Students Applied
        </button>
      );
    }
    return (
      <div>
        {redirectVar}
        <div class="row">
          <div class="leftcolumn">
            <h3 class="heading">
              {" "}
              Job Description
              {viewRegisteredStudents}
            </h3>
            <br />
            {jobDetails}
          </div>
          <div class="rightcolumn">
            <div class="card4">
              <h3>Company</h3>
              <div class="wrapper">
                <img src={require("../jobs.png")} class="image--cover2"></img>
              </div>
              {companyDetails}
              <br />
            </div>
          </div>
        </div>
      </div>
    );
  }

  registerToJobDetails = (event, jobId, companyId) => {
    const data = {
      jobId: jobId,
      companyId: companyId
    };
    axios.post("http://localhost:3001/applyToJob", data).then(response => {
      console.log("Status Code : ", response.status);
      if (response.status === 200) {
        console.log("Applied successfully");
      } else {
        console.log("Error Applying for this Job");
      }
    });
  };

  getAppliedStudents() {
    this.setState({
      redirect: `/jobAppliedStudents/${this.props.match.params.id}`
    });
  }
}
//export Home Component
export default JobDescription;
