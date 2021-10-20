import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Modal extends Component {
  componentDidMount() {
    window.addEventListener('keydown', this.handleKeyDown);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeyDown);
  }

  handleKeyDown = e => {
    if (e.code === 'Escape') {
      this.props.toogleModal();
    }
  };

  handleBackdropClick = e => {
    if (e.currentTarget != e.target) {
      this.props.toogleModal();
    }
  };

  render() {
    const { largeImage, imageName } = this.props;
    return (
      <>
        <h1>Modal</h1>
        <div className="Overlay" onClick={this.handleBackdropClick}>
          <div className="Modal">
            <img src={largeImage} alt={imageName} />
          </div>
        </div>
      </>
    );
  }
}

Modal.propTypes = {
  toogleModal: PropTypes.func,
  largeImage: PropTypes.string,
  imageName: PropTypes.string,
};

export default Modal;
