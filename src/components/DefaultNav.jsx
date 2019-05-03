import React from 'react';
import { object as objectProp, bool as boolProp } from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import '../../assets/scss/default-nav.scss';

const DefaultNav = ({ isLoggedIn, user }) => (
  <div className="default-nav red-bg">
    <div id="navbar">
      <div className="navbar-container">
        <div className="navbar-inner clearfix">
          <Link to="/" className="sitename f-left">
            <i className="fa fa-bullhorn" />
            {' '}
            iReporter
          </Link>
          <div className="navbar-menu f-right">
            {!isLoggedIn ? (
              <ul>
                <li><Link to="/login">Log In</Link></li>
                <li><Link to="/signup">Sign Up</Link></li>
              </ul>
            ) : (
              <ul>
                <li>
                  <Link to={user.isAdmin ? '/admin' : '/dashboard'}>
                    Continue as
                    {' '}
                    {user.firstname}
                    {' '}
                    &rarr;
                  </Link>
                </li>
              </ul>
            )}
          </div>
          <button
            type="button"
            className="f-right nav-toggle-responsive"
          >
            <i className="fa fa-bars" />
          </button>
        </div>
      </div>
    </div>
  </div>
);

DefaultNav.defaultProps = {
  user: null,
};

DefaultNav.propTypes = {
  isLoggedIn: boolProp.isRequired,
  user: objectProp,
};

const state2props = (state) => {
  const reducer = state.usersReducer;

  const isLoggedIn = (reducer.user.data != null);
  return {
    isLoggedIn,
    user: isLoggedIn ? reducer.user.data : null,
  };
};

export default connect(state2props)(DefaultNav);
