import React, { Component } from "react";
import "../../profile.css";
import axios from "axios";
import cookie from "react-cookies";
import { Redirect } from "react-router";
import { Link } from "react-router-dom";
import { fetchCompanyProfile } from "../../actions/fetchStudent";
import { connect } from "react-redux";

class CompanyProfile extends Component {
  constructor() {
    super();
    console.log("Hii");
    this.initialState = {
      companyProfile: []
    };
    this.props = this.initialState;
  }
  //get the books data from backend
  componentDidMount() {
    console.log("this.props", this.props);
    var companyId = cookie.load("cookie").split("+")[0];
    this.props.fetchCompanyProfile(companyId);
  }

  redirecttoUpdateProfilePage() {
    this.props.history.push("/companyUpdateProfile");
  }

  render() {
    //iterate over books to create a table row

    let companyProfiledata = this.props.companyProfile.map(companyProfilee => {
      return (
        <div class="card">
          <h2>{companyProfilee.companyname}</h2>
          <br />
          <div class="wrapper">
            <img src={require("./company.jpg")} class="image--cover3"></img>
          </div>
          <br />
          <h4>
            {companyProfilee.email} {"in"} {companyProfilee.location}
          </h4>
          <h4>{companyProfilee.description}</h4>
          <h4>
            {"Url: "}
            {companyProfilee.websiteUrl}
          </h4>
        </div>
      );
    });

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
              <div class="card">{/* <p>{myJourneys}</p> */}</div>
              <br />
              <h2 class="Profileheading">Education</h2>

              {/* {studentEducationDetails} */}
              <br />
              <h2 class="Profileheading">Work Experience</h2>

              {/* {studentWorkDetails} */}
            </div>
            <div class="rightcolumn">
              {companyProfiledata}
              {/* {studentDetails2} */}
              <div class="card">
                <h3>Skills</h3>
                {/* {studentDetails3} */}
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
  companyProfile: state.schools.companyProfile
});

//export Profile Component
export default connect(mapStateToProps, {
  fetchCompanyProfile
})(CompanyProfile);
