import React, { Component } from "react";
import axios from "axios";
import { backend } from "../../webConfig";
import cookie from "react-cookies";
import { Redirect } from "react-router";

class Delete extends Component {
  constructor(props) {
    //Call the constrictor of Super class i.e The Component
    super(props);
    //maintain the state required for this component
    this.state = {
      BookID: ""
    };
    //Bind the handlers to this class
    this.bookIdChangeHandler = this.bookIdChangeHandler.bind(this);
  }

  bookIdChangeHandler = e => {
    this.setState({
      BookID: e.target.value
    });
  };

  deleteBookEntry = e => {
    // eslint-disable-next-line
    var headers = new Headers();
    //prevent page from refresh
    e.preventDefault();
    const data = {
      BookID: this.state.BookID
    };
    //set the with credentials to true
    axios.defaults.withCredentials = true;
    let redirectVar = null;
    //make a post request with the user data
    axios.post(backend+"/delete", data).then(response => {
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
      <div class="container">
        <form>
          <div style={{ width: "50%", float: "left" }} class="form-group">
            <input
              type="text"
              class="form-control"
              name="BookID"
              placeholder="Search a Book by Book ID"
              onChange={this.bookIdChangeHandler}
            />
          </div>
          <div style={{ width: "50%", float: "right" }}>
            <button
              class="btn btn-success"
              type="submit"
              onClick={this.deleteBookEntry}
            >
              Delete
            </button>
          </div>
        </form>
      </div>
    );
  }
}

export default Delete;
