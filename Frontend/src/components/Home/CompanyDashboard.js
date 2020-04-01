import React, { Component } from "react";
import "../../App.css";
import axios from "axios";
import { backend } from "../../webConfig";
import cookie from "react-cookies";
import { Redirect } from "react-router";

class CompanyDashboard extends Component {
  constructor() {
    super();
    this.state = {
      company: [],
      companyJobPostings: [],
      redirect: null,
      createJobFlag: false,
      jobTitle: "",
      location: "",
      applicationDeadline: "",
      salary: "",
      jobDescription: "",
      duties: "",
      requirements: "",
      qualifications: "",
      jobCategory: "Full Time",
      searchValue: ""
    };
    this.getJobDetail = this.getJobDetail.bind(this);
    this.createJob = this.createJob.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.submitJobPosting = this.submitJobPosting.bind(this);
    this.cancelJobPosting = this.cancelJobPosting.bind(this);
    this.handleOnChange = this.handleOnChange.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
    this.buildAvatarUrl = this.buildAvatarUrl.bind(this);
  }
  //get the books data from backend
  componentDidMount() {
    console.log("in componentDidMount");
    if (cookie.load("cookie")) {
      axios
        .get(
          backend + `/companyJobPostings/${cookie.load("cookie").split("+")[0]}`
        )
        .then(response => {
          this.setState({
            companyJobPostings: this.state.companyJobPostings.concat(
              response.data
            )
          });
        });
    }
  }

  handleOnChange = event => {
    this.setState({ searchValue: event.target.value });
  };

  handleSearch = () => {
    if (cookie.load("cookie")) {
      const data = {
        companyId: cookie.load("cookie").split("+")[0]
      };
      axios
        .post(
          backend + `/companyjobPostingSearch/${this.state.searchValue}`,
          data
        )
        .then(response => {
          if (response.data === "No Job postings!") {
            alert(response.data);
          } else {
            this.setState({
              companyJobPostings: response.data
            });
          }
        });
    }
  };

  buildAvatarUrl(fileName) {
    if (!fileName) {
      fileName = "default.png";
    }
    return backend + "/file/" + fileName + "/?role=company";
  }

  handleStatusChange = e => {
    console.log("e.target.value", e.target.value);
    if (cookie.load("cookie")) {
      if (e.target.value === "All Jobs") {
        axios
          .get(
            backend +
              `/companyJobPostings/${cookie.load("cookie").split("+")[0]}`
          )
          .then(response => {
            this.setState({
              companyJobPostings: this.state.companyJobPostings.concat(
                response.data
              )
            });
          });
      }
    } else {
      const data = {
        category: e.target.value,
        searchValue: this.state.searchValue
      };
      if (cookie.load("cookie")) {
        console.log("Data is", data);
        axios
          .post(
            backend +
              `/companyjobPostingSearchOnCategory/${
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
                companyJobPostings: response.data
              });
            }
          });
      }
    }
  };

  handleChange = (e, name) => {
    console.log(name, this.state.qualifications);
    this.setState({
      [name]: e.target.value
    });
    console.log(name, this.state.qualifications);
  };

  render() {
    if (this.state.createJobFlag) {
      var createJob = (
        <div class="card2">
          <form>
            <label style={{ marginTop: "18px", marginLeft: "40px" }}>
              Job Title:
              <br />
              <input
                class="editableinput5"
                value={this.state.value}
                onChange={e => this.handleChange(e, "jobTitle")}
                name="jobTitle"
                style={{ marginTop: "15px" }}
              />
            </label>
            <br />
            <label style={{ marginTop: "18px", marginLeft: "40px" }}>
              Location:
              <br />
              <input
                class="editableinput5"
                value={this.state.value}
                onChange={e => this.handleChange(e, "location")}
                name="location"
                style={{ marginTop: "20px" }}
              />
            </label>
            <br />
            <label style={{ marginTop: "18px", marginLeft: "40px" }}>
              Deadline:
              <br />
              {/* <input
                class="editableinput5"
                value={this.state.value}
                onChange={e =>
                  this.handleChange(
                    e,

                    "applicationDeadline"
                  )
                }
                name="applicationDeadline"
                style={{ marginTop: "20px" }}
              /> */}
              <input
                type="date"
                class="editableinput5"
                name="applicationDeadline"
                min="2019-01-01"
                max="2030-12-31"
                onChange={e =>
                  this.handleChange(
                    e,

                    "applicationDeadline"
                  )
                }
              ></input>
            </label>
            <br />
            <label style={{ marginTop: "18px", marginLeft: "40px" }}>
              Salary:
              <br />
              <input
                class="editableinput5"
                value={this.state.value}
                onChange={e =>
                  this.handleChange(
                    e,

                    "salary"
                  )
                }
                name="salary"
                style={{ marginTop: "20px" }}
              />
            </label>
            <br />
            <label style={{ marginTop: "18px", marginLeft: "40px" }}>
              Description:
              <br />
              <input
                class="editableinput6"
                value={this.state.value}
                rows="10"
                cols="30"
                onChange={e =>
                  this.handleChange(
                    e,

                    "jobDescription"
                  )
                }
                name="jobDescription"
                style={{ marginTop: "20px" }}
              />
            </label>
            <br />
            {/* <label style={{ marginTop: "18px", marginLeft: "40px" }}>
              Category:
              <br />
              <input
                class="editableinput5"
                value={this.state.value}
                onChange={e =>
                  this.handleChange(
                    e,

                    "jobCategory"
                  )
                }
                name="jobCategory"
                style={{ marginTop: "20px" }}
              />
            </label> */}
            <label style={{ marginTop: "18px", marginLeft: "40px" }}>
              Job Category :
              <br />
              <br />
              <select
                value={this.state.jobCategory}
                class="editableinput4"
                onChange={e => this.handleChange(e, "jobCategory")}
              >
                <option value="Full Time">Full Time</option>
                <option value="Internship">Internship</option>
                <option value="Part Time">Part Time</option>
                <option value="On Campus">On Campus</option>
              </select>
            </label>
            <br />
            <label style={{ marginTop: "18px", marginLeft: "40px" }}>
              Duties:
              <br />
              <input
                class="editableinput6"
                value={this.state.value}
                onChange={e =>
                  this.handleChange(
                    e,

                    "duties"
                  )
                }
                name="duties"
                style={{ marginTop: "20px" }}
              />
            </label>
            <br />
            <label style={{ marginTop: "18px", marginLeft: "40px" }}>
              Requirements:
              <br />
              <input
                class="editableinput6"
                value={this.state.value}
                onChange={e =>
                  this.handleChange(
                    e,

                    "requirements"
                  )
                }
                name="requirements"
                style={{ marginTop: "20px" }}
              />
            </label>
            <br />
            <label style={{ marginTop: "18px", marginLeft: "40px" }}>
              Qualifications:
              <br />
              <input
                class="editableinput5"
                value={this.state.value}
                onChange={e =>
                  this.handleChange(
                    e,

                    "qualifications"
                  )
                }
                name="qualifications"
                style={{ marginTop: "20px" }}
              />
            </label>
            <br />
            <br />
            <br />
            <button
              class="btn2 success"
              onClick={event => this.cancelJobPosting(event)}
            >
              Cancel
            </button>
            <button
              class="btn3 success"
              onClick={event => this.submitJobPosting(event)}
            >
              Submit
            </button>
          </form>
          <br />
          <br />
          <br />
        </div>
      );
    }
    let redirectVar = null;
    console.log("Cookie is", cookie.load("cookie"));
    if (!cookie.load("cookie")) {
      redirectVar = <Redirect to="/login" />;
    }
    if (this.state.redirect) {
      return <Redirect to={this.state.redirect} />;
    }
    let companyJobPosting = this.state.companyJobPostings.map(jobPosting => {
      if (jobPosting.applicationDeadline) {
        var applicationDeadline = jobPosting.applicationDeadline.slice(0, 10);
      }
      if (jobPosting.postingDate) {
        var postingDate = jobPosting.postingDate.slice(0, 10);
      }
      return (
        <div class="card2">
          <div class="wrapper">
            <img
              src={this.buildAvatarUrl(jobPosting.companyProfilePic)}
              class="image--cover2"
            ></img>
          </div>
          <h4>
            Job Title&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;: &nbsp;&nbsp;&nbsp;&nbsp;
            {jobPosting.jobTitle}
          </h4>
          <h4>
            Category &nbsp;&nbsp;&nbsp;: &nbsp;&nbsp;&nbsp;&nbsp;
            {jobPosting.jobCategory}
          </h4>
          <h4>
            Posted On&nbsp;&nbsp;: &nbsp;&nbsp;&nbsp;{postingDate}
            <button
              class="btn success"
              onClick={event => this.getJobDetail(event, jobPosting.jobId)}
            >
              View Details
            </button>
          </h4>
          {/* <h4>Posting Date: {jobPosting.postingDate}</h4> */}
          <h4>
            Deadline&nbsp;&nbsp;&nbsp;&nbsp;:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            {applicationDeadline}
          </h4>
          <h4>
            Location &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:
            &nbsp;&nbsp;&nbsp;&nbsp;
            {jobPosting.jobLocation}
          </h4>
        </div>
      );
    });

    return (
      <div>
        {redirectVar}
        <div class="row">
          <h3 class="heading">
            Job Postings
            <button
              class="btn3 success"
              onClick={event => this.createJob(event)}
            >
              Post a Job
            </button>
          </h3>
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
          </div>
          {createJob}
          <br />
          <div>{companyJobPosting}</div>
        </div>
      </div>
    );
  }
  getJobDetail = (event, id) => {
    this.setState({ redirect: `/jobDetails/${id}` });
  };

  createJob = event => {
    this.setState({ createJobFlag: true });
  };
  submitJobPosting = event => {
    const data = {
      jobTitle: this.state.jobTitle,
      location: this.state.location,
      applicationDeadline: this.state.applicationDeadline,
      salary: this.state.salary,
      jobDescription: this.state.jobDescription,
      jobCategory: this.state.jobCategory,
      duties: this.state.duties,
      requirements: this.state.requirements,
      qualifications: this.state.qualifications,
      companyId: cookie.load("cookie").split("+")[0]
    };
    axios.post(backend + "/postJob", data).then(response => {
      this.setState({
        companyJobPostings: response.data
      });
    });
    this.setState({ createJobFlag: false });
  };
  cancelJobPosting = event => {
    this.setState({ createJobFlag: false });
  };
}
//export Home Component
export default CompanyDashboard;
