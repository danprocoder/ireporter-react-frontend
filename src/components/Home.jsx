import React from 'react';
import { bool as boolProp, object as objectProp } from 'prop-types';
import { connect } from 'react-redux';
import DefaultNav from './DefaultNav';
import template from './templates/home';
import '../../assets/scss/home.scss';

const Home = ({ isLoggedIn, user }) => (
  <div>
    <DefaultNav />
    {template(isLoggedIn, user.isAdmin, user ? user.firstname : null)}
  </div>
);

Home.propTypes = {
  isLoggedIn: boolProp.isRequired,
  user: objectProp.isRequired,
};

const state2props = ({ usersReducer }) => ({
  isLoggedIn: (usersReducer.user.data != null),
  user: usersReducer.user.data,
});

export default connect(state2props)(Home);
