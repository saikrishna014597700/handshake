import React, { Component } from "react";
import "../../App.css";
import axios from "axios";
import { backend } from "../../webConfig";
import cookie from "react-cookies";
import { Redirect } from "react-router";
import {
  fetchAllStudents,
  studentSearchComp
} from "../../actions/fetchStudent";
import { connect } from "react-redux";

class Students extends Component {
  constructor(props) {
    super(props);
    this.state = {
      students: [],
      studentId: 1,
      studentBasicDetailsResult: [],
      studentAllDetailsResult: [],
      redirect: null,
      searchValue: ""
    };
    this.initialState = {
      allStudents: []
    };
    this.props = this.initialState;
    this.getProfileDetails = this.getProfileDetails.bind(this);
    this.handleOnChange = this.handleOnChange.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
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
    if (localStorage.cookie) {
      this.props.fetchAllStudents().then(
        response => {
          console.log("Students are is", this.props.allStudents);
        },
        error => {
          console.log("Events is", error);
        }
      );
    }
  }

  buildAvatarUrl(fileName) {
    if (!fileName) {
      fileName = "default.png";
    }
    return backend + "/file/" + fileName + "/?role=students";
  }

  render() {
    if (this.state.redirect) {
      return <Redirect to={this.state.redirect} />;
    }
    //iterate over books to create a table row
    let studentDetails = this.props.allStudents.map(
      studentBasicDetailResult => {
        console.log("Student is ", studentBasicDetailResult);
        return (
          <div class="card2">
            <div class="wrapper">
              <img
                src={this.buildAvatarUrl(
                  studentBasicDetailResult.studentProfilePic
                )}
                class="image--cover2"
              ></img>
            </div>
            <h4>
              Full Name : {studentBasicDetailResult.firstName}{" "}
              {studentBasicDetailResult.lastName}
            </h4>
            <h4>Degree : {studentBasicDetailResult.presentlevelOfEducation}</h4>
            <h4>
              Course : {studentBasicDetailResult.presentCourse}
              <button
                class="btn success"
                onClick={event =>
                  this.getProfileDetails(event, studentBasicDetailResult._id)
                }
              >
                View Profile
              </button>
            </h4>
            <h4>University : {studentBasicDetailResult.collegeName}</h4>
            <h4>Graduation : {studentBasicDetailResult.graduationYear}</h4>
            <h4>Skillset : {studentBasicDetailResult.skillSet}</h4>
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
          <br />
          <br />
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
  fetchAllStudents,
  studentSearchComp
})(Students);
