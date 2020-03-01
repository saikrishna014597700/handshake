import React, { Component } from "react";
import "../../App.css";
import axios from "axios";
import cookie from "react-cookies";
import { Redirect } from "react-router";

class CompanyDashboard extends Component {
  constructor() {
    super();
    this.state = {
      company: [],
      companyId: 1,
      // studentBasicDetailsResult: [],
      companyJobPostings: []
      // redirect: null
    };
    this.getProfileDetails = this.getProfileDetails.bind(this);
  }
  //get the books data from backend
  componentDidMount() {
    console.log("in componentDidMount");
    const data = {
      companyId: this.state.companyId
    };
    // axios.get(`http://localhost:3001/company`).then(response => {
    //   //update the state with the response data
    //   console.log("res 2 is  :::", response);
    //   this.setState({
    //     studentBasicDetailsResult: this.state.studentBasicDetailsResult.concat(
    //       response.data
    //     )
    //   });
    // });
    // console.log("data is", data);
    axios
      .get(`http://localhost:3001/companyJobPostings/${this.state.companyId}`)
      .then(response => {
        console.log("res 1 is  :::", response);
        //update the state with the response data
        this.setState({
          companyJobPostings: this.state.companyJobPostings.concat(
            response.data
          )
        });
      });
  }

  render() {
    // if (this.state.redirect) {
    //   return <Redirect to={this.state.redirect} />;
    // }
    //iterate over books to create a table row
    let companyJobPosting = this.state.companyJobPostings.map(
      companyJobPosting => {
        console.log("Student is ", companyJobPosting);
        return (
          <div class="card2">
            <h4>Title : {companyJobPosting.jobTite}</h4>
            <h4>{companyJobPosting.jobdescription}</h4>
            <h4>
              Course : {companyJobPosting.location}
              <button
                class="btn success"
                onClick={event =>
                  this.getProfileDetails(event, companyJobPosting.jobId)
                }
              >
                View Profile
              </button>
            </h4>
            <h4>University: {companyJobPosting.location}</h4>
            <h4>Graduation Year :{companyJobPosting.salary}</h4>
            <h4>University: {companyJobPosting.jobCategory}</h4>
            <h4>Graduation Year :{companyJobPosting.applicationDeadline}</h4>
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
          <div>{companyJobPosting}</div>
        </div>
      </div>
    );
  }
  getProfileDetails = (event, id) => {
    // const data = {
    //   studentBasicDetailsResult: this.state.studentBasicDetailsResult
    // };
    // // axios
    // //   .post("http://localhost:3001/updatePersonalInfo", data)
    // //   .then(response => {
    // //     console.log("Status Code : ", response.status);
    // //     if (response.status === 200) {
    // //       console.log("Updated work details successfully");
    // //     } else {
    // //       console.log("Error Updating work page");
    // //     }
    // //   });
    // this.setState({ redirect: `/studentprofile/${id}` });
  };
}
//export Home Component
export default CompanyDashboard;
