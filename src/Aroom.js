import React, { Component } from "react"
import { ListGroupItem } from "react-bootstrap"

class Aroom extends Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }
  handleClick(e) {
    this.props.socket.emit("chroom", {room: this.props.id})
  }
  render() {
    return (
      <ListGroupItem onClick={this.handleClick}>
        {this.props.name}
      </ListGroupItem>
    );
  }
}

export default Aroom;
