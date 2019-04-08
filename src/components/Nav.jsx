import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import UserNav from './UserNav';
import DefaultNav from './DefaultNav';

const Nav = ({ isLoggedIn, user }) => {
  if (isLoggedIn) {
    if (user.isAdmin) {
      return null;
    }

    return <UserNav />;
  }

  return <DefaultNav />;
};

Nav.propTypes = {
  isLoggedIn: PropTypes.bool.isRequired,
  user: PropTypes.object.isRequired,
};

const stateToProps = (state) => {
  const reducer = state.usersReducer;

  const isLoggedIn = (reducer.user.data != null);
  return {
    isLoggedIn,
    user: isLoggedIn ? reducer.user.data : null,
  };
};

export default connect(stateToProps)(Nav);
