import React, { Component } from "react";
import { Link } from "react-router-dom";
import cookie from "react-cookies";
import { Redirect } from "react-router";
import "../../profile.css";
// import loginImage from "./loginImage.jpg";
// import "bootstrap/dist/css/bootstrap.min.css";

//create the Navbar Component
class Navbar extends Component {
  constructor(props) {
    super(props);
    this.handleLogout = this.handleLogout.bind(this);
  }
  //handle logout to destroy the cookie
  handleLogout = () => {
    cookie.remove("cookie", { path: "/" });
  };
  render() {
    //if Cookie is set render Logout Button
    let navLogin = null;
    if (cookie.load("cookie")) {
      console.log("Able to read cookie");
      navLogin = (
        <ul class="nav navbar-nav navbar-righ">
          <li>
            <Link to="/" onClick={this.handleLogout}>
              <span class="glyphicon glyphicon-user"></span>Logout
            </Link>
          </li>
        </ul>
      );
    } else {
      //Else display login button
      console.log("Not Able to read cookie");
      navLogin = (
        <ul class="nav navbar-nav navbar-right">
          <li>
            <Link to="/login">
              <span class="glyphicon glyphicon-log-in"></span> Login
            </Link>
          </li>
        </ul>
      );
    }
    let redirectVar = null;
    var loginFLag = false;
    var studentFlag = false;
    var companyFlag = false;
    if (
      cookie.load("cookie") &&
      cookie.load("cookie").split("+")[1] === "student"
    ) {
      redirectVar = <Redirect to="/home" />;
      loginFLag = true;
      studentFlag = true;
    } else if (
      cookie.load("cookie") &&
      cookie.load("cookie").split("+")[1] === "company"
    ) {
      redirectVar = <Redirect to="/companyDashboard" />;
      loginFLag = true;
      companyFlag = true;
    }
    var loggedInNav;
    if (loginFLag && studentFlag) {
      loggedInNav = (
        <div class="navbar-header">
          <a class="navbar-brand">Handshake</a>
          <ul class="nav navbar-nav">
            <li class="li-class">
              <Link to="/home">Jobs</Link>
            </li>
            <li>
              <Link to="/events">Events</Link>
            </li>
            <li>
              <Link to="/applications">Applications</Link>
            </li>
            <li>
              <Link to="/student">Students</Link>
            </li>
            <li>
              <Link to="/profile">Profile</Link>
            </li>
          </ul>
        </div>
      );
    } else if (loginFLag && companyFlag) {
      loggedInNav = (
        <div class="navbar-header">
          <a class="navbar-brand">Handshake</a>
          <ul class="nav navbar-nav">
            <li>
              <div class="active-cyan-3 active-cyan-4 mb-4">
                <input
                  class="form-control"
                  type="text"
                  placeholder="Search"
                  aria-label="Search"
                />
              </div>
            </li>
            <li class="li-class">
              <Link to="/companyDashboard">Dashboard</Link>
            </li>
            <li>
              <Link to="/companyevents">Events</Link>
            </li>

            <li>
              <Link to="/student">Students</Link>
            </li>

            <li>
              <Link to="/companyprofile">Profile</Link>
            </li>
          </ul>
        </div>
      );
    } else {
      loggedInNav = (
        <div class="navbar-header">
          <a class="navbar-brand">Handshake</a>
          <ul class="nav navbar-nav">
            <li class="li-class">
              <Link to="/login/1">Students</Link>
            </li>
            <li>
              <Link to="/login/2">Employers</Link>
            </li>
            <li>
              <Link to="/carrierCenters">Carrier Ceters</Link>
            </li>
          </ul>
        </div>
      );
    }

    return (
      <div>
        {redirectVar}
        <nav class="navbar navbar-inverse">
          <div class="container-fluid">
            {loggedInNav}
            <ul class="nav navbar-nav"></ul>
            {navLogin}
          </div>
        </nav>
        {/* <button
          onClick={this.renderLoginAsStudent.bind(this)}
          class="btn-primaryLanding"
        >
          Login as Student
        </button>
        <br />
        <button
          onClick={this.renderLoginAsCompany.bind(this)}
          class="btn-primaryLanding2"
        > 
          Login as an organization
        </button>*/}
      </div>
    );
  }

  renderLoginAsStudent() {
    this.props.history.push("/login");
  }

  renderLoginAsCompany() {
    // this.props.history.push("/Register");
  }
}

export default Navbar;
