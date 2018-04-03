import React, { Component } from "react";
import { ListGroupItem, FormGroup, FormControl, Button } from 'react-bootstrap';
import Modal from "react-modal";

const customStyles = {
  content : {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)'
  }
};

Modal.setAppElement("#root");

class AddRoom extends Component {
  constructor(props) {
    super(props);

    this.handleShow = this.handleShow.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.onEnterPress = this.onEnterPress.bind(this);

    this.state = {
      show: false,
      name: ""
    };
  }

  handleClose() {
    this.setState({show: false});
  }

  handleShow() {
    this.setState({show: true});
  }

  handleChange(e) {
    this.setState({name: e.target.value, show: true});
  }

  handleSubmit(e) {
    this.props.socket.emit('newroom', {name: this.state.name}); 
    this.setState({ name: "", show: false });
    e.preventDefault();
  }

  onEnterPress(e) {
    if(e.keyCode === 13)
      this.handleSubmit(e);
  }

  render() {
    return (
      <div className="AddRoom">
        <ListGroupItem>
          <Button bsStyle="primary" onClick={this.handleShow}>
            Add a room
          </Button>
        </ListGroupItem>

        <Modal
          isOpen={this.state.show}
          style={customStyles}
          contentLabel="New Room~!"
        >
          <form>
            <FormGroup>
              <FormControl
                type='text'
                value={this.state.name}
                placeholder="Name of New Room"
                onChange={this.handleChange}
                onKeyDown={this.onEnterPress}
              />
            </FormGroup>
          </form>
          <Button onClick={this.handleClose}> Close </Button>
        </Modal>
      </div>
    )
  }
}

export default AddRoom;
