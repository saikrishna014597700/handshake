import React, { Component } from "react";
import "../../App.css";
import axios from "axios";
import { backend } from "../../webConfig";
import cookie from "react-cookies";
import { Redirect } from "react-router";
import Popup from "../Popup/Popup";

class Events extends Component {
  constructor() {
    super();
    this.state = {
      events: [],
      showingAlert: false,
      showPopup: false,
      searchValue: "",
      studentprofile: [],
      studentMajor: "",
      registeredEventIds: [],
      registeredEvents: []
    };
    this.handleOnChange = this.handleOnChange.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
  }

  //get the books data from backend
  componentDidMount() {
    console.log("in componentDidMount");

    if (cookie.load("cookie")) {
      axios
        .get(backend + `/profilestudent/${cookie.load("cookie").split("+")[0]}`)
        .then(response => {
          this.setState({
            studentprofile: this.state.studentprofile.concat(response.data)
          });
          this.state.studentprofile.map(student => {
            this.setState({
              studentMajor: student.presentCourse
            });
          });
        });
      axios.get(backend + "/events").then(response => {
        //update the state with the response data
        console.log("res is  :::", response);
        this.setState({
          events: this.state.events.concat(response.data)
        });
      });
      if (cookie.load("cookie")) {
        var eventIdss = [];
        if (cookie.load("cookie")) {
          axios
            .get(
              backend +
                `/getStudentRegisteredEvents/${
                  cookie.load("cookie").split("+")[0]
                }`
            )
            .then(response => {
              //update the state with the response data
              this.setState({
                registeredEvents: response.data
              });
              this.state.registeredEvents.map(registeredEvent => {
                eventIdss.push(registeredEvent.fk_eventId);
              });
              this.setState({
                registeredEventIds: eventIdss
              });
            });
        }
      }
    }
  }

  handleOnChange = event => {
    this.setState({ searchValue: event.target.value });
  };
  handleSearch = () => {
    axios
      .get(backend + `/eventSearch/${this.state.searchValue}`)
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

  viewRegisteredEvents() {
    if (cookie.load("cookie")) {
      axios
        .get(
          backend + `/eventsRegistered/${cookie.load("cookie").split("+")[0]}`
        )
        .then(response => {
          this.setState({
            upComingEvents: true
          });
          //update the state with the response data
          console.log("res is  :::", response);
          this.setState({
            events: response.data
          });
        });
    }
  }

  viewUpcomingEvents() {
    axios.get(backend + "/events").then(response => {
      //update the state with the response data
      console.log("res is  :::", response);
      this.setState({
        events: response.data
      });
    });
  }

  render() {
    //iterate over books to create a table row
    let events = this.state.events.map(event => {
      let viewButton = "";
      if (!this.state.registeredEventIds.includes(event.eventId)) {
        console.log(this.state.studentMajor);
        console.log(event.eventEligibility);
        console.log(this.state.studentMajor === event.eventEligibility);
        if (
          this.state.studentMajor === event.eventEligibility ||
          event.eventEligibility === "All"
        ) {
          viewButton = (
            <button
              class="btn success"
              onClick={event1 =>
                this.registerToEventDetails(
                  event1,
                  event.eventId,
                  event.fk_companyId
                )
              }
            >
              Register
            </button>
          );
        } else {
          viewButton = (
            <button
              class="btn success"
              disabled
              onClick={event1 =>
                this.registerToEventDetails(
                  event1,
                  event.eventId,
                  event.fk_companyId
                )
              }
            >
              Not Eligible
            </button>
          );
        }
      } else {
        viewButton = (
          <button
            disabled
            class="btn success"
            onClick={event1 =>
              this.registerToEventDetails(
                event1,
                event.eventId,
                event.fk_companyId
              )
            }
          >
            Registered
          </button>
        );
      }
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
          <h4>Event Date: {eventTime}</h4>
          {viewButton}
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
        {redirectVar}
        <div class="row">
          <h3 class="heading">
            {" "}
            Events
            <button
              class="btn5 success"
              onClick={this.viewRegisteredEvents.bind(this)}
            >
              {" "}
              Registered Events
            </button>
            <button
              class="btn6 success"
              onClick={this.viewUpcomingEvents.bind(this)}
            >
              {" "}
              Upcoming Events
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
            <br />
            <br />
          </div>
          <div>{events}</div>
        </div>
      </div>
    );
  }

  registerToEventDetails = (event, eventId, companyId) => {
    if (cookie.load("cookie")) {
      const data = {
        eventid: eventId,
        companyId: companyId,
        studentId: cookie.load("cookie").split("+")[0]
      };
      axios.post(backend + "/registerToEvent", data).then(response => {
        console.log("Status Code : ", response.status);
        if (response.status === 200) {
          console.log("Registered successfully");
          this.setState({
            showingAlert: true
          });
        } else {
          console.log("Error Registering for this event");
        }
      });
    }
  };
}
//export Home Component
export default Events;
