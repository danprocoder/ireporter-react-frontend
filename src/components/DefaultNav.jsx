import React from 'react';
import { Link } from 'react-router-dom';
import '../../assets/css/default-nav.css';

export default () => (
  <div className="user red-bg">
    <div id="navbar">
      <div className="navbar-container">
        <div className="navbar-inner">
          <Link to="/" className="sitename">
            <i className="fa fa-bullhorn" />
            {' '}
            iReporter
          </Link>
          <div className="navbar-menu horizontal">
            <ul>
              <li><Link to="/login">Log In</Link></li>
              <li><Link to="/signup">Sign Up</Link></li>
            </ul>
          </div>
          <button type="button" className="nav-toggle-responsive"><i className="fa fa-bars" /></button>
          <div className="clearfix" />
        </div>
      </div>
    </div>
  </div>
);
