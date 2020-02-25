import React, { Component } from "react";
import "../../App.css";
import axios from "axios";
import cookie from "react-cookies";
import { Redirect } from "react-router";

class Home extends Component {
  constructor() {
    super();
    this.state = {
      jobPostings: []
    };
  }
  //get the books data from backend
  componentDidMount() {
    console.log("in componentDidMount");
    axios.get("http://localhost:3001/home").then(response => {
      //update the state with the response data
      console.log("res is  :::", response);
      this.setState({
        jobPostings: this.state.jobPostings.concat(response.data)
      });
    });
  }

  render() {
    //iterate over books to create a table row
    let jobPostings = this.state.jobPostings.map(jobPosting => {
      console.log("xxxx::::", jobPosting);
      return (
        <div class="card text-center">
          <div class="card-header">Job Title : {jobPosting.jobTitle}</div>
          <div class="card-body">
            <h5 class="card-title">Category : {jobPosting.jobCategory}</h5>
            <p class="card-text">Description : {jobPosting.jobdescription}</p>
            <p class="card-text">Posting Date: {jobPosting.postingDate}</p>
            <p class="card-text">
              Application Deadline : {jobPosting.applicationDeadline}
            </p>
            <p class="card-text">
              Salary : {jobPosting.salary}
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
            </p>
          </div>
          <div class="card-footer text-muted">Expires in 3 days</div>
        </div>
      );
    });
    //if not logged in go to login page
    let redirectVar = null;
    if (!cookie.load("cookie")) {
      redirectVar = <Redirect to="/login" />;
    }
    return (
      <div>
        {redirectVar}
        <div class="container">
          <h2>Job postings</h2>
          <table class="table">
            <tbody>
              {/*Display the Tbale row based on data recieved*/}
              {jobPostings}
            </tbody>
          </table>
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
}
//export Home Component
export default Home;
