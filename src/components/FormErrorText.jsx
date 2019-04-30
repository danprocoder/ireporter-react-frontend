import React from 'react';
import { string as stringProp } from 'prop-types';

const FormErrorText = ({ message }) => (
  message ? <div className="error">{message}</div> : null
);

FormErrorText.defaultProps = {
  message: null,
};

FormErrorText.propTypes = {
  message: stringProp,
};

export default FormErrorText;
