import React, { Component } from "react";
import "../../profile.css";
import axios from "axios";
import cookie from "react-cookies";
import { Redirect } from "react-router";
import { Link } from "react-router-dom";
import { fetchCompanyProfile } from "../../actions/fetchStudent";
import { connect } from "react-redux";
import Background from "../Profile/companyBackground.png";

class CompanyUpdateProfile extends Component {
  constructor(props) {
    super(props);
    console.log("Hii");
    this.initialState = {
      companyProfile: []
    };
    this.props = this.initialState;
  }
  //get the books data from backend
  componentDidMount() {
    console.log("this.props", this.props);
    if (cookie.load("cookie")) {
      var companyId = cookie.load("cookie").split("+")[0];
      this.props.fetchCompanyProfile(companyId);
    }
  }

  redirecttoCompanyProfilePage() {
    this.props.history.push("/companyprofile");
  }

  redirecttoeventPage() {
    this.props.history.push("/companyevents");
  }

  redirecttojobsPage() {
    this.props.history.push("/companyDashboard");
  }

  handlemyChange = (e, id, name) => {
    console.log("Hii", this.props.companyProfile);
    const companyProfilee = this.props.companyProfile;
    companyProfilee.map(companyProfilee => {
      if (companyProfilee.companyId === id) {
        console.log("Hii", this.props.companyProfile);
        console.log("Hiiii", name, e.target.value);
        companyProfilee[name] = e.target.value;
      }
    });
    console.log("abccc", this.props.companyProfile);
  };

  updateProfile = (event, id) => {
    console.log("abccc", this.props.companyProfile);
    if (cookie.load("cookie")) {
      axios
        .post(
          `http://localhost:3001/updateCompanyProfile/${
            cookie.load("cookie").split("+")[0]
          }`,
          this.props.companyProfile
        )
        .then(response => {
          if (response.status == 200) {
            this.setState({
              studentBasicDetailsResult: response.data
            });
            this.redirecttoeventPage.bind(this);
          } else {
            console.log("No search results found");
          }
        });
    }
  };

  render() {
    //iterate over books to create a table row

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
          <div class="wrapper">
            <img
              src={require("../Profile/company.jpg")}
              class="image--cover3"
            ></img>
          </div>
          <br />
          <input
            onChange={e =>
              this.handlemyChange(e, companyProfilee.companyId, "companyName")
            }
            class="editableinput9"
            name="companyName"
            defaultValue={companyProfilee.companyName}
          ></input>
          <input
            onChange={e =>
              this.handlemyChange(e, companyProfilee.companyId, "location")
            }
            class="editableinput9"
            name="location"
            defaultValue={companyProfilee.location}
          ></input>
          <input
            onChange={e =>
              this.handlemyChange(e, companyProfilee.companyId, "shortDesc")
            }
            class="editableinput9"
            name="shortDesc"
            defaultValue={companyProfilee.shortDesc}
          ></input>
          <input
            onChange={e =>
              this.handlemyChange(e, companyProfilee.companyId, "comapnySize")
            }
            class="editableinput9"
            name="comapnySize"
            defaultValue={companyProfilee.comapnySize}
          ></input>
        </div>
      );
    });
    let headerData1 = this.props.companyProfile.map(companyProfilee => {
      return (
        <div class="card">
          <h3>About {companyProfilee.companyname}</h3>
          <br />
          <input
            onChange={e =>
              this.handlemyChange(e, companyProfilee.companyId, "description")
            }
            class="editableinput8"
            name="description"
            defaultValue={companyProfilee.description}
          ></input>
        </div>
      );
    });
    let headerData2 = this.props.companyProfile.map(companyProfilee => {
      return (
        <div class="card">
          <h3>About Founders</h3>
          <br />
          <input
            onChange={e =>
              this.handlemyChange(e, companyProfilee.companyId, "founders")
            }
            class="editableinput7"
            name="founders"
            defaultValue={companyProfilee.founders}
          ></input>
          <br />
          <input
            onChange={e =>
              this.handlemyChange(e, companyProfilee.companyId, "founderInfo")
            }
            class="editableinput8"
            name="founderInfo"
            defaultValue={companyProfilee.founderInfo}
          ></input>
        </div>
      );
    });
    let contactInfo = this.props.companyProfile.map(companyProfilee => {
      return (
        <div class="card">
          <h3>Contact Information</h3>
          <br />
          <h4>Email:</h4>
          <input
            onChange={e =>
              this.handlemyChange(e, companyProfilee.companyId, "email")
            }
            class="editableinput7"
            name="email"
            defaultValue={companyProfilee.email}
          ></input>
          <br />
          <br />
          <h4>Phone:</h4>
          <input
            onChange={e =>
              this.handlemyChange(e, companyProfilee.companyId, "phoneNumber")
            }
            class="editableinput7"
            name="phoneNumber"
            defaultValue={companyProfilee.phoneNumber}
          ></input>
          <br />
          <h4>Website Url:</h4>
          <input
            onChange={e =>
              this.handlemyChange(e, companyProfilee.companyId, "websiteUrl")
            }
            class="editableinput7"
            name="websiteUrl"
            defaultValue={companyProfilee.websiteUrl}
          ></input>
          <br />
        </div>
      );
    });
    let availPostions = this.props.companyProfile.map(companyProfilee => {
      return (
        <div class="card">
          <h4>Available Postions</h4>
          <input
            onChange={e =>
              this.handlemyChange(e, companyProfilee.companyId, "availPostions")
            }
            class="editableinput7"
            name="availPostions"
            defaultValue={companyProfilee.availPostions}
          ></input>
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
          <br />
          <br />
          <button class="btn4 success" onClick={this.updateProfile.bind(this)}>
            Save
          </button>
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
})(CompanyUpdateProfile);
