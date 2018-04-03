import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Message extends Component {
  render() {
    return (
      <div className="Message">
        <div className={this.props.fromme ? "me" : "others"}>
          <div className="Username">
            {this.props.name}
          </div>
          <div className="Text">
            {this.props.text}
          </div>
        </div>
      </div>
    );
  }
}

Message.propTypes = {
  fromme: PropTypes.bool,
  text: PropTypes.string
};

export default Message;
