import React, { Component } from "react"
import { FormGroup, FormControl } from 'react-bootstrap'

class InputBox extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      msg: ""
    };  
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.onEnterPress = this.onEnterPress.bind(this);
  }

  handleChange(e) {
    this.setState({msg: e.target.value});
  }

  handleSubmit(e) {
    this.props.socket.emit('get_msg', {msg: this.state.msg});
    this.setState({ msg: "" });
    this.myform.reset();
    e.preventDefault();
  }

  onEnterPress(e) {
    var l = this.state.msg.replace(/\s/g, '').length;
    if (e.keyCode === 13 && l === 0 && e.shiftKey === false)
      e.preventDefault();
    else if (e.keyCode === 13 && e.shiftKey === false)
      this.handleSubmit(e);
  }

  render() {
    return (
      <div className="InputBox">
        <form onSubmit={this.handleSubmit} ref={(el) => this.myform = el}>
          <FormGroup controlId="formControlsTextarea">
            <FormControl
              type="text"
              componentClass="textarea"
              placeholder='Please Enter Message...'
              autoComplete="off"
              onChange={this.handleChange}
              onKeyDown={this.onEnterPress}
              rows="3"
            >
            </FormControl>
          </FormGroup>
        </form>
      </div>
    )
  };
}

export default InputBox;

