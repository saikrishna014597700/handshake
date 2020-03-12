import React, { Component } from "react";
import "../../App.css";
import axios from "axios";
import { backend } from "../../webConfig";
import cookie from "react-cookies";
import { Redirect } from "react-router";

class Home extends Component {
  constructor() {
    super();
    this.state = {
      jobPostings: [],
      redirect: null,
      searchValue: "",
      studentJobIds: [],
      jobIds: []
    };
    this.getJobDetail = this.getJobDetail.bind(this);
    this.handleOnChange = this.handleOnChange.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
  }
  //get the books data from backend
  componentDidMount() {
    console.log("in componentDidMount");
    axios.get(backend+"/home").then(response => {
      //update the state with the response data
      this.setState({
        jobPostings: this.state.jobPostings.concat(response.data)
      });
    });
    if (cookie.load("cookie")) {
      var jobIdss = [];
      axios
        .get(
          backend +
            `/getStudentAppliedJobIds/${cookie.load("cookie").split("+")[0]}`
        )
        .then(response => {
          //update the state with the response data
          this.setState({
            studentJobIds: response.data
          });
          this.state.studentJobIds.map(studentJobId => {
            jobIdss.push(studentJobId.fk_jobId);
          });
          this.setState({
            jobIds: jobIdss
          });
        });
    }
  }

  handleOnChange = event => {
    this.setState({ searchValue: event.target.value });
  };
  handleSearch = () => {
    axios
      .get(backend + `/jobPostingSearch/${this.state.searchValue}`)
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
        .get(backend + `/jobPostingSearch/${this.state.searchValue}`)
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
        category: e.target.value,
        searchValue: this.state.searchValue
      };
      console.log("Data is", data);
      if (cookie.load("cookie")) {
        axios
          .post(
            backend +
              `/studentjobsOnCategory/${cookie.load("cookie").split("+")[0]}`,
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
    console.log("IDS are", this.state.jobIds);
    if (this.state.redirect) {
      return <Redirect to={this.state.redirect} />;
    }
    //iterate over books to create a table row
    let jobPostings = this.state.jobPostings.map(jobPosting => {
      let viewButton = "";
      if (jobPosting.applicationDeadline) {
        var applicationDeadline = jobPosting.applicationDeadline.slice(0, 10);
      }
      if (jobPosting.postingDate) {
        var postingDate = jobPosting.postingDate.slice(0, 10);
      }
      console.log("Outside", jobPosting.jobId);
      if (!this.state.jobIds.includes(jobPosting.jobId)) {
        viewButton = (
          <button
            class="btn success"
            onClick={event => this.getJobDetail(event, jobPosting.jobId)}
          >
            View Details
          </button>
        );
      } else {
        viewButton = (
          <button
            disabled
            class="btn success"
            onClick={event => this.getJobDetail(event, jobPosting.jobId)}
          >
            Already Applied
          </button>
        );
      }
      return (
        <div class="card2">
          <div class="wrapper">
            <img src={require("../jobs.png")} class="image--cover2"></img>
          </div>
          <h4>Job Title : {jobPosting.jobTitle}</h4>
          <h4>Category : {jobPosting.jobCategory}</h4>
          <h4>
            Posting Date: {postingDate}
            {viewButton}
          </h4>
          {/* <h4>Posting Date: {jobPosting.postingDate}</h4> */}
          <h4>Application Deadline:{applicationDeadline}</h4>
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
          <h3 class="heading"> Job Postings</h3>
          <br />
          <br />
          <div>
            <input
              name="text"
              type="text"
              class="searchComponent3"
              placeholder="  Search for an Job Posting with Title / Location / company Name"
              onChange={event => this.handleOnChange(event)}
              value={this.state.searchValue}
            />
            <select
              placeholder="Select Status"
              defaultValue=""
              class="editableinput11"
              name="jobStatus"
              onChange={e => this.handleStatusChange(e)}
            >
              <option value="All Jobs">All Jobs</option>
              <option value="Part Time">Part Time</option>
              <option value="On Campus">On Campus</option>
              <option value="Internship">Internship</option>
              <option value="Full Time">Full Time</option>
            </select>
            <button class="button" onClick={this.handleSearch}>
              Search
            </button>
            <br />
            <br />
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
