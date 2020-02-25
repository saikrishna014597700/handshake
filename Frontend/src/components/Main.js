import React, { Component } from "react";
import { Route } from "react-router-dom";
import Login from "./Login/Login";
import Home from "./Home/Home";
import Events from "./Events/Events";
import Register from "./Register/Register";
import Delete from "./Delete/Delete";
import Create from "./Create/Create";
import Students from "./Students/Students";
import Profile from "./Profile/Profile";
import UpdateProfile from "./UpdateProfile/UpdateProfile";
import StudentProfile from "./StudentProfile/StudentProfile";
import Navbar from "./LandingPage/Navbar";
import CompanyDashboard from "./../CompanyComponents/CompanyDashboard/CompanyDashboard";

//Create a Main Component
class Main extends Component {
  render() {
    return (
      <div>
        {/*Render Different Component based on Route*/}
        <Route path="/" component={Navbar} />
        <Route path="/login/1" component={Login} />
        <Route path="/login/2" component={Login} />
        <Route path="/home" component={Home} />
        <Route path="/profile" component={Profile} />
        <Route path="/profile/:id" component={Profile} />
        <Route path="/register" component={Register} />
        <Route path="/events" component={Events} />
        <Route path="/delete" component={Delete} />
        <Route path="/student" component={Students} />
        <Route path="/UpdateProfile" component={UpdateProfile} />
        <Route path="/myjourney" component={UpdateProfile} />
        <Route path="/create" component={Create} />
        <Route path="/studentprofile/:id" component={StudentProfile} />
        <Route path="/companyDashboard" component={CompanyDashboard} />
      </div>
    );
  }
}
//Export The Main Component
export default Main;
