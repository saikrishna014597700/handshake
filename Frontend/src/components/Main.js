import React, { Component } from "react";
import { Route } from "react-router-dom";
import Login from "./Login/Login";
import Home from "./Home/Home";
import JobDescription from "./Home/JobDescription";
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
import store from "../store";
import { Provider } from "react-redux";

//Create a Main Component
class Main extends Component {
  render() {
    return (
      <Provider store={store}>
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
          {/* <Route path="/myjourney" component={UpdateProfile} /> */}
          <Route path="/create" component={Create} />
          <Route path="/studentprofile/:id" component={StudentProfile} />
          <Route path="/jobDetails/:id" component={JobDescription} />
          <Route path="/companyDashboard" component={CompanyDashboard} />
        </div>
      </Provider>
    );
  }
}
//Export The Main Component
export default Main;
