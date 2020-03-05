import React, { Component } from "react";
import "../../App.css";
import axios from "axios";
import cookie from "react-cookies";
import { Redirect } from "react-router";

class Events extends Component {
  constructor() {
    super();
    this.state = {
      events: [],
      showingAlert: false
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
      return (
        <div class="card2">
          <div class="wrapper">
            <img src={require("./events.jpg")} class="image--cover2"></img>
          </div>
          <h4>Event Name : {event.eventName}</h4>
          <h4>Location : {event.eventLocation}</h4>
          <h4>
            Event Date: {event.eventtime}
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
          <h3 class="heading"> Upcoming Events</h3>
          <br />
          <div>{events}</div>
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
        this.setState({
          showingAlert: true
        });
      } else {
        console.log("Error Registering for this event");
      }
    });
  };
}
//export Home Component
export default Events;
