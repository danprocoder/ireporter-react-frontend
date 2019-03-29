import React,  { Component } from 'react';

class LoadingButton extends Component {
  render() {
    const props = {};
    // Click listener
    if (this.props.onClick) {
      props.onClick = this.props.onClick;
    }
    // Disabled button is loading is true so that one click won't be triggered when a process is loading.
    props.disabled = this.props.loading || false;

    return (
      <button class="button" {...props}>
        {this.props.value}
        {this.props.loading ? '...' : null}
      </button>
    );
  }
}

export default LoadingButton;
