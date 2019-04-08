import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../../assets/css/default-nav.css';

export default class extends Component {
  render() {
    return (
      <div className="user red-bg">
        <div id="navbar">
          <div className="navbar-container">
            <div className="navbar-inner">
              <Link to="/" className="sitename"><i className="fa fa-bullhorn"></i> iReporter</Link>
              <div className="navbar-menu horizontal">
                <ul>
                  <li><Link to="/login">Log In</Link></li>
                  <li><Link to="/signup">Sign Up</Link></li>
                </ul>
              </div>
              <button className="nav-toggle-responsive"><i className="fa fa-bars"></i></button>
              <div className="clearfix"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
