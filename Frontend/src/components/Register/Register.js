import React, { Component } from "react";
import "../../register.css";
import axios from "axios";
import { backend } from "../../webConfig";
import cookie from "react-cookies";
import { Redirect } from "react-router";
import { connect } from "react-redux";
import { studentRegister } from "../../actions/fetchStudent";

class Register extends Component {
  constructor(props) {
    super(props);
    //maintain the state required for this component
    this.state = {
      email: "",
      firstName: "",
      lastName: "",
      univname: "",
      password: "",
      registerFlag: false
    };
    //Bind the handlers to this class
    this.emailChangeHandler = this.emailChangeHandler.bind(this);
    this.firstnameChangeHandler = this.firstnameChangeHandler.bind(this);
    this.lastnameChangeHandler = this.lastnameChangeHandler.bind(this);
    this.univnameChangeHandler = this.univnameChangeHandler.bind(this);
    this.passnameChangeHandler = this.passnameChangeHandler.bind(this);
    this.submitRegister = this.submitRegister.bind(this);
  }

  // componentWillMount() {
  //   this.setState({
  //     registerFlag: false
  //   });
  // }
  //username change handler to update state variable with the text entered by the user
  emailChangeHandler = e => {
    this.setState({
      email: e.target.value
    });
  };

  firstnameChangeHandler = e => {
    this.setState({
      firstName: e.target.value
    });
  };

  lastnameChangeHandler = e => {
    this.setState({
      lastName: e.target.value
    });
  };

  univnameChangeHandler = e => {
    this.setState({
      univname: e.target.value
    });
  };

  passnameChangeHandler = e => {
    this.setState({
      password: e.target.value
    });
  };

  async submitRegister(e) {
    // eslint-disable-next-line
    var headers = new Headers();
    //prevent page from refresh
    e.preventDefault();
    console.log("email is", this.state.firstName);
    const data = {
      email: this.state.email,
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      collegeName: this.state.univname,
      studentPassword: this.state.password
    };
    //set the with credentials to true
    axios.defaults.withCredentials = true;
    console.log("data before company registration post", data);
    await this.props.studentRegister(data);
    console.log("response from props:", this.props.signupResponse);
    if (this.props.signupResponse.status === 200) {
      console.log("response.status", this.props.signupResponse.status);
      this.setState({
        registerFlag: true
      });
    } else {
      this.setState({
        registerFlag: false
      });
    }

    //make a post request with the user data
    // axios.post(backend+"/register", data).then(response => {
    //   console.log("Status Code : ", response.status);
    //   if (response.status === 200) {
    //     this.setState({
    //       registerFlag: true
    //     });
    //   } else {
    //     this.setState({
    //       registerFlag: false
    //     });
    //   }
    // });
  }

  render() {
    //iterate over books to create a table row
    //if not logged in go to login page
    let redirectVar = null;
    if (this.state.registerFlag) {
      console.log("Register is:::", this.state.registerFlag);
      redirectVar = <Redirect to="/login/1" />;
    }

    return (
      <div>
        {redirectVar}
        <head>
          <meta charset="utf-8" />
          <title>Register to Handshake</title>
        </head>
        <body>
          <div class="register-form">
            <h1>Register as Student</h1>
            <form action="register" method="POST">
              <input
                type="text"
                name="email"
                onChange={this.emailChangeHandler}
                placeholder="email"
                required
              />
              <input
                type="text"
                onChange={this.firstnameChangeHandler}
                name="firstName"
                placeholder="First Name"
                required
              />
              <input
                type="text"
                onChange={this.lastnameChangeHandler}
                name="lastName"
                placeholder="Last Name"
                required
              />
              <input
                type="text"
                onChange={this.univnameChangeHandler}
                name="univname"
                placeholder="University"
                required
              />
              <input
                type="password"
                onChange={this.passnameChangeHandler}
                name="password"
                placeholder="Password"
                required
              />
              <button onClick={this.submitRegister} class="btn btn-primary">
                Register
              </button>
            </form>
          </div>
        </body>
      </div>
    );
  }
}
const mapStateToProps = state => ({
  signupResponse: state.schools.signupResponse,
  student: state.schools.student
});

export default connect(mapStateToProps, {
  studentRegister
})(Register);
