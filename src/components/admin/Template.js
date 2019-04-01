import React, { Component } from 'react';
import SideNav from './SideNav';
import '../../../assets/css/admin/style.css';

class Template extends Component {
  render() {
    return (
      <div class="main-content">
        <SideNav />

        {this.props.children}
      </div>
    );
  }
}

export default Template;
