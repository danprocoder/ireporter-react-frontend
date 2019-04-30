import React from 'react';
import { string as stringProp } from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import '../../../assets/scss/user/user-nav.scss';

const UserNav = ({ username }) => (
  <div className="user-nav red-bg">
    <div id="navbar">
      <div className="container clearfix">
        <Link to="/dashboard" className="sitename f-left">
          <i className="fa fa-bullhorn" />
          {' '}
          iReporter
        </Link>
        <div className="navbar-menu f-right">
          <ul>
            <li><Link to="/red-flags">Red Flags</Link></li>
            <li><Link to="/interventions">Interventions</Link></li>
            <li className="dropdown">
              <a href="#">
                {username}
                {' '}
                <i className="fa fa-angle-down" />
              </a>
              <ul className="dropdown-menu">
                <li><Link to="/profile">My Profile</Link></li>
                <li><a href="#" className="auth-logout">Log out</a></li>
              </ul>
            </li>
          </ul>
        </div>
        <button className="nav-toggle-responsive f-right" type="button"><i className="fa fa-bars" /></button>
      </div>
    </div>
  </div>
);

UserNav.propTypes = {
  username: stringProp.isRequired,
};

const state2props = state => ({
  username: state.usersReducer.user.data.username,
});

export default connect(state2props)(UserNav);
