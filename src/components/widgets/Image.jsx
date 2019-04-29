import React, { Component } from 'react';
import { string as stringProp } from 'prop-types';
import '../../../assets/scss/widgets/image.scss';

class Image extends Component {
  onImageLoad() {
    this.wrapper.classList.remove('image--loading');
    this.image.style.display = 'block';
  }

  render() {
    const { className, src } = this.props;

    let mainClassName = 'image image--loading';
    if (className) {
      mainClassName += ` ${className}`;
    }

    return (
      <div className={mainClassName} ref={(ref) => { this.wrapper = ref; }}>
        <img
          src={src}
          alt={src}
          onLoad={() => this.onImageLoad()}
          ref={(ref) => { this.image = ref; }}
        />
      </div>
    );
  }
}

Image.defaultProps = {
  className: undefined,
};

Image.propTypes = {
  src: stringProp.isRequired,
  className: stringProp,
};

export default Image;
