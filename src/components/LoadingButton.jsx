import React from 'react';
import PropTypes from 'prop-types';

const LoadingButton = ({
  onClick, loading, value, disabled,
}) => {
  const props = {};
  // Click listener
  if (onClick) {
    props.onClick = onClick;
  }
  // Disabled button is loading is true so that one click won't be triggered when
  // a process is loading.
  props.disabled = loading || disabled;

  return (
    <button type="button" className="button" {...props}>
      {value}
      {loading ? '...' : null}
    </button>
  );
};

LoadingButton.defaultProps = {
  loading: false,
  onClick: null,
  disabled: false,
};

LoadingButton.propTypes = {
  onClick: PropTypes.func,
  loading: PropTypes.bool,
  disabled: PropTypes.bool,
  value: PropTypes.string.isRequired,
};

export default LoadingButton;
