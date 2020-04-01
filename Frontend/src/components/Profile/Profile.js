import React, { Component } from "react";
import "../../profile.css";
import axios from "axios";
import { backend } from "../../webConfig";
import cookie from "react-cookies";
import { Redirect } from "react-router";
import { Link } from "react-router-dom";
import listReactFiles from "list-react-files";
import { fetchStudent } from "../../actions/fetchStudent";
import { connect } from "react-redux";

class Profile extends Component {
  constructor() {
    super();
    console.log("Hii");
    this.initialState = {
      studentObject: []
    };
    this.props = this.initialState;
    this.buildAvatarUrl = this.buildAvatarUrl.bind(this);
  }
  componentDidMount() {
    this.props.fetchStudent(localStorage.cookie.split("+")[0]).then(
      response => {
        console.log("Student Details are is", response.data);
        this.setState({
          studentObject: this.props.studentObject
        });
      },
      error => {
        console.log("Student is", error);
      }
    );
  }

  redirecttoUpdateProfilePage() {
    this.props.history.push("/UpdateProfile");
  }

  buildAvatarUrl(fileName) {
    return backend + "/file/" + fileName + "/?role=students";
  }

  render() {
    let myJourneys = this.props.studentObject.map(myJourne => {
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
    let studentDetails2 = this.props.studentObject.map(
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
    let studentDetails3 = this.props.studentObject.map(
      studentBasicDetailResult => {
        return (
          <div>
            <br />
            <h5>{studentBasicDetailResult.skillSet}</h5>
          </div>
        );
      }
    );
    let studentObjectDetails = "";
    //iterate over books to create a table row
    this.props.studentObject.map(studentAllEduDetailResult => {
      studentObjectDetails = studentAllEduDetailResult.educations.map(
        studentEduDetailResult => {
          return (
            <div class="card">
              <h5>
                <b>College</b> : {studentEduDetailResult.collegeName}
              </h5>
              <h5>
                <b>Degree </b>: {studentEduDetailResult.degree}
              </h5>
              <h5>
                <b>Major </b>: {studentEduDetailResult.major}
              </h5>
              <h5>
                <b>CGPA </b>: {studentEduDetailResult.cgpa}
              </h5>
              <h5>
                <b>Graduating Year</b> : {studentEduDetailResult.yearOfPassing}
              </h5>
            </div>
          );
        }
      );
    });

    let studentWorkDetails = "";
    //iterate over books to create a table row
    this.props.studentObject.map(studentAllWorkDetailResult => {
      studentWorkDetails = studentAllWorkDetailResult.workExperiences.map(
        studentWorkDetailResult => {
          console.log("xxxx::::", studentWorkDetailResult);
          return (
            <div class="card">
              <h5>
                <b>Company</b> : {studentWorkDetailResult.companyName}
              </h5>
              <h5>
                <b>Title</b> : {studentWorkDetailResult.title}
              </h5>
              <h5>
                <b>Duration</b> : {studentWorkDetailResult.startDate}
                {"-"}
                {studentWorkDetailResult.endDate}
              </h5>
              <h5>
                <b>Description</b> : {studentWorkDetailResult.description}
              </h5>
            </div>
          );
        }
      );
    });

    let redirectVar = null;
    if (!localStorage.cookie) {
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

              {studentObjectDetails}

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
        </body>
      </div>
    );
  }
}
const mapStateToProps = state => ({
  studentObject: state.schools.studentObject
});

//export Profile Component
export default connect(mapStateToProps, {
  fetchStudent
})(Profile);
