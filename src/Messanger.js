import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { Scrollbars } from 'react-custom-scrollbars';
import InputBox from "./InputBox";
import MsgBox from "./MsgBox";
import MsgList from "./MsgList";
import "./assets/Messanger.css"

function Redornot(props) {
  if (props.redir)
    return null;
  return (
    <Redirect to="/login" />
  )
}

class Messanger extends Component {
  render() {
    return (
      <div className="Messanger">
        <Redornot redir={"id" in this.props.socket} />
        <div className="MsgList">
          <MsgList socket={this.props.socket} />
        </div>
        <div className="Messages">
          <Scrollbars 
            autoHide 
            autoHeight 
            autoHeightMax={750}
            renderThumbHorizontal={() => <div style={{ display: "none" }}/>}
            renderTrackHorizontal={() => <div style={{ display: "none" }}/>}
          >
            <MsgBox socket={this.props.socket} />
          </Scrollbars>
          <InputBox socket={this.props.socket} />
        </div>
      </div>
    );
  }
}

export default Messanger;
