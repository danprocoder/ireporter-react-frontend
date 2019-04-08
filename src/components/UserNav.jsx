import React from 'react';
import { string as stringProp } from 'prop-types';
import { connect } from 'react-redux';
import '../../assets/css/user-nav.css';

const UserNav = ({ username }) => (
  <div className="user red-bg">
    <div id="navbar">
      <div className="container">
        <a href="dashboard.html" className="sitename">
          <i className="fa fa-bullhorn" />
          {' '}
          iReporter
        </a>
        <div className="navbar-menu">
          <ul>
            <li><a href="red-flags.html">Red Flags</a></li>
            <li><a href="interventions.html">Interventions</a></li>
            <li className="dropdown">
              <a href="#">
                {username}
                {' '}
                <i className="fa fa-angle-down" />
              </a>
              <ul className="dropdown-menu">
                <li><a href="profile.html">My Profile</a></li>
                <li><a href="#" className="auth-logout">Log out</a></li>
              </ul>
            </li>
          </ul>
        </div>
        <button className="nav-toggle-responsive" type="button"><i className="fa fa-bars" /></button>
        <div className="clearfix" />
      </div>
    </div>
  </div>
);

UserNav.propTypes = {
  username: stringProp.isRequired,
};

export default connect()(UserNav);
