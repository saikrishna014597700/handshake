import React, { Component } from "react";
import "../../profile.css";
import axios from "axios";
import { backend } from "../../webConfig";
import cookie from "react-cookies";
import { Redirect } from "react-router";
import { Link } from "react-router-dom";
import listReactFiles from "list-react-files";
import {
  fetchStudent,
  fetchStudentDetails,
  fetchEduDetails,
  fetchWorkExpDetails
} from "../../actions/fetchStudent";
import { connect } from "react-redux";

class Profile extends Component {
  constructor() {
    super();
    console.log("Hii");
    this.initialState = {
      studentObject: [],
      studentExperience: [],
      studentEducation: [],
      studentBasicDetails: []
    };
    this.props = this.initialState;
    this.buildAvatarUrl = this.buildAvatarUrl.bind(this);
  }
  //get the books data from backend
  componentDidMount() {
    console.log("this.props", this.props);
    var studentId = cookie.load("cookie").split("+")[0];
    this.props.fetchStudent(studentId);
    this.props.fetchStudentDetails(studentId);
    this.props.fetchEduDetails(studentId);
    this.props.fetchWorkExpDetails(studentId);
  }

  redirecttoUpdateProfilePage() {
    this.props.history.push("/UpdateProfile");
  }

  buildAvatarUrl(fileName) {
    return backend+"/file/" + fileName + "/?role=students";
  }

  render() {
    //iterate over books to create a table row
    let myJourneys = this.props.studentBasicDetails.map(myJourne => {
      return (
        <div>
          <Link
            to={`/profile/carrierObjective/${myJourne.studentDetailsId}`}
            activeClassName="active"
          ></Link>
          <h4>
            <b>Carrier Objective</b>
          </h4>
          <br />

          <h5>{myJourne.carrierObjective}</h5>
        </div>
      );
    });
    let profilePic = this.props.studentObject.map(obj => {
      if (obj.studentProfilePic) {
        var path = obj.studentProfilePic;
        return (
          <div key={obj.studentId} className="wrapper2">
            <img
              src={this.buildAvatarUrl(path)}
              className="image--cover3"
              alt="Loading.."
            />
          </div>
        );
      } else {
        var path2 = "default.png";
        return (
          <div key={obj.studentId} className="wrapper2">
            <img
              src={this.buildAvatarUrl(path2)}
              className="image--cover3"
              alt="Loading.."
            />
          </div>
        );
      }
    });
    let studentDetails = this.props.studentObject.map(
      studentBasicDetailResult => {
        return (
          <div class="card">
            <h3>
              {studentBasicDetailResult.firstName}{" "}
              {studentBasicDetailResult.lastName}
            </h3>
            <br />
            <br />

            {profilePic}
            <br />
            <h5>
              <b>Degree</b> : {studentBasicDetailResult.presentlevelOfEducation}
            </h5>
            <h5>
              <b>Major</b> : {studentBasicDetailResult.presentCourse}
            </h5>
            <h5>
              <b>University </b>: {studentBasicDetailResult.collegeName}
            </h5>
            <h5>
              <b>Graduation Year </b>:{studentBasicDetailResult.graduationYear}
            </h5>
          </div>
        );
      }
    );
    let studentDetails2 = this.props.studentBasicDetails.map(
      studentBasicDetailResult => {
        return (
          <div class="card">
            <h4>
              <b>Contact Information</b>
            </h4>
            <br />
            <h5>
              <b>Phone Number </b>: {studentBasicDetailResult.phoneNumber}
            </h5>
            <h5>
              <b>Address </b>: {studentBasicDetailResult.city}
              {","}
              {studentBasicDetailResult.state}
              {","}
              {studentBasicDetailResult.country}
            </h5>
            <h5>
              <b>DOB </b>: {studentBasicDetailResult.dob}
            </h5>
          </div>
        );
      }
    );
    let studentDetails3 = this.props.studentBasicDetails.map(
      studentBasicDetailResult => {
        return (
          <div>
            <br />
            <h5>{studentBasicDetailResult.skillSet}</h5>
          </div>
        );
      }
    );

    //iterate over books to create a table row
    let studentEducationDetails = this.props.studentEducation.map(
      studentAllEduDetailResult => {
        console.log("xxxx::::", studentAllEduDetailResult);
        return (
          <div class="card">
            <h5>
              <b>College</b> : {studentAllEduDetailResult.collegeName}
            </h5>
            <h5>
              <b>Degree </b>: {studentAllEduDetailResult.degree}
            </h5>
            <h5>
              <b>Major </b>: {studentAllEduDetailResult.major}
            </h5>
            <h5>
              <b>CGPA </b>: {studentAllEduDetailResult.cgpa}
            </h5>
            <h5>
              <b>Graduating Year</b> : {studentAllEduDetailResult.yearofPassing}
            </h5>
          </div>
        );
      }
    );

    //iterate over books to create a table row
    let studentWorkDetails = this.props.studentExperience.map(
      studentAllWorkDetailResult => {
        console.log("xxxx::::", studentAllWorkDetailResult);
        return (
          <div class="card">
            <h5>
              <b>Company</b> : {studentAllWorkDetailResult.companyName}
            </h5>
            <h5>
              <b>Title</b> : {studentAllWorkDetailResult.title}
            </h5>
            <h5>
              <b>Duration</b> : {studentAllWorkDetailResult.startDate}
              {"-"}
              {studentAllWorkDetailResult.endDate}
            </h5>
            <h5>
              <b>Description</b> : {studentAllWorkDetailResult.description}
            </h5>
          </div>
        );
      }
    );

    let redirectVar = null;
    if (!cookie.load("cookie")) {
      redirectVar = <Redirect to="/login" />;
    }
    return (
      <div>
        {redirectVar}
        <body>
          <button
            class="btn success"
            onClick={this.redirecttoUpdateProfilePage.bind(this)}
          >
            Edit Profile
          </button>
          <div class="row">
            <div class="leftcolumn">
              <div class="card">
                <p>{myJourneys}</p>
              </div>

              <h4 class="Profileheading">
                <b>Education</b>
              </h4>

              {studentEducationDetails}

              <h4 class="Profileheading">
                <b>Work Experience</b>
              </h4>

              {studentWorkDetails}
            </div>
            <div class="rightcolumn">
              {studentDetails}
              {studentDetails2}
              <div class="card">
                <h4>
                  <b>Skills</b>
                </h4>
                {studentDetails3}
              </div>
            </div>
          </div>

          {/* <div class="footer">
            <h2></h2>
          </div> */}
        </body>
      </div>
    );
  }
}
const mapStateToProps = state => ({
  studentObject: state.schools.studentObject,
  studentBasicDetails: state.schools.studentBasicDetails,
  studentExperience: state.schools.studentExperience,
  studentEducation: state.schools.studentEducation
});

//export Profile Component
export default connect(mapStateToProps, {
  fetchStudent,
  fetchStudentDetails,
  fetchEduDetails,
  fetchWorkExpDetails
})(Profile);
