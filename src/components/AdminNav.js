import React, { Component } from 'react';
import '../../assets/css/admin/nav.css';

export default class extends Component {
  render() {
    return (
      <div id="top">
        <div class="sitename pull-left">
          <a href="index.html">
            <h2><i class="fa fa-bullhorn"></i> <span class="hide-responsive">iReporter</span></h2>
          </a>
        </div>
        <a href="#" class="pull-left responsive-toggle"><i class="fa fa-bars"></i></a>
        <ul class="navbar-menu pull-right">
          <li class="dropdown">
            <a href="#">{this.username} <i class="fa fa-caret-down"></i></a>
            <div class="dropdown-menu">
              <ul>
                <li><a href="#" class="auth-logout">Logout</a></li>
              </ul>
            </div>
          </li>
        </ul>
        <div class="clearfix"></div>
      </div>
    );
  }
}
