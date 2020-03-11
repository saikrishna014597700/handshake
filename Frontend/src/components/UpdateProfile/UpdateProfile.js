import React, { Component } from "react";
import "../../profile.css";
import axios from "axios";
import cookie from "react-cookies";
import { Redirect } from "react-router";
import { Link } from "react-router-dom";
import {
  fetchStudent,
  fetchStudentDetails,
  fetchEduDetails,
  fetchWorkExpDetails,
  editMyJourney,
  addEducation,
  addWork,
  editMyedu,
  editMyWork,
  editMyskills,
  editContactDetails,
  removeMyEdu,
  removeMywork,
  editPersonalInfo
} from "../../actions/fetchStudent";
import { connect } from "react-redux";

class UpdateProfile extends Component {
  constructor() {
    super();
    // this.props = {
    //   studentBasicDetailsResult: [],
    //   studentAllDetailsResult: [],
    //   studentAllEduDetailsResult: [],
    //   myJourney: [],
    this.state = {
      yearofPassing: "",
      collegeName: "",
      degree: "",
      major: "",
      studentId: cookie.load("cookie"),
      addEduFlag: false,
      addWorkFlag: false,
      addMyJourneyFlag: false,
      addSkillsFlag: false,
      skills: "",
      companyName: "",
      title: "",
      startDate: "",
      endDate: "",
      description: "",
      studentDetailsId: "",
      success: false,
      url: "",
      selectedFile: null
    };
    // };
    // constructor() {
    //   super();
    this.initialState = {
      studentObject: [],
      studentExperience: [],
      studentEducation: [],
      studentBasicDetails: []
    };
    this.props = this.initialState;
    // }
    this.handlemyChange = this.handlemyChange.bind(this);
    this.handlemyEduChange = this.handlemyEduChange.bind(this);
    this.submitmyJourney = this.submitmyJourney.bind(this);
    this.submitEduDetails = this.submitEduDetails.bind(this);
    this.removeEduDetails = this.removeEduDetails.bind(this);
    this.removeWorkDetails = this.removeWorkDetails.bind(this);
    this.submitmyskillSet = this.submitmyskillSet.bind(this);
    this.submitContactDetailsDetails = this.submitContactDetailsDetails.bind(
      this
    );
    this.submitpersonalInfoDetails = this.submitpersonalInfoDetails.bind(this);
    this.addEduDetails = this.addEduDetails.bind(this);
    this.addWorkDetails = this.addWorkDetails.bind(this);
    this.submitWorkDetails = this.submitWorkDetails.bind(this);
    this.addEducation = this.addEducation.bind(this);
    this.addSkills = this.addSkills.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.onFileChange = this.onFileChange.bind(this);
    this.onClickHandler = this.onClickHandler.bind(this);
  }
  //get the books data from backend
  componentDidMount() {
    console.log("this.props", cookie.load("cookie").split("+"));
    var studentId = cookie.load("cookie").split("+")[0];
    this.props.fetchStudent(studentId);
    this.props.fetchStudentDetails(studentId);
    this.props.fetchEduDetails(studentId);
    this.props.fetchWorkExpDetails(studentId);
    this.props.studentBasicDetails.map(studentAllDetailResult => {
      this.setState({
        studentDetailsId: studentAllDetailResult.studentDetailsId
      });
    });
  }
  onFileChange(e) {
    this.setState({
      selectedFile: e.target.files[0],
      loaded: 0
    });
  }
  addEducation() {
    this.setState({
      addEduFlag: true
    });
  }
  addWork() {
    this.setState({
      addWorkFlag: true
    });
  }
  addSkills() {
    this.setState({
      addSkillsFlag: true
    });
    console.log("this.state.addSkillsFlag", this.state.addSkillsFlag);
  }

  handleChange = ev => {
    this.setState({ success: false, url: "" });
  };
  onClickHandler = () => {
    const data = new FormData();
    data.append("file", this.state.selectedFile);
    axios
      .post("http://localhost:3001/upload", data, {
        // receive two    parameter endpoint url ,form data
      })
      .then(res => {
        // then print response status
        console.log(res.statusText);
      });
  };
  redirecttoUpdateProfilePage() {
    this.props.history.push("/Profile");
  }

  handlemyChange = (e, id, name) => {
    const studentBasicDetails = this.props.studentBasicDetails;
    studentBasicDetails.map(studentBasicDetail => {
      if (studentBasicDetail.studentDetailsId === id) {
        studentBasicDetail[name] = e.target.value;
      }
    });
  };
  handlemystudentDetailsChange = (e, id, name) => {
    const studentBasicDetailsResult = this.props.studentObject;
    console.log("submitpersonalInfoDetails", this.props.studentObject);
    studentBasicDetailsResult.map(studentBasicDetailResult => {
      if (studentBasicDetailResult.studentId === id) {
        studentBasicDetailResult[name] = e.target.value;
      }
    });
  };

  handlemyEduChange = (e, id, name) => {
    const studentEduDetails = this.props.studentEducation;
    console.log("handlemyEduChange", this.props.studentEducation);
    studentEduDetails.map(studentEduDetail => {
      if (studentEduDetail.studentEduDetailsId === id) {
        studentEduDetail[name] = e.target.value;
      }
    });
  };

  handlemyWorkChange = (e, id, name) => {
    const studentWorkDetails = this.props.studentExperience;
    console.log("handlemyWorkChange", this.props.studentExperience);
    studentWorkDetails.map(studentWorkDetail => {
      if (studentWorkDetail.workExpDetailsId === id) {
        studentWorkDetail[name] = e.target.value;
      }
    });
  };

  submitmyJourney = (event, id, name) => {
    var response = this.props.editMyJourney(this.props.studentBasicDetails);
    console.log("response is", response);
  };

  submitpersonalInfoDetails = (event, id) => {
    console.log("submitpersonalInfoDetails2", this.props.studentObject);
    var response = this.props.editPersonalInfo(this.props.studentObject);
    console.log("response is", response);
  };

  submitmyskillSet = (event, id) => {
    console.log("submitmyskillSet", this.props.studentBasicDetails);
    var response = this.props.editMyskills(this.props.studentBasicDetails);
    console.log("response is", response);
  };

  submitContactDetailsDetails = (event, id) => {
    console.log("submitContactDetailsDetails", this.props.studentBasicDetails);
    var response = this.props.editContactDetails(
      this.props.studentBasicDetails
    );
    console.log("response is", response);
  };

  submitEduDetails = (event, id) => {
    console.log("submitContactDetailsDetails", this.props.studentEducation);
    var response = this.props.editMyedu(this.props.studentEducation);
    console.log("response is", response);
  };

  submitWorkDetails = (event, id) => {
    console.log("submitContactDetailsDetails", this.props.studentExperience);
    var response = this.props.editMyWork(this.props.studentExperience);
    console.log("response is", response);
  };

  removeEduDetails = (event, id) => {
    const data = {
      eduId: id
    };
    var response = this.props.removeMyEdu(data);
    console.log("response is", response);
  };

  removeWorkDetails = (event, id) => {
    const data = {
      workId: id
    };
    var response = this.props.removeMywork(data);
    console.log("response is", response);
  };

  addEduDetails = (event, id) => {
    const data = {
      yearofPassing: this.state.yearofPassing,
      collegeName: this.state.collegeName,
      degree: this.state.degree,
      major: this.state.major,
      studentId: this.state.studentId
    };
    console.log("submitContactDetailsDetails", this.props.studentExperience);
    var response = this.props.addEducation(data);
    console.log("response is", response);
    // console.log("Dataaaa is", data);
    // axios.post("http://localhost:3001/addEduDetails", data).then(response => {
    //   console.log("Status Code : ", response.status);
    //   if (response.status === 200) {
    //     console.log("Updated work details successfully");
    //   } else {
    //     console.log("Error Updating work page");
    //   }
    // });
  };
  addWorkDetails = (event, id) => {
    const data = {
      companyName: this.state.companyName,
      title: this.state.title,
      startDate: this.state.startDate,
      endDate: this.state.endDate,
      description: this.state.description,
      studentId: this.state.studentId
    };
    console.log("submitContactDetailsDetails", data);
    var response = this.props.addWork(data);
    console.log("response is", response);
  };

  render() {
    let redirectVar = null;
    if (!cookie.load("cookie")) {
      redirectVar = <Redirect to="/login" />;
    }
    const Success_message = () => (
      <div style={{ padding: 50 }}>
        <h3 style={{ color: "green" }}>SUCCESSFUL UPLOAD</h3>
        <a href={this.state.url}>Access the file here</a>
        <br />
      </div>
    );
    let fileUpload = (
      <div>
        <input type="file" name="file" onChange={this.onFileChange} />
        <button
          type="button"
          class="btn btn-success btn-block"
          onClick={this.onClickHandler}
        >
          Upload
        </button>
      </div>
    );
    //iterate over books to create a table row
    let studentDetails1 = this.props.studentBasicDetails.map(
      studentAllDetailResult => {
        console.log("Id iss::::::" + studentAllDetailResult.studentDetailsId);
        return studentAllDetailResult.carrierObjective;
      }
    );
    console.log("StudentDetails isssss:", studentDetails1);
    let studentDetails = this.props.studentObject.map(
      studentBasicDetailResult => {
        return (
          <div class="card">
            <h3>
              {studentBasicDetailResult.firstName}{" "}
              {studentBasicDetailResult.lastName}
              <button
                class="btn success"
                onClick={event =>
                  this.submitpersonalInfoDetails(
                    event,
                    studentBasicDetailResult.studentDetailsId
                  )
                }
              >
                Save
              </button>
            </h3>
            <br />
            <br />
            <div class="wrapper">
              <img src={require("../profile.jpg")} class="image--cover3"></img>
            </div>
            <br />
            <br />
            <input
              onChange={e =>
                this.handlemystudentDetailsChange(
                  e,
                  studentBasicDetailResult.studentId,
                  "presentlevelOfEducation"
                )
              }
              class="editableinput4"
              name="presentlevelOfEducation"
              defaultValue={studentBasicDetailResult.presentlevelOfEducation}
              placeholder={"Degree"}
            ></input>
            <input
              onChange={e =>
                this.handlemystudentDetailsChange(
                  e,
                  studentBasicDetailResult.studentId,
                  "collegeName"
                )
              }
              class="editableinput4"
              name="collegeName"
              defaultValue={studentBasicDetailResult.collegeName}
              placeholder={"University"}
            ></input>
            <input
              onChange={e =>
                this.handlemystudentDetailsChange(
                  e,
                  studentBasicDetailResult.studentId,
                  "presentCourse"
                )
              }
              class="editableinput4"
              name="presentCourse"
              defaultValue={studentBasicDetailResult.presentCourse}
              placeholder={"Major"}
            ></input>
            <input
              onChange={e =>
                this.handlemystudentDetailsChange(
                  e,
                  studentBasicDetailResult.studentId,
                  "graduationYear"
                )
              }
              class="editableinput4"
              name="graduationYear"
              defaultValue={studentBasicDetailResult.graduationYear}
              placeholder={"Graduation Year"}
            ></input>

            <br />
          </div>
        );
      }
    );

    let studentDetails2 = this.props.studentBasicDetails.map(
      studentBasicDetailResult => {
        return (
          <div class="card">
            <h3>
              Contact Information
              <button
                class="btn success"
                onClick={event =>
                  this.submitContactDetailsDetails(
                    event,
                    studentBasicDetailResult.studentDetailsId
                  )
                }
              >
                Save
              </button>
            </h3>
            <br />
            <input
              onChange={e =>
                this.handlemyChange(
                  e,
                  studentBasicDetailResult.studentDetailsId,
                  "phoneNumber"
                )
              }
              class="editableinput4"
              name="phoneNumber"
              defaultValue={studentBasicDetailResult.phoneNumber}
              placeholder={"Phone Number"}
            ></input>
            <input
              onChange={e =>
                this.handlemyChange(
                  e,
                  studentBasicDetailResult.studentDetailsId,
                  "city"
                )
              }
              class="editableinput4"
              name="city"
              defaultValue={studentBasicDetailResult.city}
              placeholder={"City"}
            ></input>
            <input
              onChange={e =>
                this.handlemyChange(
                  e,
                  studentBasicDetailResult.studentDetailsId,
                  "state"
                )
              }
              class="editableinput4"
              name="state"
              defaultValue={studentBasicDetailResult.state}
              placeholder={"State"}
            ></input>
            <input
              onChange={e =>
                this.handlemyChange(
                  e,
                  studentBasicDetailResult.studentDetailsId,
                  "country"
                )
              }
              class="editableinput4"
              name="country"
              defaultValue={studentBasicDetailResult.country}
              placeholder={"Country"}
            ></input>
            <input
              onChange={e =>
                this.handlemyChange(
                  e,
                  studentBasicDetailResult.studentDetailsId,
                  "dob"
                )
              }
              class="editableinput4"
              name="dob"
              defaultValue={studentBasicDetailResult.dob}
              placeholder={"DOB"}
            ></input>
          </div>
        );
      }
    );
    let studentDetails3 = this.props.studentBasicDetails.map(
      studentBasicDetailResult => {
        return (
          <div>
            <h3>
              Skills
              <button
                class="btn success"
                onClick={event =>
                  this.submitmyskillSet(
                    event,
                    studentBasicDetailResult.studentDetailsId,
                    "skillSet"
                  )
                }
              >
                Save
              </button>
            </h3>
            <br />
            <input
              onChange={e =>
                this.handlemyChange(
                  e,
                  studentBasicDetailResult.studentDetailsId,
                  "skillSet"
                )
              }
              class="editableinput4"
              name="skillSet"
              defaultValue={studentBasicDetailResult.skillSet}
            ></input>
          </div>
        );
      }
    );

    let addSkills = null;
    console.log("state is", this.state.addSkillsFlag);
    if (this.state.addSkillsFlag) {
      addSkills = (
        <div>
          <br />
          <input
            onChange={e =>
              this.handlemyChange(
                e,
                this.props.studentBasicDetails[0].studentDetailsId,
                "skillSet"
              )
            }
            class="editableinput4"
            name="skillSet"
            defaultValue="Skills"
          ></input>
          <button
            class="btn success"
            onClick={event =>
              this.submitmyskillSet(
                event,
                this.props.studentBasicDetails[0].studentDetailsId,
                "skillSet"
              )
            }
          >
            Save
          </button>
        </div>
      );
    }

    //iterate over books to create a table row
    let studentEducationDetails = this.props.studentEducation.map(
      studentAllEduDetailResult => {
        return (
          <div class="card">
            <form>
              <input
                onChange={e =>
                  this.handlemyEduChange(
                    e,
                    studentAllEduDetailResult.studentEduDetailsId,
                    "collegeName"
                  )
                }
                name="collegeName"
                class="editableinput3"
                type="text"
                defaultValue={studentAllEduDetailResult.collegeName}
              ></input>
              <br />
              <br />
              <input
                onChange={e =>
                  this.handlemyEduChange(
                    e,
                    studentAllEduDetailResult.studentEduDetailsId,
                    "degree"
                  )
                }
                class="editableinput"
                name="degree"
                defaultValue={studentAllEduDetailResult.degree}
              ></input>
              <br />
              <br />
              <input
                onChange={e =>
                  this.handlemyEduChange(
                    e,
                    studentAllEduDetailResult.studentEduDetailsId,
                    "major"
                  )
                }
                class="editableinput"
                name="major"
                defaultValue={studentAllEduDetailResult.major}
              ></input>
              <br />
              <br />
              <input
                onChange={e =>
                  this.handlemyEduChange(
                    e,
                    studentAllEduDetailResult.studentEduDetailsId,
                    "yearofPassing"
                  )
                }
                class="editableinput"
                name="yearofPassing"
                defaultValue={studentAllEduDetailResult.yearofPassing}
              ></input>
              <button
                class="btn success"
                onClick={event =>
                  this.removeEduDetails(
                    event,
                    studentAllEduDetailResult.studentEduDetailsId
                  )
                }
              >
                Remove
              </button>
              <button
                class="btn success"
                onClick={event =>
                  this.submitEduDetails(
                    event,
                    studentAllEduDetailResult.studentEduDetailsId
                  )
                }
              >
                Save
              </button>
            </form>
          </div>
        );
      }
    );

    //iterate over books to create a table row

    let Addeducation = null;
    console.log("state is", this.state.addEduFlag);
    if (this.state.addEduFlag) {
      Addeducation = (
        <div class="card">
          <form>
            <input
              onChange={e =>
                this.setState({
                  collegeName: e.target.value
                })
              }
              name="collegeName"
              class="editableinput3"
              type="text"
              placeholder={"University"}
            ></input>
            <br />
            <br />
            <input
              onChange={e =>
                this.setState({
                  degree: e.target.value
                })
              }
              class="editableinput"
              name="degree"
              placeholder="Level of Education"
            ></input>
            <br />
            <br />
            <input
              onChange={e =>
                this.setState({
                  major: e.target.value
                })
              }
              class="editableinput"
              name="major"
              placeholder="Major"
            ></input>
            <br />
            <br />
            <input
              onChange={e =>
                this.setState({
                  yearofPassing: e.target.value
                })
              }
              class="editableinput"
              name="yearofPassing"
              placeholder="Graduating year"
            ></input>
            <br />
            <br />
            <button
              class="btn success"
              onClick={event => this.addEduDetails(event)}
            >
              Save
            </button>
            <br />
          </form>
        </div>
      );
    }
    let studentWorkDetails = this.props.studentExperience.map(
      studentAllWorkDetailResult => {
        return (
          <div class="card">
            <form>
              <input
                onChange={e =>
                  this.handlemyWorkChange(
                    e,
                    studentAllWorkDetailResult.workExpDetailsId,
                    "companyName"
                  )
                }
                class="editableinput"
                name="companyName"
                defaultValue={studentAllWorkDetailResult.companyName}
              ></input>
              <br />
              <br />
              <input
                onChange={e =>
                  this.handlemyWorkChange(
                    e,
                    studentAllWorkDetailResult.workExpDetailsId,
                    "title"
                  )
                }
                class="editableinput"
                name="title"
                defaultValue={studentAllWorkDetailResult.title}
              ></input>
              <br />
              <br />
              <input
                onChange={e =>
                  this.handlemyWorkChange(
                    e,
                    studentAllWorkDetailResult.workExpDetailsId,
                    "startDate"
                  )
                }
                class="editableinput"
                name="startDate"
                defaultValue={studentAllWorkDetailResult.startDate}
              ></input>
              <br />
              <br />
              <input
                onChange={e =>
                  this.handlemyWorkChange(
                    e,
                    studentAllWorkDetailResult.workExpDetailsId,
                    "endDate"
                  )
                }
                class="editableinput"
                name="endDate"
                defaultValue={studentAllWorkDetailResult.endDate}
              ></input>
              <br />
              <br />
              <input
                onChange={e =>
                  this.handlemyWorkChange(
                    e,
                    studentAllWorkDetailResult.workExpDetailsId,
                    "description"
                  )
                }
                class="editableinput"
                name="description"
                defaultValue={studentAllWorkDetailResult.description}
              ></input>
              <button
                class="btn success"
                onClick={event =>
                  this.removeWorkDetails(
                    event,
                    studentAllWorkDetailResult.workExpDetailsId
                  )
                }
              >
                Remove
              </button>
              <button
                class="btn success"
                onClick={event =>
                  this.submitWorkDetails(
                    event,
                    studentAllWorkDetailResult.workExpDetailsId
                  )
                }
              >
                Save
              </button>
            </form>
          </div>
        );
      }
    );

    let Addexperience = null;
    console.log("state is", this.state.addWorkFlag);
    if (this.state.addWorkFlag) {
      Addexperience = (
        <div class="card">
          <form>
            <input
              onChange={e =>
                this.setState({
                  companyName: e.target.value
                })
              }
              name="companyName"
              class="editableinput3"
              type="text"
              placeholder={"Company Name"}
            ></input>
            <br />
            <br />
            <input
              onChange={e =>
                this.setState({
                  title: e.target.value
                })
              }
              class="editableinput"
              name="title"
              placeholder="Title"
            ></input>
            <br />
            <br />
            <input
              onChange={e =>
                this.setState({
                  startDate: e.target.value
                })
              }
              class="editableinput"
              name="startDate"
              placeholder="Start Date"
            ></input>
            <br />
            <br />
            <input
              onChange={e =>
                this.setState({
                  endDate: e.target.value
                })
              }
              class="editableinput"
              name="endDate"
              placeholder="End Date"
            ></input>
            <br />
            <br />
            <input
              onChange={e =>
                this.setState({
                  description: e.target.value
                })
              }
              class="editableinput"
              name="description"
              placeholder="Description"
            ></input>
            <button
              class="btn success"
              onClick={event => this.addWorkDetails(event)}
            >
              Save
            </button>
          </form>
        </div>
      );
    }

    return (
      <div>
        {redirectVar}
        <body>
          <button
            class="btn success"
            onClick={this.redirecttoUpdateProfilePage.bind(this)}
          >
            Go to Profile
          </button>
          <div class="row">
            <div class="leftcolumn">
              <h4>
                My Journey
                {/* <button class="btn success" onClick={e => this.addSkills()}>
                  Add Skills
                </button> */}
              </h4>
              <div class="card">
                {
                  <p>
                    <div>
                      <form>
                        <input
                          class="editableinput2"
                          type="text"
                          name="carrierObjective"
                          defaultValue={studentDetails1}
                          onChange={e =>
                            this.handlemyChange(
                              e,
                              this.state.studentDetailsId,
                              "carrierObjective"
                            )
                          }
                        />
                        <br />
                        <button
                          class="btn success"
                          onClick={event =>
                            this.submitmyJourney(
                              event,
                              this.state.studentDetailsId,
                              "carrierObjective"
                            )
                          }
                        >
                          Save
                        </button>
                        <br />
                        <br />
                      </form>
                    </div>
                  </p>
                }
              </div>
              <h4 class="Profileheading">
                Education
                <button class="btn success" onClick={e => this.addEducation()}>
                  Add Education
                </button>
                <br />
                <br />
              </h4>
              {Addeducation}
              {studentEducationDetails}

              <br />
              <h4 class="Profileheading">
                Work Experience
                <button class="btn success" onClick={e => this.addWork()}>
                  Add Work
                </button>
              </h4>
              {Addexperience}
              {studentWorkDetails}
            </div>
            <div class="rightcolumn">
              {studentDetails}
              {studentDetails2}
              <div class="card">{studentDetails3}</div>
              <div class="card">{fileUpload}</div>
            </div>
          </div>
        </body>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  studentObject: state.schools.studentObject,
  studentBasicDetails: state.schools.studentBasicDetails,
  studentExperience: state.schools.studentExperience,
  studentEducation: state.schools.studentEducation
});

//export Profile Component
export default connect(mapStateToProps, {
  fetchStudent,
  fetchStudentDetails,
  fetchEduDetails,
  fetchWorkExpDetails,
  editMyJourney,
  addEducation,
  addWork,
  editMyedu,
  editMyWork,
  editMyskills,
  editContactDetails,
  removeMyEdu,
  removeMywork,
  editPersonalInfo
})(UpdateProfile);
