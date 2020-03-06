import React, { Component } from "react";
import "../../App.css";
import axios from "axios";
import cookie from "react-cookies";
import { Redirect } from "react-router";

class JobAppliedStudents extends Component {
  constructor(props) {
    super(props);
    this.state = {
      students: [],
      studentBasicDetailsResult: [],
      studentAllDetailsResult: [],
      redirect: null,
      searchValue: "",
      status: ""
    };
    this.getProfileDetails = this.getProfileDetails.bind(this);
    this.handleOnChange = this.handleOnChange.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
    this.handleChange2 = this.handleChange2.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
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
    var jobId = this.props.match.params.id;
    console.log("in componentDidMount", jobId);
    axios
      .get(`http://localhost:3001/jobAppliedStudents/${jobId}`)
      .then(response => {
        //update the state with the response data
        console.log("res 2 is  :::", response);
        this.setState({
          studentBasicDetailsResult: this.state.studentBasicDetailsResult.concat(
            response.data
          )
        });
      });
  }

  handleChange2(event) {
    this.setState({
      status: event.target.value
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
      .post("http://localhost:3001/changeJobApplicationsStatus/", data)
      .then(response => {
        //update the state with the response data
        alert(
          `You successfully updated the student status to ${this.state.status}.`
        );
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
            <h4>Course : {studentBasicDetailResult.presentCourse}</h4>
            <h4>
              University: {studentBasicDetailResult.collegeName}
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
            <h4>Graduation Year :{studentBasicDetailResult.graduationYear}</h4>
            <form
              onSubmit={e =>
                this.handleSubmit(e, studentBasicDetailResult.studentId)
              }
            >
              <label>
                <input
                  type="radio"
                  value="Pending"
                  checked={this.state.status === "Pending"}
                  onChange={this.handleChange2}
                />
                Pending
              </label>

              <label>
                <input
                  type="radio"
                  value="Reviewed"
                  checked={this.state.status === "Reviewed"}
                  onChange={this.handleChange2}
                />
                Reviewed
              </label>

              <label>
                <input
                  type="radio"
                  value="Declined"
                  checked={this.state.status === "Declined"}
                  onChange={this.handleChange2}
                />
                Declined
              </label>

              <label>
                <input
                  type="radio"
                  value="Accepted"
                  checked={this.state.status === "Accepted"}
                  onChange={this.handleChange2}
                />
                Accepted
              </label>

              <button type="submit">Update Status</button>
            </form>
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
export default JobAppliedStudents;
