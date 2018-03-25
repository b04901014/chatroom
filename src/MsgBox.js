import React, { Component } from "react"
import { Grid } from 'react-bootstrap'
import io from 'socket.io-client'
import Message from "./Message"

//var history = [];

class MsgBox extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      hist: []
    };  
  }

  componentDidMount() {
    this.props.socket.on("def_hist", (data) => {
      this.setState({hist: data.hist});
    });
    this.props.socket.on('send_msg', (data) => {
      var hist = this.state.hist;
      hist.push(data);
      this.setState({hist});
    });
    this.msgend.scrollIntoView({ behavior: "auto" });
  }

  componentDidUpdate() {
    this.msgend.scrollIntoView({ behavior: "auto" });
  }

  render() {
    return (
      <div className="MsgBox">
        {this.state.hist.map((data, index) => {
          return (
            <Message 
              fromme={this.props.socket.id == data.id}
              text={data.msg}
              name={data.name}
            />
          );
        })}
        <div
          style={{ float:"left", clear: "both" }}
          ref={(el) => { this.msgend = el; }}
        >
        </div>
      </div>
    );
  }

}

export default MsgBox;
