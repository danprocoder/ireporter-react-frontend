import React, { Component } from 'react';
import '../../../assets/scss/widgets/image.scss';

class Image extends Component {
  onImageLoad() {
    this.wrapper.classList.remove('image--loading');
    this.image.style.display = 'block';
  }
  
  render() {
    let className = 'image image--loading';
    if (this.props.className) {
      className += ` ${this.props.className}`;
    }

    return (
      <div className={className} ref={(ref) => this.wrapper = ref}>
        <img
          src={this.props.src}
          alt={this.props.src}
          onLoad={() => this.onImageLoad()}
          ref={(ref) => this.image = ref} />
      </div>
    );
  }
}

export default Image;
