import React, { Component } from "react";
import "../../profile.css";
import axios from "axios";
import cookie from "react-cookies";
import { Redirect } from "react-router";
import { Link } from "react-router-dom";

class UpdateProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      studentBasicDetailsResult: [],
      studentAllDetailsResult: [],
      studentAllEduDetailsResult: [],
      studentAllWorkDetailsResult: [],
      myJourney: [],
      yearofPassing: "",
      collegeName: "",
      degree: "",
      major: "",
      studentId: "1",
      addFlag: false,
      company: "",
      role: "",
      startDate: "",
      endDate: ""
    };
    this.handlemyJourneyChange = this.handlemyJourneyChange.bind(this);
    this.handlemyEduChange = this.handlemyEduChange.bind(this);
    this.submitmyJourney = this.submitmyJourney.bind(this);
    this.submitEduDetails = this.submitEduDetails.bind(this);
    this.removeEduDetails = this.removeEduDetails.bind(this);
    this.submitmyskillSet = this.submitmyskillSet.bind(this);
    this.submitContactDetailsDetails = this.submitContactDetailsDetails.bind(
      this
    );
    this.submitpersonalInfoDetails = this.submitpersonalInfoDetails.bind(this);
    this.addEduDetails = this.addEduDetails.bind(this);
    this.addWorkDetails = this.addWorkDetails.bind(this);
  }
  //get the books data from backend
  componentDidMount() {
    console.log("in componentDidMount");
    const data = {
      studentId: this.state.studentId
    };
    axios
      .get(`http://localhost:3001/profilestudent/${this.state.studentId}`)
      .then(response => {
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
        this.setState({
          myJourney: this.state.myJourney.concat(response.data)
        });
        console.log("myJourney is", this.state.myJourney);
      });
    console.log("in componentDidMount");
    axios
      .get(`http://localhost:3001/profileEduDetails/${this.state.studentId}`)
      .then(response => {
        //update the state with the response data
        console.log("Education  :::", response);
        this.setState({
          studentAllEduDetailsResult: this.state.studentAllEduDetailsResult.concat(
            response.data
          )
        });
      });
    console.log("in componentDidMount");
    axios
      .get(`http://localhost:3001/profileWorkDetails/${this.state.studentId}`)
      .then(response => {
        //update the state with the response data
        console.log("Work  :::", response);
        this.setState({
          studentAllWorkDetailsResult: this.state.studentAllWorkDetailsResult.concat(
            response.data
          )
        });
      });
  }

  redirecttoUpdateProfilePage() {
    this.props.history.push("/Profile");
  }

  handlemyJourneyChange = e => {
    this.setState({
      myJourney: e.target.value
    });
  };

  handlemyEduChange = (e, id, name) => {
    const studentEduDetails = this.state.studentAllEduDetailsResult;
    studentEduDetails.map(studentEduDetail => {
      if (studentEduDetail.studentEduDetailsId === id) {
        studentEduDetail[name] = e.target.value;
        studentEduDetail.edited = true;
      }
    });
    console.log("studentEduDetails", studentEduDetails);
    this.setState({ studentAllEduDetailsResult: studentEduDetails });
  };

  handlemyWorkChange = (e, id, name) => {
    const studentWorkDetails = this.state.studentAllWorkDetailsResult;
    studentWorkDetails.map(studentWorkDetail => {
      if (studentWorkDetail.workExpDetailsId === id) {
        studentWorkDetail[name] = e.target.value;
      }
    });
    console.log("studentEduDetails", studentWorkDetails);
    this.setState({ studentAllEduDetailsResult: studentWorkDetails });
  };

  handlemySkillsetChange = (e, id, name) => {
    const studentAllDetailsResult = this.state.studentAllDetailsResult;
    studentAllDetailsResult.map(studentAllDetailResult => {
      if (studentAllDetailResult.studentDetailsId === id) {
        studentAllDetailResult[name] = e.target.value;
      }
    });
    this.setState({ studentAllDetailsResult: studentAllDetailsResult });
  };

  handlemyPersonalInfoChange = (e, id, name) => {
    const studentBasicDetailsResult = this.state.studentBasicDetailsResult;
    studentBasicDetailsResult.map(studentBasicDetailResult => {
      if (studentBasicDetailResult.studentId === id) {
        studentBasicDetailResult[name] = e.target.value;
      }
    });
    this.setState({ studentBasicDetailsResult: studentBasicDetailsResult });
  };

  render() {
    let redirectVar = null;
    if (!cookie.load("cookie")) {
      redirectVar = <Redirect to="/login" />;
    }
    //iterate over books to create a table row
    let studentDetails1 = this.state.studentAllDetailsResult.map(
      studentAllDetailResult => {
        console.log("Id iss::::::" + studentAllDetailResult.studentDetailsId);
        return (
          <div>
            <form>
              <input
                class="editableinput2"
                type="text"
                placeholder={studentAllDetailResult.carrierObjective}
                onChange={this.handlemyJourneyChange}
              />
              <button
                class="btn success"
                onClick={event =>
                  this.submitmyJourney(
                    event,
                    studentAllDetailResult.studentDetailsId,
                    "carrierObjective"
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
    let studentDetails = this.state.studentBasicDetailsResult.map(
      studentBasicDetailResult => {
        return (
          <div class="card">
            <h2>
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
            </h2>
            <br />
            <div class="fakeimg" style={{ height: "100px;" }}>
              {"Loading"}
            </div>
            <br />
            <input
              onChange={e =>
                this.handlemyPersonalInfoChange(
                  e,
                  studentBasicDetailResult.studentId,
                  "presentlevelOfEducation"
                )
              }
              class="editableinput4"
              name="presentlevelOfEducation"
              placeholder={studentBasicDetailResult.presentlevelOfEducation}
            ></input>
            <input
              onChange={e =>
                this.handlemyPersonalInfoChange(
                  e,
                  studentBasicDetailResult.studentId,
                  "presentCourse"
                )
              }
              class="editableinput4"
              name="presentCourse"
              placeholder={studentBasicDetailResult.presentCourse}
            ></input>
            <h4>{"Graduation Year: "}</h4>
            <input
              onChange={e =>
                this.handlemyPersonalInfoChange(
                  e,
                  studentBasicDetailResult.studentId,
                  "graduationYear"
                )
              }
              class="editableinput4"
              name="graduationYear"
              placeholder={studentBasicDetailResult.graduationYear}
            ></input>

            <br />
          </div>
        );
      }
    );

    let studentDetails2 = this.state.studentAllDetailsResult.map(
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
                this.handlemySkillsetChange(
                  e,
                  studentBasicDetailResult.studentDetailsId,
                  "phoneNumber"
                )
              }
              class="editableinput4"
              name="phoneNumber"
              placeholder={studentBasicDetailResult.phoneNumber}
            ></input>
            <input
              onChange={e =>
                this.handlemySkillsetChange(
                  e,
                  studentBasicDetailResult.studentDetailsId,
                  "city"
                )
              }
              class="editableinput4"
              name="city"
              placeholder={studentBasicDetailResult.city}
            ></input>
            <input
              onChange={e =>
                this.handlemySkillsetChange(
                  e,
                  studentBasicDetailResult.studentDetailsId,
                  "state"
                )
              }
              class="editableinput4"
              name="state"
              placeholder={studentBasicDetailResult.state}
            ></input>
            <input
              onChange={e =>
                this.handlemySkillsetChange(
                  e,
                  studentBasicDetailResult.studentDetailsId,
                  "country"
                )
              }
              class="editableinput4"
              name="country"
              placeholder={studentBasicDetailResult.country}
            ></input>
            <input
              onChange={e =>
                this.handlemySkillsetChange(
                  e,
                  studentBasicDetailResult.studentDetailsId,
                  "dob"
                )
              }
              class="editableinput4"
              name="dob"
              placeholder={studentBasicDetailResult.dob}
            ></input>
          </div>
        );
      }
    );
    let studentDetails3 = this.state.studentAllDetailsResult.map(
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
                this.handlemySkillsetChange(
                  e,
                  studentBasicDetailResult.studentDetailsId,
                  "skillSet"
                )
              }
              class="editableinput4"
              name="skillSet"
              placeholder={studentBasicDetailResult.skillSet}
            ></input>
          </div>
        );
      }
    );

    //iterate over books to create a table row
    let studentEducationDetails = this.state.studentAllEduDetailsResult.map(
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
                placeholder={studentAllEduDetailResult.collegeName}
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
                placeholder={studentAllEduDetailResult.degree}
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
                placeholder={studentAllEduDetailResult.major}
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
                placeholder={studentAllEduDetailResult.yearofPassing}
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
    let studentWorkDetails = this.state.studentAllWorkDetailsResult.map(
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
                placeholder={studentAllWorkDetailResult.companyName}
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
                placeholder={studentAllWorkDetailResult.title}
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
                placeholder={studentAllWorkDetailResult.startDate}
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
                placeholder={studentAllWorkDetailResult.endDate}
              ></input>
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
    let Addeducation;
    console.log("state is", this.state.addFlag);
    if (this.state.addFlag) {
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

            <button
              class="btn success"
              onClick={event => this.addEduDetails(event)}
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
              <h2>My Journey</h2>
              <div class="card">{<p>{studentDetails1}</p>}</div>
              <h2 class="Profileheading">
                Education
                <button
                  class="btn success"
                  onClick={() =>
                    this.setState({
                      addFlag: true
                    })
                  }
                >
                  Add Education
                </button>
              </h2>
              {Addeducation}
              {studentEducationDetails}

              <br />
              <h2 class="Profileheading">
                Work Experience
                <button class="btn success">Add Work</button>
              </h2>
              {studentWorkDetails}
            </div>
            <div class="rightcolumn">
              {studentDetails}
              {studentDetails2}
              <div class="card">{studentDetails3}</div>
            </div>
          </div>
        </body>
      </div>
    );
  }

  submitmyJourney = (event, id, name) => {
    const data = {
      id: id,
      myJourney: this.state.myJourney
    };
    axios.put("http://localhost:3001/myjourney", data).then(response => {
      console.log("Status Code : ", response.status);
      if (response.status === 200) {
        console.log("Updated carrierObjective details successfully");
      } else {
        console.log("Error Updating carrierObjective page");
      }
    });
  };

  submitEduDetails = (event, id) => {
    const data = {
      studentAllEduDetailsResult: this.state.studentAllEduDetailsResult
    };
    axios
      .post("http://localhost:3001/updateEduDetails", data)
      .then(response => {
        console.log("Status Code : ", response.status);
        if (response.status === 200) {
          console.log("Updated edu details successfully");
        } else {
          console.log("Error Updating Profile page");
        }
      });
  };

  removeEduDetails = (event, id) => {
    const data = {
      eduId: id
    };
    axios
      .post("http://localhost:3001/deleteEduDetails", data)
      .then(response => {
        console.log("Status Code : ", response.status);
        if (response.status === 200) {
          console.log("Updated edu details successfully");
        } else {
          console.log("Error Updating Profile page");
        }
      });
  };

  submitWorkDetails = (event, id) => {
    const data = {
      studentAllWorkDetailsResult: this.state.studentAllWorkDetailsResult
    };
    axios
      .post("http://localhost:3001/updateWorkDetails", data)
      .then(response => {
        console.log("Status Code : ", response.status);
        if (response.status === 200) {
          console.log("Updated work details successfully");
        } else {
          console.log("Error Updating work page");
        }
      });
  };

  submitmyskillSet = (event, id) => {
    const data = {
      studentAllDetailsResult: this.state.studentAllDetailsResult
    };
    axios.post("http://localhost:3001/updateskillSet", data).then(response => {
      console.log("Status Code : ", response.status);
      if (response.status === 200) {
        console.log("Updated work details successfully");
      } else {
        console.log("Error Updating work page");
      }
    });
  };
  submitContactDetailsDetails = (event, id) => {
    const data = {
      studentAllDetailsResult: this.state.studentAllDetailsResult
    };
    axios
      .post("http://localhost:3001/updateContactdetails", data)
      .then(response => {
        console.log("Status Code : ", response.status);
        if (response.status === 200) {
          console.log("Updated work details successfully");
        } else {
          console.log("Error Updating work page");
        }
      });
  };
  submitpersonalInfoDetails = (event, id) => {
    const data = {
      yearofPassing: this.state.yearofPassing,
      collegeName: this.state.collegeName,
      degree: this.state.degree,
      major: this.state.major,
      studentId: this.state.studentId
    };
    axios
      .post("http://localhost:3001/updateEduDetails", data)
      .then(response => {
        console.log("Status Code : ", response.status);
        if (response.status === 200) {
          console.log("Updated work details successfully");
        } else {
          console.log("Error Updating work page");
        }
      });
  };
  addEduDetails = (event, id) => {
    const data = {
      yearofPassing: this.state.yearofPassing,
      collegeName: this.state.collegeName,
      degree: this.state.degree,
      major: this.state.major,
      studentId: this.state.studentId
    };
    console.log("Dataaaa is", data);
    axios.post("http://localhost:3001/addEduDetails", data).then(response => {
      console.log("Status Code : ", response.status);
      if (response.status === 200) {
        console.log("Updated work details successfully");
      } else {
        console.log("Error Updating work page");
      }
    });
  };
  addWorkDetails = (event, id) => {
    const data = {
      company: this.state.company,
      role: this.state.role,
      startDate: this.state.startDate,
      endDate: this.state.endDate,
      studentId: this.state.studentId
    };
    axios.post("http://localhost:3001/addWorkDetails", data).then(response => {
      console.log("Status Code : ", response.status);
      if (response.status === 200) {
        console.log("Updated work details successfully");
      } else {
        console.log("Error Updating work page");
      }
    });
  };
}

//export Profile Component
export default UpdateProfile;
