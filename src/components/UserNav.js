import React, { Component } from 'react';
import '../../assets/css/nav.css';
import '../../assets/css/user-nav.css';

export default class extends Component {
  render() {
    return (
      <div class="user red-bg">
        <div id="navbar">
          <div class="container">
            <a href="dashboard.html" class="sitename"><i class="fa fa-bullhorn"></i> iReporter</a>
            <div class="navbar-menu">
              <ul>
                <li><a href="red-flags.html">Red Flags</a></li>
                <li><a href="interventions.html">Interventions</a></li>
                <li class="dropdown">
                  <a href="#"><span class="js-username"></span> <i class="fa fa-caret-down"></i></a>
                  <ul class="dropdown-menu">
                    <li><a href="profile.html">My Profile</a></li>
                    <li><a href="#" class="auth-logout">Log out</a></li>
                  </ul>
                </li>
              </ul>
            </div>
            <button class="nav-toggle-responsive"><i class="fa fa-bars"></i></button>
            <div class="clearfix"></div>
          </div>
        </div>
      </div>
    );
  }
}
