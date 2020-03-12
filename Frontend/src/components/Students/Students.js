import React, { Component } from "react";
import "../../App.css";
import axios from "axios";
import cookie from "react-cookies";
import { Redirect } from "react-router";

class Students extends Component {
  constructor() {
    super();
    this.state = {
      students: [],
      studentId: 1,
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
      .get(`http://localhost:3001/studentSearch/${this.state.searchValue}`)
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
  componentDidMount() {
    console.log("in componentDidMount");
    const data = {
      studentId: this.state.studentId
    };
    axios.get(`http://localhost:3001/allstudentDetails`).then(response => {
      //update the state with the response data
      console.log("res 2 is  :::", response);
      this.setState({
        studentBasicDetailsResult: this.state.studentBasicDetailsResult.concat(
          response.data
        )
      });
    });
    console.log("data is", data);
    axios
      .get(
        `http://localhost:3001/profilestudentDetails/${this.state.studentId}`
      )
      .then(response => {
        console.log("res 1 is  :::", response);
        //update the state with the response data
        this.setState({
          studentAllDetailsResult: this.state.studentAllDetailsResult.concat(
            response.data
          )
        });
      });
  }

  render() {
    if (this.state.redirect) {
      return <Redirect to={this.state.redirect} />;
    }
    //iterate over books to create a table row
    let studentDetails = this.state.studentBasicDetailsResult.map(
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
                  this.getProfileDetails(
                    event,
                    studentBasicDetailResult.studentId
                  )
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
    if (!cookie.load("cookie")) {
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
//export Home Component
export default Students;
