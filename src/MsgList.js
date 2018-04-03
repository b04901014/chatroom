import React, { Component } from "react"
import { ListGroup } from "react-bootstrap"
import Aroom from "./Aroom"
import AddRoom from "./AddRoom"

class MsgList extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      rooms: []
    };
  }

  componentDidMount() {
    this.props.socket.on("def_room", (data) => {
      this.setState({rooms: data.rooms})
    });
  }

  render() {
    return (
      <div className="MsgList">
        <ListGroup>
          {this.state.rooms.map((data, index) => {
            return (
              <Aroom name={data} id={index} socket={this.props.socket}/>
            );
          })}
          <AddRoom socket={this.props.socket}/>
        </ListGroup>
      </div>

    );
  }
}

export default MsgList;
