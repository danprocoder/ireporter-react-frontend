import React from 'react';
import { node } from 'prop-types';
import SideNav from './SideNav';
import TopNav from './Nav.jsx';
import '../../../assets/css/admin/style.css';

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
