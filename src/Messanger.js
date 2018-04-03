import React, { Component } from 'react';
import InputBox from "./InputBox";
import MsgBox from "./MsgBox";
import MsgList from "./MsgList";
import "./assets/Messanger.css"

class Messanger extends Component {
  render() {
    return (
      <div className="Messanger">
        <div className="MsgList">
          <MsgList socket={this.props.socket} />
        </div>
        <div className="Messages">
          <MsgBox socket={this.props.socket} />
          <InputBox socket={this.props.socket} />
        </div>
      </div>
    );
  }
}

export default Messanger;
