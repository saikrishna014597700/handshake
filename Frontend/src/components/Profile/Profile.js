import React, { Component } from "react";
import "../../profile.css";
import axios from "axios";
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
          <h4>Carrier Objective</h4>
          <br />

          <h5>{myJourne.carrierObjective}</h5>
        </div>
      );
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

            <div class="wrapper2">
              <img src={require("../profile.jpg")} class="image--cover3"></img>
            </div>
            <br />
            <h5>Degree : {studentBasicDetailResult.presentlevelOfEducation}</h5>
            <h5>Major : {studentBasicDetailResult.presentCourse}</h5>
            <h5>University : {studentBasicDetailResult.collegeName}</h5>
            <h5>
              {"Graduation Year : "}
              {studentBasicDetailResult.graduationYear}
            </h5>
          </div>
        );
      }
    );
    let studentDetails2 = this.props.studentBasicDetails.map(
      studentBasicDetailResult => {
        return (
          <div class="card">
            <h4>Contact Information</h4>
            <br />
            <h5>Phone Number : {studentBasicDetailResult.phoneNumber}</h5>
            <h5>
              Address : {studentBasicDetailResult.city}
              {","}
              {studentBasicDetailResult.state}
              {","}
              {studentBasicDetailResult.country}
            </h5>
            <h5>DOB : {studentBasicDetailResult.dob}</h5>
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
            <h5>College Name : {studentAllEduDetailResult.collegeName}</h5>
            <h5>Level of Education : {studentAllEduDetailResult.degree}</h5>
            <h5>Major : {studentAllEduDetailResult.major}</h5>
            <h5>Graduating Year : {studentAllEduDetailResult.yearofPassing}</h5>
            <h5>CGPA : {studentAllEduDetailResult.cgpa}</h5>
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
            <h5>{studentAllWorkDetailResult.companyName}</h5>
            <h5>{studentAllWorkDetailResult.title}</h5>
            <h5>
              {studentAllWorkDetailResult.startDate}
              {"-"}
              {studentAllWorkDetailResult.endDate}
            </h5>
            <h5>{studentAllWorkDetailResult.description}</h5>
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

              <h4 class="Profileheading">Education</h4>

              {studentEducationDetails}

              <h4 class="Profileheading">Work Experience</h4>

              {studentWorkDetails}
            </div>
            <div class="rightcolumn">
              {studentDetails}
              {studentDetails2}
              <div class="card">
                <h4>Skills</h4>
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
