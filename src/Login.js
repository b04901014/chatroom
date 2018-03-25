import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { Button, FormGroup, FormControl, ControlLabel } from 'react-bootstrap'
import "./assets/Login.css"

function Redornot(props) {
  if (!props.redir)
    return null;
  return (
    <Redirect to="/messanger" />
  )
}

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      tomsg: false
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    this.setState({name: e.target.value});
  }

  handleSubmit(e) {
    this.props.socket.emit('adduser', {name: this.state.name});
    this.setState({tomsg: true});
    e.preventDefault();
  }

  render() {
    return (
      <div className="Login">
        <Redornot redir={this.state.tomsg} />
        <form onSubmit={this.handleSubmit}>
          <FormGroup controlId="username">
            <ControlLabel> Username </ControlLabel>
            <FormControl
              type="text"
              placeholder='Enter your name'
              onChange={this.handleChange}
            >
            </FormControl>
          </FormGroup>
        </form>
        <div className="buttonholder">
          <Button 
            bsStyle="primary"
            onClick={this.handleSubmit}
          > 
            Login 
          </Button>
        </div>
      </div>
      
    );
  }
};

export default Login;

