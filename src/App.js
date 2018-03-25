import React, { Component } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.css';
import Messanger from './Messanger';
import Login from './Login';
import io from 'socket.io-client';
var _socket = io.connect('http://localhost:8001');

class App extends Component {
  render() {
    return (
      <div className="App">
        <Switch>
          <Route exact path='/' render={() => (
            <Redirect to="/login" />
          )}/>
          <Route path='/login' render={() => (
            <Login socket={_socket} />
          )}/>
          <Route path='/messanger' render={() => (
            <Messanger socket={_socket} />
        )}/>
        </Switch>
      </div>
    );
  }
}

export default App;
