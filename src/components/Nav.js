import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import AdminNav from './AdminNav';
import UserNav from './UserNav';
import DefaultNav from './DefaultNav';

class Nav extends Component {
  render() {
    return this.props.isLoggedIn ? (
      this.props.user.isAdmin ? <AdminNav /> : <UserNav />
    ) : (
      <DefaultNav />
    );
  }
}

Nav.propTypes = {
  isLoggedIn: PropTypes.bool.isRequired,
};

const stateToProps = (state) => {
  const reducer = state.usersReducer;

  const isLoggedIn = (reducer.user.data != null);
  return {
    isLoggedIn,
    user: isLoggedIn ? reducer.user.data : null
  };
};

export default connect(stateToProps)(Nav);
