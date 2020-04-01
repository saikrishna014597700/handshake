import React, { Component } from "react";
import "../../App.css";
import axios from "axios";
import { backend } from "../../webConfig";
import cookie from "react-cookies";
import { Redirect } from "react-router";

class CompanyEvents extends Component {
  constructor() {
    super();
    this.state = {
      events: [],
      showingAlert: false,
      companyId: "",
      redirect: null,
      eventname: "",
      eventDescription: "",
      eventtime: "",
      eventocation: "",
      eventEligibility: "",
      createEventFlag: false,
      searchValue: ""
    };
    this.handleChange = this.handleChange.bind(this);
    this.submitEventPosting = this.submitEventPosting.bind(this);
    this.cancelEventPosting = this.cancelEventPosting.bind(this);
    this.handleOnChange = this.handleOnChange.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
  }

  //get the books data from backend
  componentDidMount() {
    if (cookie.load("cookie")) {
      this.setState({
        companyId: cookie.load("cookie").split("+")[0]
      });
    }
    console.log("in componentDidMount", this.state.companyId);
    if (cookie.load("cookie")) {
      axios
        .get(backend + `/companyevents/${cookie.load("cookie").split("+")[0]}`)
        .then(response => {
          //update the state with the response data
          console.log("res is  :::", response);
          this.setState({
            events: this.state.events.concat(response.data)
          });
        });
    }
  }

  handleChange = (e, name) => {
    this.setState({
      [name]: e.target.value
    });
  };

  handleOnChange = event => {
    this.setState({ searchValue: event.target.value });
  };
  handleSearch = () => {
    const data = {
      companyId: this.state.companyId
    };
    axios
      .post(backend + `/companyeventSearch/${this.state.searchValue}`, data)
      .then(response => {
        if (response.data === "No event postings!") {
          alert(response.data);
        } else {
          this.setState({
            events: response.data
          });
        }
      });
  };

  render() {
    if (this.state.redirect) {
      return <Redirect to={this.state.redirect} />;
    }
    if (this.state.createEventFlag) {
      var createEvent = (
        <div class="card2">
          <form>
            <label style={{ marginTop: "18px", marginLeft: "40px" }}>
              Event Title:
              <br />
              <input
                class="editableinput5"
                value={this.state.value}
                onChange={e => this.handleChange(e, "eventname")}
                name="eventname"
                style={{ marginTop: "15px" }}
              />
            </label>
            <br />
            <label style={{ marginTop: "18px", marginLeft: "40px" }}>
              Description:
              <br />
              <input
                class="editableinput5"
                value={this.state.value}
                onChange={e => this.handleChange(e, "eventDescription")}
                name="eventDescription"
                style={{ marginTop: "20px" }}
              />
            </label>
            <br />
            <label style={{ marginTop: "18px", marginLeft: "40px" }}>
              Event Date:
              <br />
              <input
                type="date"
                class="editableinput5"
                name="eventtime"
                min="2019-01-01"
                max="2030-12-31"
                onChange={e => this.handleChange(e, "eventtime")}
              ></input>
            </label>
            <br />
            <label style={{ marginTop: "18px", marginLeft: "40px" }}>
              Location:
              <br />
              <input
                class="editableinput5"
                value={this.state.value}
                onChange={e => this.handleChange(e, "eventocation")}
                name="eventocation"
                style={{ marginTop: "20px" }}
              />
            </label>
            <br />
            <label style={{ marginTop: "18px", marginLeft: "40px" }}>
              Eligibility:
              <br />
              <input
                class="editableinput6"
                value={this.state.value}
                rows="10"
                cols="30"
                onChange={e => this.handleChange(e, "eventEligibility")}
                name="eventEligibility"
                style={{ marginTop: "20px" }}
              />
            </label>
            <br />
            <br />
            <br />
            <button
              class="btn2 success"
              onClick={event => this.cancelEventPosting(event)}
            >
              Cancel
            </button>
            <button
              class="btn3 success"
              onClick={event => this.submitEventPosting(event)}
            >
              Submit
            </button>
          </form>
          <br />
          <br />
          <br />
        </div>
      );
    }
    //iterate over books to create a table row
    if (this.state.showingAlert) {
      let alert = (
        <div
          className={`alert alert-success ${
            this.state.showingAlert ? "alert-shown" : "alert-hidden"
          }`}
        >
          <strong>Hurray!!</strong> You have successfully registered to this
          event
        </div>
      );
    }

    let events = this.state.events.map(event => {
      if (event.eventtime) {
        var eventTime = event.eventtime.slice(0, 10);
      }
      return (
        <div class="card2">
          <div class="wrapper">
            <img src={require("./events.jpg")} class="image--cover2"></img>
          </div>
          <h4>Event Name : {event.eventName}</h4>
          <h4>Location : {event.eventLocation}</h4>
          <h4>
            Event Date: {eventTime}
            <button
              class="btn success"
              onClick={event1 =>
                this.viewRegisteredStudents(
                  event1,
                  event.eventId,
                  event.fk_companyId
                )
              }
            >
              Registered Students
            </button>
          </h4>
          {/* <h4>Posting Date: {jobPosting.postingDate}</h4> */}
          <h4>Event Eligibility : {event.eventEligibility}</h4>
          <h5>Description : {event.eventDescription}</h5>
        </div>
      );
    });
    //if not logged in go to login page
    let redirectVar = null;
    console.log("Cookie is", cookie.load("cookie"));
    if (!cookie.load("cookie")) {
      redirectVar = <Redirect to="/login" />;
    }
    return (
      <div>
        {alert}
        {redirectVar}
        <div class="row">
          <h3 class="heading">
            {" "}
            Upcoming Events
            <button
              class="btn3 success"
              onClick={event => this.createEvent(event)}
            >
              Post an Event
            </button>
          </h3>
          <br />
          <br />
          <div>
            <input
              name="text"
              type="text"
              class="searchComponent"
              placeholder="  Search for an Event Name / Location"
              onChange={event => this.handleOnChange(event)}
              value={this.state.searchValue}
            />
            <button class="button" onClick={this.handleSearch}>
              Search
            </button>
          </div>
          <br />
          {createEvent}
          <br />
          <div>{events}</div>
        </div>
      </div>
    );
  }

  createEvent = event => {
    this.setState({ createEventFlag: true });
  };

  viewRegisteredStudents = (event, eventId, companyId) => {
    this.setState({ redirect: `/studentsRegisteredForEvent/${eventId}` });
  };

  submitEventPosting = event => {
    const data = {
      eventname: this.state.eventname,
      eventDescription: this.state.eventDescription,
      eventtime: this.state.eventtime,
      eventocation: this.state.eventocation,
      eventEligibility: this.state.eventEligibility,
      companyId: cookie.load("cookie").split("+")[0]
    };
    axios.post(backend+"/postEvent", data).then(response => {
      this.setState({
        events: response.data
      });
    });
    this.setState({ createEventFlag: false });
  };
  cancelEventPosting = event => {
    this.setState({ createEventFlag: false });
  };
}
//export Home Component
export default CompanyEvents;
