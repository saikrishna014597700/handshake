import React, { Component } from "react";
import "../../App.css";
import axios from "axios";
import cookie from "react-cookies";
import { Redirect } from "react-router";

class StudentApplication extends Component {
  constructor() {
    super();
    this.state = {
      jobPostings: [],
      redirect: null,
      jobStatus: ""
    };
    this.getJobDetail = this.getJobDetail.bind(this);
    this.handleStatusChange = this.handleStatusChange.bind(this);
  }
  //get the books data from backend
  componentDidMount() {
    console.log("in componentDidMount");
    if (cookie.load("cookie")) {
      axios
        .get(
          `http://localhost:3001/studentjobs/${
            cookie.load("cookie").split("+")[0]
          }`
        )
        .then(response => {
          //update the state with the response data
          this.setState({
            jobPostings: this.state.jobPostings.concat(response.data)
          });
        });
    }
  }

  handleStatusChange = e => {
    if (e.target.value === "Applied Jobs") {
      if (cookie.load("cookie")) {
        axios
          .get(
            `http://localhost:3001/studentjobs/${
              cookie.load("cookie").split("+")[0]
            }`
          )
          .then(response => {
            //update the state with the response data
            if (response.data === "No Job postings!") {
              alert(response.data);
            } else {
              this.setState({
                jobPostings: response.data
              });
            }
          });
      }
    } else {
      const data = {
        status: e.target.value
      };
      console.log("Data is", data);
      if (cookie.load("cookie")) {
        axios
          .post(
            `http://localhost:3001/studentjobsOnStatus/${
              cookie.load("cookie").split("+")[0]
            }`,
            data
          )
          .then(response => {
            if (response.data === "No Job postings!") {
              alert(response.data);
            } else {
              console.log("response is", response);
              //update the state with the response data
              this.setState({
                jobPostings: response.data
              });
            }
          });
      }
    }
  };

  render() {
    if (this.state.redirect) {
      return <Redirect to={this.state.redirect} />;
    }
    //iterate over books to create a table row
    let jobPostings = this.state.jobPostings.map(jobPosting => {
      return (
        <div class="card2">
          <div class="wrapper">
            <img src={require("../jobs.png")} class="image--cover2"></img>
          </div>
          <h4>Job Title : {jobPosting.jobTitle}</h4>
          <h4>Category : {jobPosting.jobCategory}</h4>
          <h4>
            Posting Date: {jobPosting.postingDate}
            <button
              class="btn success"
              onClick={event => this.getJobDetail(event, jobPosting.jobId)}
            >
              View Details
            </button>
          </h4>
          <h4>Application Date : {jobPosting.applicationDate}</h4>
          <h4>Application Status : {jobPosting.applicationStatus}</h4>
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
        <div class="row">
          <h3 class="heading">
            Jobs Applied
            <select
              placeholder="Select Status"
              defaultValue=""
              class="editableinput10"
              name="jobStatus"
              onChange={e => this.handleStatusChange(e)}
            >
              <option value="Applied Jobs">Applied Jobs</option>
              <option value="Pending">Pending</option>
              <option value="Reviewed">Reviewed</option>
              <option value="Declined">Declined</option>
              <option value="Accepted">Accepted</option>
            </select>
          </h3>
          <br />
          <div>{jobPostings}</div>
        </div>
      </div>
    );
  }

  getJobDetail = (event, id) => {
    this.setState({ redirect: `/jobDetails/${id}` });
  };
}
//export Home Component
export default StudentApplication;
