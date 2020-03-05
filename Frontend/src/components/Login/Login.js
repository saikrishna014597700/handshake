import React, { Component } from "react";
import "../../App.css";
import axios from "axios";
import cookie from "react-cookies";
import { Redirect } from "react-router";
import { login } from "../../actions/fetchStudent";
import { connect } from "react-redux";

//Define a Login Component
class Login extends Component {
  //call the constructor method
  constructor(props) {
    //Call the constrictor of Super class i.e The Component
    super(props);
    //maintain the state required for this component
    this.state = {
      username: "",
      password: "",
      authFlag: false,
      roleFlag: this.props.match.url
    };
    console.log("roleflag is", this.state.roleFlag);
    //Bind the handlers to this class
    this.usernameChangeHandler = this.usernameChangeHandler.bind(this);
    this.passwordChangeHandler = this.passwordChangeHandler.bind(this);
    this.submitLogin = this.submitLogin.bind(this);
  }
  //Call the Will Mount to set the auth Flag to false
  componentWillMount() {
    this.setState({
      authFlag: false
    });
  }
  //username change handler to update state variable with the text entered by the user
  usernameChangeHandler = e => {
    this.setState({
      username: e.target.value
    });
  };
  //password change handler to update state variable with the text entered by the user
  passwordChangeHandler = e => {
    this.setState({
      password: e.target.value
    });
  };
  //submit Login handler to send a request to the node backend
  async submitLogin() {
    // eslint-disable-next-line
    var headers = new Headers();
    //prevent page from refresh
    // e.preventDefault();
    const data = {
      username: this.state.username,
      password: this.state.password
    };
    //set the with credentials to true
    axios.defaults.withCredentials = true;
    //make a post request with the user data
    if (this.state.roleFlag === "/login/1") {
      await this.props.login(data);
      console.log(
        "login Response from props in login component status:",
        this.props.loginResponse.status
      );
      if (this.props.loginResponse.status === 200) {
        //console.log();
        console.log("response.status", this.props.loginResponse);

        var x = await cookie.load("cookie");
        console.log("Cookie is", x);

        this.setState({
          loginFlag: true
        });
      } else {
        this.setState({
          loginFlag: false
        });
      }
    } else {
      console.log("In companylogin");
      axios.post("http://localhost:3001/companylogin", data).then(response => {
        console.log("Status Code : ", response.status);
        if (response.status === 200) {
          this.setState({
            loginFlag: true
          });
        } else {
          this.setState({
            loginFlag: false
          });
        }
      });
    }
  }

  fun() {
    this.props.history.push("/Register");
  }

  render() {
    //redirect based on successful login
    let redirectVar = null;
    if (cookie.load("cookie") && this.state.roleFlag === "/login/1") {
      console.log("In 1");
      redirectVar = <Redirect to="/home" />;
    } else if (cookie.load("cookie") && this.state.roleFlag === "/login/2") {
      console.log("In 2");
      redirectVar = <Redirect to="/companyDashboard" />;
    }
    let loginText;
    if (this.state.roleFlag === "/login/1") {
      loginText = (
        <div class="panel">
          <h2>Student Handshake Login</h2>
        </div>
      );
    } else {
      loginText = (
        <div class="panel">
          <h2>Employer Handshake Login</h2>
        </div>
      );
    }
    return (
      <div>
        {redirectVar}
        <div class="container">
          <div class="login-form">
            <div class="main-div">
              {loginText}
              <div class="form-group">
                <input
                  onChange={this.usernameChangeHandler}
                  type="text"
                  class="form-control"
                  name="username"
                  placeholder="Username"
                />
              </div>
              <div class="form-group">
                <input
                  onChange={this.passwordChangeHandler}
                  type="password"
                  class="form-control"
                  name="password"
                  placeholder="Password"
                />
              </div>
              <br />
              <button onClick={this.submitLogin} class="btn btn-primary">
                Login
              </button>
              <br />
              <br />
              <br />
              <button class="btn btn-primary" onClick={this.fun.bind(this)}>
                Register
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
//export Login Component
const mapStateToProps = state => ({
  loginResponse: state.schools.loginResponse
});

//export Profile Component
export default connect(mapStateToProps, {
  login
})(Login);
