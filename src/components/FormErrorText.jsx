import React from 'react';
import { string as stringProp } from 'prop-types';

const FormErrorText = ({ message }) => (
  message ? <div className="error">{message}</div> : null
);

FormErrorText.propTypes = {
  message: stringProp.isRequired,
};

export default FormErrorText;
