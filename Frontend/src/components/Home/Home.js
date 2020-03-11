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
      redirect: null,
      searchValue: ""
    };
    this.getJobDetail = this.getJobDetail.bind(this);
    this.handleOnChange = this.handleOnChange.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
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

  handleOnChange = event => {
    this.setState({ searchValue: event.target.value });
  };
  handleSearch = () => {
    axios
      .get(`http://localhost:3001/jobPostingSearch/${this.state.searchValue}`)
      .then(response => {
        if (response.data === "No Job postings!") {
          alert(response.data);
        } else {
          this.setState({
            jobPostings: response.data
          });
        }
      });
  };

  handleStatusChange = e => {
    if (e.target.value === "All Jobs") {
      axios
        .get(`http://localhost:3001/jobPostingSearch/${this.state.searchValue}`)
        .then(response => {
          if (response.data === "No Job postings!") {
            alert(response.data);
          } else {
            this.setState({
              jobPostings: response.data
            });
          }
        });
    } else {
      const data = {
        status: e.target.value
      };
      console.log("Data is", data);
      axios
        .post(
          `http://localhost:3001/studentjobsOnCategory/${
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
  };

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
          <h4>Location : {jobPosting.jobLocation}</h4>
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
            {" "}
            Job Postings
            <select
              placeholder="Select Status"
              defaultValue=""
              class="editableinput10"
              name="jobStatus"
              onChange={e => this.handleStatusChange(e)}
            >
              <option value="All Jobs">All Jobs</option>
              <option value="Part Time">Part Time</option>
              <option value="On Campus">On Campus</option>
              <option value="Internship">Internship</option>
              <option value="Full Time">Full Time</option>
            </select>
          </h3>
          <br />
          <br />
          <div>
            <input
              name="text"
              type="text"
              class="searchComponent"
              placeholder="  Search for an Job Posting with Title / Location / company Name"
              onChange={event => this.handleOnChange(event)}
              value={this.state.searchValue}
            />
            <button class="button" onClick={this.handleSearch}>
              Search
            </button>
          </div>
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
