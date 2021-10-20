import React from 'react';
import PropTypes from 'prop-types';

const LoadMoreButton = ({ onClick }) => {
  return (
    <button type="submit" className="Button" onClick={onClick}>
      <span>Load More</span>
    </button>
  );
};

LoadMoreButton.propTypes = {
  onClick: PropTypes.func,
};

export default LoadMoreButton;
