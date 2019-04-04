import React, { Component } from 'react';
import '../../../assets/css/sketetonscreens/one-line-text.css';

class OneLineText extends Component {
  render() {
    const props = {
      className: 'skeleton-screen one-line-text'
    };
    if (this.props.className) {
      props.className += ` ${this.props.className}`;
    }
    
    return <span {...props}>&nbsp;</span>
  }
}

export default OneLineText;
