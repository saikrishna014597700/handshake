import React, { Component } from "react";
import "../../App.css";
import axios from "axios";
import cookie from "react-cookies";
import { Redirect } from "react-router";

class Events extends Component {
  constructor() {
    super();
    this.state = {
      events: []
    };
  }
  //get the books data from backend
  componentDidMount() {
    console.log("in componentDidMount");
    axios.get("http://localhost:3001/events").then(response => {
      //update the state with the response data
      console.log("res is  :::", response);
      this.setState({
        events: this.state.events.concat(response.data)
      });
    });
  }

  render() {
    //iterate over books to create a table row
    let events = this.state.events.map(event => {
      console.log("Events are ", event);
      return (
        <div class="card">
          <div class="card-header">Event Name : {event.eventName}</div>
          <div class="card-body">
            <h5 class="card-title">Description : {event.eventDescription}</h5>
            <p class="card-text">Location : {event.eventLocation}</p>
            <p class="card-text">Posting Date: Event Date: {event.eventtime}</p>
            <p class="card-text">
              Event Eligibility : {event.eventEligibility}
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
            </p>
          </div>
          <div class="card-footer text-muted">Register in 3 days</div>
        </div>
      );
    });
    //if not logged in go to login page
    let redirectVar = null;
    if (!cookie.load("cookie")) {
      redirectVar = <Redirect to="/login" />;
    }
    return (
      <div>
        {redirectVar}
        <div class="container">
          <h2>Upcoming Events</h2>
          <table class="table">
            <tbody>
              {/*Display the Tbale row based on data recieved*/}
              {events}
            </tbody>
          </table>
        </div>
      </div>
    );
  }

  registerToEventDetails = (event, eventId, companyId) => {
    const data = {
      eventid: eventId,
      companyId: companyId
    };
    axios.post("http://localhost:3001/registerToEvent", data).then(response => {
      console.log("Status Code : ", response.status);
      if (response.status === 200) {
        console.log("Registered successfully");
      } else {
        console.log("Error Registering for this event");
      }
    });
  };
}
//export Home Component
export default Events;
