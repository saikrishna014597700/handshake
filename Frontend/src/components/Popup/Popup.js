import React from "react";
import "../../profile.css";

class Popup extends React.Component {
  render() {
    return (
      <div className="comppopup">
        <div className="comppopup\_inner">
          <h1>{this.props.text}</h1>
          <button onClick={this.props.closePopup}>close me</button>
        </div>
      </div>
    );
  }
}

export default Popup;
