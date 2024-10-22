import React, { Component } from "react";
import "../../App.css";
import axios from "axios";
import { backend } from "../../webConfig";
import cookie from "react-cookies";
import { Redirect } from "react-router";
import { eventRegisteredStudents } from "../../actions/fetchStudent";
import { connect } from "react-redux";

class EventRegisteredStudents extends Component {
  constructor(props) {
    super(props);
    this.state = {
      students: [],
      studentBasicDetailsResult: [],
      studentAllDetailsResult: [],
      redirect: null,
      searchValue: ""
    };
    this.getProfileDetails = this.getProfileDetails.bind(this);
    this.handleOnChange = this.handleOnChange.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
  }
  handleOnChange = event => {
    this.setState({ searchValue: event.target.value });
  };
  handleSearch = () => {
    axios
      .get(backend + `/studentSearch/${this.state.searchValue}`)
      .then(response => {
        if (response.status == 200) {
          this.setState({
            studentBasicDetailsResult: response.data
          });
        } else {
          console.log("No search results found");
        }
      });
  };
  //get the books data from backend
  async componentDidMount() {
    console.log("in componentDidMount");
    const data = {
      eventId: this.props.match.params.id
    };
    await this.props.eventRegisteredStudents(data).then(
      response => {
        console.log(
          "Student Registeres to event  are is",
          this.props.studentObject
        );
      },
      error => {
        console.log("Error is", error);
      }
    );
  }

  render() {
    if (this.state.redirect) {
      return <Redirect to={this.state.redirect} />;
    }
    //iterate over books to create a table row
    let studentDetails = this.props.studentObject.map(
      studentBasicDetailResult => {
        console.log("Student is ", studentBasicDetailResult);
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
            <h4>University: {studentBasicDetailResult.collegeName}</h4>
            <h4>Graduation Year :{studentBasicDetailResult.graduationYear}</h4>
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
  studentObject: state.schools.studentObject
});

//export Profile Component
export default connect(mapStateToProps, {
  eventRegisteredStudents
})(EventRegisteredStudents);
