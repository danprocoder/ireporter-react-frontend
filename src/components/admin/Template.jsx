import React from 'react';
import { node } from 'prop-types';
import SideNav from './SideNav';
import TopNav from './Nav';
import '../../../assets/scss/admin/style.scss';

const Template = ({ children }) => (
  <div className="admin">
    <TopNav />
    <div className="main-content">
      <SideNav />
      {children}
    </div>
  </div>
);

Template.propTypes = {
  children: node.isRequired,
};

export default Template;
