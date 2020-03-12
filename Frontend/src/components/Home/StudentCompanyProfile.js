import React, { Component } from "react";
import "../../profile.css";
import axios from "axios";
import cookie from "react-cookies";
import { Redirect } from "react-router";
import { Link } from "react-router-dom";
import { fetchCompanyProfile } from "../../actions/fetchStudent";
import { connect } from "react-redux";
import Background from "./companyBackground.png";

class StudentCompanyProfile extends Component {
  constructor(props) {
    super(props);
    console.log("Hii");
    this.initialState = {
      companyProfile: []
    };
    this.props = this.initialState;
    this.buildAvatarUrl = this.buildAvatarUrl.bind(this);
  }
  //get the books data from backend
  componentDidMount() {
    console.log("this.props", this.props);
    var companyId = "";
    if (
      cookie.load("cookie") &&
      cookie.load("cookie").split("+")[1] === "company"
    ) {
      companyId = cookie.load("cookie").split("+")[0];
      console.log("this.props 1", companyId);
      this.props.fetchCompanyProfile(companyId);
    } else {
      companyId = this.props.match.params.id;
      console.log("this.props 2", companyId);
      this.props.fetchCompanyProfile(companyId);
    }
  }

  redirecttoUpdateProfilePage() {
    this.props.history.push("/companyUpdateProfile");
  }

  redirecttoeventPage() {
    this.props.history.push("/companyevents");
  }

  redirecttojobsPage() {
    this.props.history.push("/companyDashboard");
  }

  buildAvatarUrl(fileName) {
    return "http://localhost:3001/file/" + fileName + "/?role=company";
  }

  render() {
    //iterate over books to create a table row
    let profilePic = this.props.companyProfile.map(obj => {
      if (obj.companyProfilePic) {
        var path = obj.companyProfilePic;
        return (
          <div key={obj.companyId} className="wrapper">
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
          <div key={obj.companyId} className="wrapper">
            <img
              src={this.buildAvatarUrl(path2)}
              className="image--cover3"
              alt="Loading.."
            />
          </div>
        );
      }
    });
    let header = this.props.companyProfile.map(companyProfilee => {
      return (
        <div
          class="card6 card5"
          style={{ backgroundImage: "url(" + Background + ")" }}
        ></div>
      );
    });
    let headerData = this.props.companyProfile.map(companyProfilee => {
      return (
        <div>
          <h2>{companyProfilee.companyname}</h2>
          <br />
          {profilePic}
          <br />
          <h4>{companyProfilee.companyName}</h4>
          <h4>{companyProfilee.location}</h4>
          <h4>{companyProfilee.shortDesc}</h4>
          <h4>{companyProfilee.comapnySize}</h4>
        </div>
      );
    });
    let headerData1 = this.props.companyProfile.map(companyProfilee => {
      return (
        <div class="card">
          <h3>About {companyProfilee.companyname}</h3>
          <br />
          <h4>{companyProfilee.description}</h4>
        </div>
      );
    });
    let headerData2 = this.props.companyProfile.map(companyProfilee => {
      return (
        <div class="card">
          <h3>About Founders</h3>
          <br />
          <h4>{companyProfilee.founders}</h4>
          <br />
          <h4>{companyProfilee.founderInfo}</h4>
        </div>
      );
    });
    let contactInfo = this.props.companyProfile.map(companyProfilee => {
      return (
        <div class="card">
          <h3>Contact Information</h3>
          <br />
          <h4>Email:</h4>
          <h5>{companyProfilee.email}</h5>
          <br />
          <br />
          <h4>Phone:</h4>
          <h5>{companyProfilee.phoneNumber}</h5>
          <br />
          <h4>Website Url:</h4>
          <h5>{companyProfilee.websiteUrl}</h5>
          <br />
        </div>
      );
    });
    let availPostions = this.props.companyProfile.map(companyProfilee => {
      return (
        <div class="card">
          <h4>Available Postions</h4>

          <h5>{companyProfilee.availPostions}</h5>
        </div>
      );
    });
    let postSomething = this.props.companyProfile.map(companyProfilee => {
      return (
        <div class="card">
          <br />
          <button
            class="btn4 success"
            onClick={this.redirecttojobsPage.bind(this)}
          >
            Jobs Posted
          </button>
          <br />
          <br />
          <button
            class="btn4 success"
            onClick={this.redirecttoeventPage.bind(this)}
          >
            Events Created
          </button>
          {/* <br />
          <br />
          <button
            class="btn4 success"
            onClick={this.redirecttoUpdateProfilePage.bind(this)}
          >
            Edit Profile
          </button> */}
          <br />
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
          <div class="row">
            <div class="leftcolumn">
              <div class="card">
                {header}
                {headerData}
              </div>

              {headerData1}

              {headerData2}
            </div>
            <div class="rightcolumn">
              {contactInfo}
              {availPostions}
              {postSomething}
            </div>
          </div>
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
})(StudentCompanyProfile);