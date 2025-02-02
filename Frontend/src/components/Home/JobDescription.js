import React, { Component } from "react";
import "../../profile.css";
import "../../App.css";
import axios from "axios";
import { backend } from "../../webConfig";
import cookie from "react-cookies";
import { Redirect } from "react-router";
import {
  fetchParticularJob,
  fetchParticularCompany
} from "../../actions/fetchStudent";
import { connect } from "react-redux";

class JobDescription extends Component {
  constructor() {
    super();
    this.state = {
      jobDetails: [],
      companyDetails: [],
      redirect: null,
      fileData: null
    };
    this.initialState = {
      job: [],
      company: []
    };
    this.props = this.initialState;
    this.registerToJobDetails = this.registerToJobDetails.bind(this);
    this.getAppliedStudents = this.getAppliedStudents.bind(this);
    this.gotoCompanyProfile = this.gotoCompanyProfile.bind(this);
  }
  //get the books data from backend
  componentDidMount() {
    console.log("in componentDidMount", this.props.match.params.id);
    if (localStorage.cookie) {
      this.props.fetchParticularJob(this.props.match.params.id).then(
        response => {
          this.props.fetchParticularCompany(this.props.job[0].companyId).then(
            response => {
              console.log("Got Company data");
            },
            error => {
              console.log("Events is", error);
            }
          );
        },
        error => {
          console.log("Events is", error);
        }
      );
    }
  }
  onFileChange(e, id) {
    let fileData = new FormData();
    console.log("fileData in state", this.state.fileData);
    fileData.append("file", e.target.files[0]);
    console.log("fileData modified", fileData);
    this.setState({
      fileData: e.target.files[0]
    });
  }

  render() {
    if (this.state.redirect) {
      return <Redirect to={this.state.redirect} />;
    }

    //iterate over books to create a table row
    let jobDetails = this.props.job.map(jobPosting => {
      console.log("xxxx::::", jobPosting);
      return (
        <div class="card3">
          <h4>
            <b>Job Title </b>: {jobPosting.jobTitle}
          </h4>
          <h4>
            <b>Category </b>: {jobPosting.jobCategory}
          </h4>
          <h4>
            <b>Posting Date</b>: {jobPosting.postingDate}
          </h4>
          <h4>
            <b>Application Deadline</b>:{jobPosting.applicationDeadline}
          </h4>
          <h4>
            <b>Salary </b>: {jobPosting.salary}
          </h4>
          <br />
          <br />
          <h3>
            <b>Job Description</b>:{" "}
          </h3>
          <h4>{jobPosting.jobdescription}</h4>
          <br />
          <br />
          <h4>
            <b>Job Duties</b>:{" "}
          </h4>
          <h4>{jobPosting.duties}</h4>
          <br />
          <br />
          <h4>
            <b>Job Qualification</b>:{" "}
          </h4>
          <h4>{jobPosting.qualifications}</h4>
          <br />
          <br />

          <h4>
            <b>Job Requirements</b>:{" "}
          </h4>
          <h4>{jobPosting.requirements}</h4>
          <br />
          <br />
        </div>
      );
    });

    let companyDetails = this.props.company.map(companyDetail => {
      return (
        <div class="card3">
          <h4> Name : {companyDetail.companyName}</h4>
          <h4> Location : {companyDetail.location}</h4>
          <h4>Website Url: {companyDetail.websiteUrl}</h4>
          <h4>Phone: {companyDetail.phoneNumber}</h4>
          <h4>Email: {companyDetail.email} </h4>
          <br />
          <button
            class="btn4 success"
            onClick={event => this.gotoCompanyProfile(event, companyDetail._id)}
          >
            View Profile
          </button>
          <br />
          <br />
        </div>
      );
    });

    //if not logged in go to login page
    let redirectVar = null;
    if (!localStorage.cookie) {
      redirectVar = <Redirect to="/login" />;
    }
    let viewRegisteredStudents;

    if (
      localStorage.cookie &&
      localStorage.cookie.split("+")[1] === "company"
    ) {
      viewRegisteredStudents = (
        <button
          class="btn success"
          onClick={event => this.getAppliedStudents()}
        >
          Students Applied
        </button>
      );
    }

    if (
      localStorage.cookie &&
      localStorage.cookie.split("+")[1] === "student"
    ) {
      viewRegisteredStudents = (
        <div>
          <p style={{ fontSize: "18px" }}>
            Upload your Resume with your skills and experiences
          </p>
          <input
            type="file"
            name="file"
            className="editableinput12"
            onChange={e => this.onFileChange(e, this.props.match.params.id)}
          />
          <button
            class="btn success"
            onClick={event =>
              this.registerToJobDetails(
                event,
                this.props.match.params.id,
                this.state.jobDetails[0].fk_companyId
              )
            }
          >
            Apply
          </button>
        </div>
      );
    }
    return (
      <div>
        {redirectVar}
        <div class="row">
          <div class="leftcolumn">
            <h4 class="heading"> Job Description</h4>
            <br />
            {jobDetails}
          </div>
          <div class="rightcolumn">
            <div class="card4">
              <h4>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Company
                Profile
              </h4>
              <br />
              <div class="wrapper2">
                <img src={require("../jobs.png")} class="image--cover2"></img>
              </div>
              {companyDetails}
              <br />
            </div>
          </div>
        </div>
        <div class="footer">
          <div class="card">
            <div>{viewRegisteredStudents}</div>
          </div>
        </div>
      </div>
    );
  }

  async registerToJobDetails(event, jobId, companyId) {
    if (localStorage.cookie) {
      const dataArray = new FormData();
      dataArray.append("file", this.state.fileData);
      if (localStorage.cookie) {
        var studentId = localStorage.cookie.split("+")[0];
      }
      var resumePath;
      console.log("JobId::", this.props.match.params.id);
      var uploadData = {
        dataArray: dataArray
      };
      await axios
        .post(
          backend +
            "/uploadFile/?studentId=" +
            studentId +
            "&jobId=" +
            this.props.match.params.id +
            "&type=resume",
          dataArray
        )
        .then(response => {
          console.log("Status Code : ", response);
          if (response.status === 200) {
            resumePath = response.data.filename;
            console.log("path:", resumePath);
          } else {
            console.log("Error in saving application");
          }
        });
      if (localStorage.cookie) {
        const data = {
          jobId: jobId,
          companyId: companyId,
          studentId: localStorage.cookie.split("+")[0],
          resumePath: resumePath
        };
        axios.post(backend + "/applyToJob", data).then(response => {
          console.log("Status Code : ", response.status);
          if (response.status === 200) {
            console.log("Applied successfully");
            alert("Applied successfully");
          } else {
            console.log("Error Applying for this Job");
          }
        });
      }
    }
  }

  getAppliedStudents() {
    this.setState({
      redirect: `/jobAppliedStudents/${this.props.match.params.id}`
    });
  }

  gotoCompanyProfile(e, id) {
    this.setState({
      redirect: `/studentcompanyprofile/${id}`
    });
  }
}

//export Home Component
const mapStateToProps = state => ({
  job: state.schools.job,
  company: state.schools.company
});

//export Profile Component
export default connect(mapStateToProps, {
  fetchParticularJob,
  fetchParticularCompany
})(JobDescription);
