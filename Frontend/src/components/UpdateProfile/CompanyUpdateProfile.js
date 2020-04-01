import React, { Component } from "react";
import "../../profile.css";
import axios from "axios";
import { backend } from "../../webConfig";
import { Redirect } from "react-router";
import {
  fetchParticularCompany,
  getCompanyProfilePicPath,
  updateCompanyProfile
} from "../../actions/fetchStudent";
import { connect } from "react-redux";
import Background from "../Profile/companyBackground.png";

class CompanyUpdateProfile extends Component {
  constructor(props) {
    super(props);
    console.log("Hii");
    this.initialState = {
      company: [],
      filePath: []
    };
    this.state = { fileData: null, company: null };
    this.props = this.initialState;
    this.buildAvatarUrl = this.buildAvatarUrl.bind(this);
    this.onFileChange = this.onFileChange.bind(this);
  }
  //get the books data from backend
  componentDidMount() {
    console.log("this.props", this.props);
    var companyId = "";
    if (localStorage.cookie) {
      companyId = localStorage.cookie.split("+")[0];
    }
    if (companyId) {
      console.log("In company", companyId);
      this.props.fetchParticularCompany(companyId).then(
        response => {
          console.log("Student fetchCompanyProfile are is", this.props.company);
        },
        error => {
          console.log("Events is", error);
        }
      );
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
    console.log("Hii", this.props.company);
    const companyProfilee = this.props.company;
    companyProfilee.map(companyProfilee => {
      if (companyProfilee._id === id) {
        console.log("Hii", this.props.company);
        console.log("Hiiii", name, e.target.value);
        companyProfilee[name] = e.target.value;
      }
    });
    console.log("abccc", this.props.company);
  };

  onFileChange(e, id) {
    this.props.company.map(obj => {
      if (obj._id === id) {
        let fileData = new FormData();
        console.log("fileData in state", e.target.files[0]);
        fileData.append("companyProfileStorage", e.target.files[0]);
        obj.companyProfilePic = fileData;
        console.log(fileData, e.target.files[0]);
        console.log(obj.companyProfilePic);
      }
    });
    console.log("in edit handler222", this.props.company);
  }

  async updateProfile(event, id) {
    var resumePath;
    const data = {
      companyId: localStorage.cookie.split("+")[0],
      type: "companyProfilePic",
      profilePic: this.props.company[0].companyProfilePic
    };
    console.log("In updayte PP", data, this.props.company[0]);
    await this.props.getCompanyProfilePicPath(data).then(
      response => {
        console.log(
          "New FIle Path company pPic",
          this.props.filePath,
          response
        );
        console.log("Status Code : ", this.props.filePath.filename);
        if (response.status === 200) {
          resumePath = this.props.filePath.filename;
          const compObj = this.props.company;
          console.log("in edit handler", compObj);
          compObj.map(obj => {
            console.log("Error in saving application", resumePath);
            obj.companyProfilePic = resumePath;
          });
        } else {
          console.log("Error in saving application");
        }
      },
      error => {
        console.log("Events is", error);
      }
    );
    const data2 = {
      companyId: localStorage.cookie.split("+")[0],
      filePath: "companyProfilePic",
      company: this.props.company
    };
    await this.props.updateCompanyProfile(data2).then(
      response => {
        console.log("Events is", this.props.company);
        this.setState({
          company: this.props.company
        });
      },
      error => {
        console.log("Events is", error);
      }
    );
  }

  // await axios
  //   .post(
  //     backend +
  //       "/uploadFile/?companyId=" +
  //       this.props.company[0]._id +
  //       "&type=companyProfilePic",
  //     this.props.company[0].companyProfilePic
  //   )
  //   .then(response => {
  //     console.log("Status Code : ", response);
  //     if (response.status === 200) {
  //       resumePath = response.data.filename;
  //       const compObj = this.props.company;
  //       console.log("in edit handler", compObj);
  //       compObj.map(obj => {
  //         obj.companyProfilePic = resumePath;
  //       });
  //     } else {
  //       console.log("Error in saving application");
  //     }
  //   });
  // console.log("path:", resumePath);

  //   if (localStorage.cookie) {
  //     axios
  //       .post(
  //         backend +
  //           `/updateCompanyProfile/${localStorage.cookie.split("+")[0] +
  //             "/?filePath=" +
  //             resumePath}`,
  //         this.props.company
  //       )
  //       .then(response => {
  //         if (response.status == 200) {
  //           this.setState({
  //             studentBasicDetailsResult: response.data
  //           });
  //           this.redirecttoeventPage.bind(this);
  //         } else {
  //           console.log("No search results found");
  //         }
  //       });
  //   }
  // }

  buildAvatarUrl(fileName) {
    console.log("fileName in avatar,", fileName);
    return backend + "/file/" + fileName + "/?role=company";
  }

  render() {
    //iterate over books to create a table row

    let header = this.props.company.map(companyProfilee => {
      return (
        <div
          class="card6 card5"
          style={{ backgroundImage: "url(" + Background + ")" }}
        ></div>
      );
    });
    let profilePic = this.props.company.map(obj => {
      if (obj.companyProfilePic) {
        console.log("Final prodile pic,", obj.companyProfilePic);
        var path = obj.companyProfilePic;
        return (
          <div key={obj._id} className="wrapper">
            <img
              src={this.buildAvatarUrl(path)}
              className="image--cover4"
              alt="Loading.."
            />
          </div>
        );
      } else {
        var path2 = "default.png";
        return (
          <div key={obj._id} className="wrapper">
            <img
              src={this.buildAvatarUrl(path2)}
              className="image--cover4"
              alt="Loading.."
            />
          </div>
        );
      }
    });
    let headerData = this.props.company.map(companyProfilee => {
      return (
        <div>
          <div>{profilePic}</div>
          <br />
          <input
            onChange={e =>
              this.handlemyChange(e, companyProfilee._id, "companyName")
            }
            class="editableinput9"
            name="companyName"
            placeholder="Company Name"
            defaultValue={companyProfilee.companyName}
          ></input>
          <input
            onChange={e =>
              this.handlemyChange(e, companyProfilee._id, "location")
            }
            class="editableinput9"
            name="location"
            placeholder="Location"
            defaultValue={companyProfilee.location}
          ></input>
          <input
            onChange={e =>
              this.handlemyChange(e, companyProfilee._id, "shortDesc")
            }
            class="editableinput9"
            name="shortDesc"
            placeholder="Short Desc"
            defaultValue={companyProfilee.shortDesc}
          ></input>
          <input
            onChange={e =>
              this.handlemyChange(e, companyProfilee._id, "comapnySize")
            }
            class="editableinput9"
            name="comapnySize"
            placeholder="Company Size"
            defaultValue={companyProfilee.comapnySize}
          ></input>

          <div>
            <input
              type="file"
              name="file"
              onChange={e => this.onFileChange(e, companyProfilee._id)}
            />
          </div>
        </div>
      );
    });
    let headerData1 = this.props.company.map(companyProfilee => {
      return (
        <div class="card">
          <h3>About {companyProfilee.companyname}</h3>
          <br />
          <input
            onChange={e =>
              this.handlemyChange(e, companyProfilee._id, "description")
            }
            class="editableinput8"
            name="description"
            placeholder="Description"
            defaultValue={companyProfilee.description}
          ></input>
        </div>
      );
    });
    let headerData2 = this.props.company.map(companyProfilee => {
      return (
        <div class="card">
          <h3>About Founders</h3>
          <br />
          <input
            onChange={e =>
              this.handlemyChange(e, companyProfilee._id, "founders")
            }
            class="editableinput7"
            name="founders"
            placeholder="Founders"
            defaultValue={companyProfilee.founders}
          ></input>
          <br />
          <input
            onChange={e =>
              this.handlemyChange(e, companyProfilee._id, "founderInfo")
            }
            class="editableinput8"
            name="founderInfo"
            placeholder="Founder Description"
            defaultValue={companyProfilee.founderInfo}
          ></input>
        </div>
      );
    });
    let contactInfo = this.props.company.map(companyProfilee => {
      return (
        <div class="card">
          <h3>Contact Information</h3>
          <br />
          <h4>Email:</h4>
          <input
            onChange={e => this.handlemyChange(e, companyProfilee._id, "email")}
            class="editableinput7"
            name="email"
            placeholder="Email"
            defaultValue={companyProfilee.email}
          ></input>
          <br />
          <br />
          <h4>Phone:</h4>
          <input
            onChange={e =>
              this.handlemyChange(e, companyProfilee._id, "phoneNumber")
            }
            class="editableinput7"
            name="phoneNumber"
            placeholder="Phone Number"
            defaultValue={companyProfilee.phoneNumber}
          ></input>
          <br />
          <h4>Website Url:</h4>
          <input
            onChange={e =>
              this.handlemyChange(e, companyProfilee._id, "websiteUrl")
            }
            class="editableinput7"
            name="websiteUrl"
            placeholder="Website Url"
            defaultValue={companyProfilee.websiteUrl}
          ></input>
          <br />
        </div>
      );
    });
    let availPostions = this.props.company.map(companyProfilee => {
      return (
        <div class="card">
          <h4>Available Postions</h4>
          <input
            onChange={e =>
              this.handlemyChange(e, companyProfilee._id, "availPostions")
            }
            class="editableinput7"
            name="availPostions"
            placeholder="Available Positions"
            defaultValue={companyProfilee.availPostions}
          ></input>
        </div>
      );
    });
    let postSomething = this.props.company.map(companyProfilee => {
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
    if (!localStorage.cookie) {
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
  company: state.schools.company,
  filePath: state.schools.filePath
});

//export Profile Component
export default connect(mapStateToProps, {
  fetchParticularCompany,
  getCompanyProfilePicPath,
  updateCompanyProfile
})(CompanyUpdateProfile);
