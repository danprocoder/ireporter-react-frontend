import React from 'react';
import { node as nodeType } from 'prop-types';
import UserNav from './UserNav';
import '../../../assets/scss/user/user-template.scss';

const Template = ({ children }) => (
  <div>
    <UserNav />
    <div className="user-template-body">{children}</div>
  </div>
);

Template.propTypes = {
  children: nodeType.isRequired,
};

export default Template;
