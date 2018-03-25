import React, { Component } from 'react';
import { Grid } from 'react-bootstrap';
import InputBox from "./InputBox";
import MsgBox from "./MsgBox";
import "./assets/Messanger.css"

class Messanger extends Component {
  render() {
    return (
      <div className="Messanger">
        <div className="Messages">
          <MsgBox socket={this.props.socket} />
          <InputBox socket={this.props.socket} />
        </div>
      </div>
    );
  }
}

export default Messanger;
