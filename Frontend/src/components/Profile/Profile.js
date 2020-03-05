import React, { Component } from "react";
import "../../profile.css";
import axios from "axios";
import cookie from "react-cookies";
import { Redirect } from "react-router";
import { Link } from "react-router-dom";
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

  render() {
    //iterate over books to create a table row
    let myJourneys = this.props.studentBasicDetails.map(myJourne => {
      return (
        <div>
          <Link
            to={`/profile/carrierObjective/${myJourne.studentDetailsId}`}
            activeClassName="active"
          ></Link>

          <br />
          <h4>{myJourne.carrierObjective}</h4>
        </div>
      );
    });
    let studentDetails = this.props.studentObject.map(
      studentBasicDetailResult => {
        return (
          <div class="card">
            <h2>
              {studentBasicDetailResult.firstName}{" "}
              {studentBasicDetailResult.lastName}
            </h2>
            <br />
            <div class="wrapper">
              <img src={require("../profile.jpg")} class="image--cover3"></img>
            </div>
            <br />
            <h4>
              {studentBasicDetailResult.presentlevelOfEducation} {"in"}{" "}
              {studentBasicDetailResult.presentCourse}
            </h4>
            <h4>{studentBasicDetailResult.collegeName}</h4>
            <h4>
              {"Graduation Year: "}
              {studentBasicDetailResult.graduationYear}
            </h4>
          </div>
        );
      }
    );
    let studentDetails2 = this.props.studentBasicDetails.map(
      studentBasicDetailResult => {
        return (
          <div class="card">
            <h3>Contact Information</h3>
            <br />
            <h4>Phone Number : {studentBasicDetailResult.phoneNumber}</h4>
            <h4>
              Address : {studentBasicDetailResult.city}
              {","}
              {studentBasicDetailResult.state}
              {","}
              {studentBasicDetailResult.country}
            </h4>
            <h4>DOB : {studentBasicDetailResult.dob}</h4>
          </div>
        );
      }
    );
    let studentDetails3 = this.props.studentBasicDetails.map(
      studentBasicDetailResult => {
        return (
          <div>
            <br />
            <h4>{studentBasicDetailResult.skillSet}</h4>
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
            <h3>{studentAllEduDetailResult.collegeName}</h3>
            <h4>{studentAllEduDetailResult.degree}</h4>
            <h4>{studentAllEduDetailResult.major}</h4>
            <h4>Year of Passing: {studentAllEduDetailResult.yearofPassing}</h4>
            <h4>CGPA: {studentAllEduDetailResult.cgpa}</h4>
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
            <h3>{studentAllWorkDetailResult.companyName}</h3>
            <h4>{studentAllWorkDetailResult.title}</h4>
            <h4>
              {studentAllWorkDetailResult.startDate}
              {"-"}
              {studentAllWorkDetailResult.endDate}
            </h4>
            <h4>{studentAllWorkDetailResult.description}</h4>
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
              <h2>My Journey</h2>
              <div class="card">
                <p>{myJourneys}</p>
              </div>
              <br />
              <h2 class="Profileheading">Education</h2>

              {studentEducationDetails}
              <br />
              <h2 class="Profileheading">Work Experience</h2>

              {studentWorkDetails}
            </div>
            <div class="rightcolumn">
              {studentDetails}
              {studentDetails2}
              <div class="card">
                <h3>Skills</h3>
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
