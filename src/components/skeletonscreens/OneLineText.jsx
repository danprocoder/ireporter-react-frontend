import React from 'react';
import { string as stringProp } from 'prop-types';
import '../../../assets/css/sketetonscreens/one-line-text.css';

const OneLineText = ({ className }) => {
  const props = {
    className: 'skeleton-screen one-line-text',
  };
  if (className) {
    props.className += ` ${className}`;
  }

  return <span {...props}>&nbsp;</span>;
};

OneLineText.defaultProps = {
  className: undefined,
};

OneLineText.propTypes = {
  className: stringProp,
};

export default OneLineText;
