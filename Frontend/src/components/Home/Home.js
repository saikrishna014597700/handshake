import React, { Component } from "react";
import "../../App.css";
import axios from "axios";
import { backend } from "../../webConfig";
import cookie from "react-cookies";
import { Redirect } from "react-router";
import {
  fetchJobPostings,
  jobSearchOnName,
  jobSearchOnNameAndCat
} from "../../actions/fetchStudent";
import { connect } from "react-redux";

class Home extends Component {
  constructor(props) {
    super(props);
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
    this.buildAvatarUrl = this.buildAvatarUrl.bind(this);
  }
  //get the books data from backend
  async componentDidMount() {
    if (localStorage.cookie) {
      this.props.fetchJobPostings().then(
        response => {
          console.log("Student Details are is", response.data);
          this.setState({
            jobPostings: this.state.jobPostings.concat(
              this.props.jobPostingsRes
            )
          });
        },
        error => {
          console.log("Events is", error);
        }
      );
      var jobIdss = [];
      axios
        .get(
          backend +
            `/getStudentAppliedJobIds/${localStorage.cookie.split("+")[0]}`
        )
        .then(response => {
          //update the state with the response data
          this.setState({
            studentJobIds: response.data
          });
          console.log("in componentDidMountddd", this.state.studentJobIds);
          if (this.state.studentJobIds && this.state.studentJobIds.length > 0) {
            this.state.studentJobIds.map(studentJobId => {
              jobIdss.push(studentJobId.fk_jobId);
            });
          }
          this.setState({
            jobIds: jobIdss
          });
        });
    }
  }

  buildAvatarUrl(fileName) {
    if (!fileName) {
      fileName = "default.png";
    }
    return backend + "/file/" + fileName + "/?role=company";
  }

  handleOnChange = event => {
    this.setState({ searchValue: event.target.value });
    console.log("Sate", this.state.searchValue);
  };
  handleSearch = () => {
    // axios
    //   .get(backend + `/jobPostingSearch/${this.state.searchValue}`)
    //   .then(response => {
    //     if (response.data === "No Job postings!") {
    //       alert(response.data);
    //     } else {
    //       this.setState({
    //         jobPostings: response.data
    //       });
    //     }
    //   });
    const data = {
      searchValue: this.state.searchValue
    };
    this.props.jobSearchOnName(data).then(
      response => {
        console.log("Student Details are is", response.data);
        this.setState({
          jobPostings: this.props.jobPostingsRes
        });
      },
      error => {
        console.log("Events is", error);
      }
    );
  };

  handleStatusChange = e => {
    if (e.target.value === "All Jobs") {
      const data2 = {
        searchValue: this.state.searchValue
      };
      this.props.jobSearchOnName(data2).then(
        response => {
          console.log("Student Details are is", response.data);
          this.setState({
            jobPostings: this.props.jobPostingsRes
          });
        },
        error => {
          console.log("Events is", error);
        }
      );
    } else {
      const data = {
        category: e.target.value,
        searchValue: this.state.searchValue
      };
      console.log("Data is", data);
      if (localStorage.cookie) {
        this.props.jobSearchOnNameAndCat(data).then(
          response => {
            console.log("Student Details are is", response.data);
            this.setState({
              jobPostings: this.props.jobPostingsRes
            });
          },
          error => {
            console.log("Events is", error);
          }
        );
      }
    }
  };

  render() {
    console.log("IDS are", this.state.jobIds);
    if (this.state.redirect) {
      return <Redirect to={this.state.redirect} />;
    }
    //iterate over books to create a table row
    let jobPostings = this.props.jobPostingsRes.map(jobPosting => {
      let viewButton = "";
      if (jobPosting.applicationDeadline) {
        var applicationDeadline = jobPosting.applicationDeadline.slice(0, 10);
      }
      if (jobPosting.postingDate) {
        var postingDate = jobPosting.postingDate.slice(0, 10);
      }
      console.log("Outside", jobPosting._id);
      if (!this.state.jobIds.includes(jobPosting._id)) {
        viewButton = (
          <button
            class="btn success"
            onClick={event => this.getJobDetail(event, jobPosting._id)}
          >
            View Details
          </button>
        );
      } else {
        viewButton = (
          <button
            disabled
            class="btn success"
            onClick={event => this.getJobDetail(event, jobPosting._id)}
          >
            Already Applied
          </button>
        );
      }
      return (
        <div class="card2">
          <div class="wrapper">
            <img
              src={this.buildAvatarUrl(jobPosting.companyProfilePic)}
              class="image--cover2"
            ></img>
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
    if (!localStorage.cookie) {
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
const mapStateToProps = state => ({
  jobPostingsRes: state.schools.jobPostingsRes
});

//export Profile Component
export default connect(mapStateToProps, {
  fetchJobPostings,
  jobSearchOnName,
  jobSearchOnNameAndCat
})(Home);
