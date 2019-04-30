import React from 'react';
import { node as nodeType } from 'prop-types';
import UserNav from './UserNav';

const Template = ({ children }) => (
  <div>
    <UserNav />
    <div>{children}</div>
  </div>
);

Template.propTypes = {
  children: nodeType.isRequired,
};

export default Template;
