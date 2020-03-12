import React, { Component } from "react";
import axios from "axios";
import { backend } from "../../webConfig";
import cookie from "react-cookies";
import { Redirect } from "react-router";

class Create extends Component {
  constructor(props) {
    //Call the constrictor of Super class i.e The Component
    super(props);
    //maintain the state required for this component
    this.state = {
      BookID: "",
      Title: "",
      Author: ""
    };
    //Bind the handlers to this class
    this.bookIdChangeHandler = this.bookIdChangeHandler.bind(this);
    this.titleChangeHandler = this.titleChangeHandler.bind(this);
    this.authorChangeHandler = this.authorChangeHandler.bind(this);
  }

  bookIdChangeHandler = e => {
    this.setState({
      BookID: e.target.value
    });
  };
  //password change handler to update state variable with the text entered by the user
  titleChangeHandler = e => {
    this.setState({
      Title: e.target.value
    });
  };
  authorChangeHandler = e => {
    this.setState({
      Author: e.target.value
    });
  };
  createBookEntry = e => {
    // eslint-disable-next-line
    var headers = new Headers();
    //prevent page from refresh
    e.preventDefault();
    const data = {
      BookID: this.state.BookID,
      Title: this.state.Title,
      Author: this.state.Author
    };
    //set the with credentials to true
    axios.defaults.withCredentials = true;
    let redirectVar = null;
    //make a post request with the user data
    axios.post(backend+"/create", data).then(response => {
      console.log("Status Code : ", response.status);
      if (response.status === 200) {
        <Redirect to={{ pathname: "/" }} />;
      } else {
        console.log("Server Error");
      }
    });
  };
  render() {
    return (
      <div>
        <br />
        <div class="container">
          <form action="http://127.0.0.1:3001/create" method="post">
            <div style={{ width: "30%" }} class="form-group">
              <input
                type="text"
                class="form-control"
                name="BookID"
                placeholder="Book ID"
                onChange={this.bookIdChangeHandler}
              />
            </div>
            <br />
            <div style={{ width: "30%" }} class="form-group">
              <input
                type="text"
                class="form-control"
                name="Title"
                placeholder="Book Title"
                onChange={this.titleChangeHandler}
              />
            </div>
            <br />
            <div style={{ width: "30%" }} class="form-group">
              <input
                type="text"
                class="form-control"
                name="Author"
                placeholder="Book Author"
                onChange={this.authorChangeHandler}
              />
            </div>
            <br />
            <div style={{ width: "30%" }}>
              <button
                class="btn btn-success"
                onClick={this.createBookEntry}
                type="submit"
              >
                Create
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default Create;
