import React from 'react';
import PropTypes from 'prop-types';

const ImageGalleryItem = ({
  webformatURL,
  largeImageURL,
  onClickImage,
  imageName,
}) => {
  return (
    <li
      className="ImageGalleryItem"
      onClick={() => onClickImage(largeImageURL)}
    >
      <img
        src={webformatURL}
        alt={imageName}
        className="ImageGalleryItem-image"
      />
    </li>
  );
};

ImageGalleryItem.propTypes = {
  webformatURL: PropTypes.string.isRequired,
  largeImageURL: PropTypes.string.isRequired,
  onClickImage: PropTypes.func,
  imageName: PropTypes.string,
};

export default ImageGalleryItem;
