import React, { Component } from 'react';

class FormErrorText extends Component {
  render() {
    return this.props.message ? <div class="error">{this.props.message}</div> : null;
  }
}

export default FormErrorText;
