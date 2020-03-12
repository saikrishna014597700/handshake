import React, { Component } from "react";
import "../../register.css";
import axios from "axios";
import { backend } from "../../webConfig";
import cookie from "react-cookies";
import { Redirect } from "react-router";
import { connect } from "react-redux";
import { companyRegister } from "../../actions/fetchStudent";

class CompanyRegister extends Component {
  constructor(props) {
    super(props);
    //maintain the state required for this component
    this.state = {
      email: "",
      companyName: "",
      companyPassword: "",
      location: "",
      registerFlag: false
    };
    //Bind the handlers to this class
    this.emailChangeHandler = this.emailChangeHandler.bind(this);
    this.companyNameChangeHandler = this.companyNameChangeHandler.bind(this);
    this.companyPasswordChangeHandler = this.companyPasswordChangeHandler.bind(
      this
    );
    this.locationChangeHandler = this.locationChangeHandler.bind(this);
    this.submitRegister = this.submitRegister.bind(this);
  }

  emailChangeHandler = e => {
    this.setState({
      email: e.target.value
    });
  };

  companyNameChangeHandler = e => {
    this.setState({
      companyName: e.target.value
    });
  };

  companyPasswordChangeHandler = e => {
    this.setState({
      companyPassword: e.target.value
    });
  };

  locationChangeHandler = e => {
    this.setState({
      location: e.target.value
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
      companyName: this.state.companyName,
      companyPassword: this.state.companyPassword,
      location: this.state.location
    };
    //set the with credentials to true
    axios.defaults.withCredentials = true;
    console.log("data before company registration post", data);
    await this.props.companyRegister(data);
    console.log("response from props:", this.props.signupResponse);
    if (this.props.signupResponse === "Login successed") {
      console.log("response.status", this.props.signupResponse.status);
      this.setState({
        registerFlag: true
      });
    } else {
      this.setState({
        registerFlag: false
      });
    }
  }

  render() {
    //iterate over books to create a table row
    //if not logged in go to login page
    let redirectVar = null;
    if (this.state.registerFlag) {
      console.log("Register is:::", this.state.registerFlag);
      redirectVar = <Redirect to="/login/2" />;
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
            <h1>Register as Company</h1>
            <form action="register" method="POST">
              <input
                type="text"
                name="email"
                onChange={this.emailChangeHandler}
                placeholder="Email"
                required
              />
              <input
                type="text"
                onChange={this.companyNameChangeHandler}
                name="companyName"
                placeholder="Company Name"
                required
              />
              <input
                type="password"
                onChange={this.passnameChangeHandler}
                name="companyPassword"
                placeholder="Company Password"
                required
              />
              <input
                type="text"
                onChange={this.locationChangeHandler}
                name="location"
                placeholder="Location"
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
  companyRegister
})(CompanyRegister);
