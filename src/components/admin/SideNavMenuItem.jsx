import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const SideNavMenuItem = ({ url, icon, text }) => {
  const prop = {};
  if (url === window.location.pathname) {
    prop.className = 'active';
  }

  return (
    <li {...prop}>
      <Link to={url}>
        <span className="icon-wrapper">
          <i className={`fa fa-${icon}`} />
        </span>
        <span className="text-wrapper">{text}</span>
      </Link>
    </li>
  );
};

SideNavMenuItem.propTypes = {
  url: PropTypes.string.isRequired,
  icon: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
};

export default SideNavMenuItem;
