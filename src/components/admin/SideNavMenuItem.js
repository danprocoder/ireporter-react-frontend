import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class SideNavMenuItem extends Component {
  render() {
    const prop = {};
    if (this.props.url == window.location.pathname) {
      prop.className = 'active';
    }

    return (
      <li{...prop}>
        <Link to={this.props.url}>
          <span className="icon-wrapper"><i className="fa fa-"></i></span> <span className="text-wrapper">{this.props.text}</span>
        </Link>
      </li>
    );
  }
}

export default SideNavMenuItem;
