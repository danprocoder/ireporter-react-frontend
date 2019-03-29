import React, { Component } from 'react';
import AdminNav from './AdminNav';
import UserNav from './UserNav';
import DefaultNav from './DefaultNav';

class Nav extends Component {
  render() {
    return !true ? (
        '' == 'admin' ? <AdminNav /> : <UserNav />
      ) : (
        <DefaultNav />
      );
  }
}

export default Nav;
