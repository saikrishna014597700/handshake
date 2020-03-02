import React, { Component } from "react";
import "../../App.css";
import axios from "axios";
import cookie from "react-cookies";
import { Redirect } from "react-router";

class Home extends Component {
  constructor() {
    super();
    this.state = {
      jobPostings: [],
      redirect: null
    };
    this.getJobDetail = this.getJobDetail.bind(this);
  }
  //get the books data from backend
  componentDidMount() {
    console.log("in componentDidMount");
    axios.get("http://localhost:3001/home").then(response => {
      //update the state with the response data
      this.setState({
        jobPostings: this.state.jobPostings.concat(response.data)
      });
    });
  }

  render() {
    if (this.state.redirect) {
      return <Redirect to={this.state.redirect} />;
    }
    //iterate over books to create a table row
    let jobPostings = this.state.jobPostings.map(jobPosting => {
      console.log("xxxx::::", jobPosting);
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
          {/* <h4>Posting Date: {jobPosting.postingDate}</h4> */}
          <h4>Application Deadline:{jobPosting.applicationDeadline}</h4>
          <h4>Salary : {jobPosting.salary}</h4>
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
          <h3 class="heading"> Job Postings</h3>
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
export default Home;
