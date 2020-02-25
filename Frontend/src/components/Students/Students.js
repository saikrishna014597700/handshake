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
      redirect: null
    };
    this.getProfileDetails = this.getProfileDetails.bind(this);
  }
  //get the books data from backend
  componentDidMount() {
    console.log("in componentDidMount");
    const data = {
      studentId: this.state.studentId
    };
    axios.get(`http://localhost:3001/student`).then(response => {
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
          <div>{studentDetails}</div>
        </div>
      </div>
    );
  }
  getProfileDetails = (event, id) => {
    const data = {
      studentBasicDetailsResult: this.state.studentBasicDetailsResult
    };
    // axios
    //   .post("http://localhost:3001/updatePersonalInfo", data)
    //   .then(response => {
    //     console.log("Status Code : ", response.status);
    //     if (response.status === 200) {
    //       console.log("Updated work details successfully");
    //     } else {
    //       console.log("Error Updating work page");
    //     }
    //   });
    this.setState({ redirect: `/studentprofile/${id}` });
  };
}
//export Home Component
export default Students;
