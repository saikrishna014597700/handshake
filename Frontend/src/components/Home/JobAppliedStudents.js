import React, { Component } from "react";
import "../../App.css";
import axios from "axios";
import { backend } from "../../webConfig";
import cookie from "react-cookies";
import { Redirect } from "react-router";
import Popup from "reactjs-popup";
import {
  jobAppliedStudents,
  studentSearchComp
} from "../../actions/fetchStudent";
import { connect } from "react-redux";

// import PDFViewer from "pdf-viewer-reactjs";

class JobAppliedStudents extends Component {
  constructor(props) {
    super(props);
    this.state = {
      students: [],
      studentBasicDetailsResult: [],
      studentAllDetailsResult: [],
      redirect: null,
      searchValue: "",
      status: "",
      status2: "Applied"
    };
    this.getProfileDetails = this.getProfileDetails.bind(this);
    this.handleOnChange = this.handleOnChange.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
    this.handleChange2 = this.handleChange2.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.buildAvatarUrl = this.buildAvatarUrl.bind(this);
  }
  handleOnChange = event => {
    this.setState({ searchValue: event.target.value });
  };
  handleSearch = () => {
    console.log("In Student Search", this.state.searchValue);
    this.props.studentSearchComp(this.state.searchValue).then(
      response => {
        console.log("Students are is", this.props.allStudents);
      },
      error => {
        console.log("Events is", error);
      }
    );
  };
  //get the books data from backend
  componentDidMount() {
    console.log("in componentDidMount");
    const data = {
      jobId: this.props.match.params.id
    };
    this.props.jobAppliedStudents(data).then(
      response => {
        console.log("Job Applied Student is", response, this.props.allStudents);
        this.setState({
          studentBasicDetailsResult: this.props.allStudents
        });
      },
      error => {
        console.log("Error is", error);
      }
    );
  }

  handleChange2(event) {
    this.setState({
      status: event.target.value
    });
  }

  previewResume(e, url) {
    console.log("Hi");
    this.setState({
      previewResume: true
    });
  }

  handleSubmit(event, studentId) {
    event.preventDefault();
    // alert(`You chose the ${this.state.status} pizza.`)
    const data = {
      jobId: this.props.match.params.id,
      studentId: studentId,
      status: this.state.status
    };
    axios
      .post(backend + "/changeJobApplicationsStatus/", data)
      .then(response => {
        //update the state with the response data
        alert(
          `You successfully updated the student status to ${this.state.status}.`
        );
      });
  }

  buildAvatarUrl(fileName) {
    console.log("calling jaffa", fileName);
    return backend + "/file/" + fileName + "/?role=resumes";
  }

  render() {
    if (this.state.redirect) {
      return <Redirect to={this.state.redirect} />;
    }

    //iterate over books to create a table row
    let studentDetails = this.props.allStudents.map(
      studentBasicDetailResult => {
        console.log("aaaa", studentBasicDetailResult);
        console.log("aaaa222", studentBasicDetailResult.studentJobResume);
        return (
          <div class="card2">
            <div class="wrapper">
              <img src={require("../profile.jpg")} class="image--cover2"></img>
            </div>
            <h4>
              Student Name : {studentBasicDetailResult.firstName}{" "}
              {studentBasicDetailResult.lastName}
            </h4>
            <h4>
              Education Level :{" "}
              {studentBasicDetailResult.presentlevelOfEducation}
            </h4>
            <h4>Course : {studentBasicDetailResult.presentCourse}</h4>
            <h4>
              University: {studentBasicDetailResult.collegeName}
              <button
                class="btn success"
                onClick={event =>
                  this.getProfileDetails(event, studentBasicDetailResult._id)
                }
              >
                View Profile
              </button>
            </h4>
            <h4>Graduation Year :{studentBasicDetailResult.graduationYear}</h4>
            <form
              onSubmit={e =>
                this.handleSubmit(e, studentBasicDetailResult.studentId)
              }
            >
              <Popup
                trigger={
                  <a
                    className="aTag"
                    style={{
                      marginTop: "20px",
                      align: "center",
                      color: "#2c87f0"
                    }}
                  >
                    Preview Resume{" "}
                  </a>
                }
                modal
                closeOnDocumentClick
              >
                <div>
                  <embed
                    src={this.buildAvatarUrl(
                      studentBasicDetailResult.studentJobResume
                    )}
                    width="600"
                    height="700"
                    type="application/pdf"
                  ></embed>
                </div>
              </Popup>
              <label style={{ marginTop: "6px", marginLeft: "40px" }}>
                Status :
                <select
                  defaultValue={studentBasicDetailResult.applicationStatus}
                  onChange={e => this.handleChange2(e)}
                >
                  <option value="Pending">Pending</option>
                  <option value="Reviewed">Reviewed</option>
                  <option value="Declined">Declined</option>
                  <option value="Accepted">Accepted</option>
                </select>
              </label>
              <button
                type="submit"
                style={{ marginTop: "6px", marginLeft: "20px" }}
              >
                Update Status
              </button>
            </form>
          </div>
        );
      }
    );
    //if not logged in go to login page
    let redirectVar = null;
    if (!localStorage.cookie) {
      redirectVar = <Redirect to="/login" />;
    }
    return (
      <div>
        {redirectVar}
        <div class="row">
          <h3 class="heading"> Students</h3>
          <br />
          <div>
            <input
              name="text"
              type="text"
              class="searchComponent"
              placeholder="  Search for a Student using First Name / Skillset / College name"
              onChange={event => this.handleOnChange(event)}
              value={this.state.searchValue}
            />
            <button class="button" onClick={this.handleSearch}>
              Search
            </button>
          </div>
          <div>{studentDetails}</div>
        </div>
      </div>
    );
  }
  getProfileDetails = (event, id) => {
    this.setState({ redirect: `/studentprofile/${id}` });
  };
}
const mapStateToProps = state => ({
  allStudents: state.schools.allStudents
});

//export Profile Component
export default connect(mapStateToProps, {
  jobAppliedStudents,
  studentSearchComp
})(JobAppliedStudents);
