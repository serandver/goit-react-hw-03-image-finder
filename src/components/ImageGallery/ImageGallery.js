import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ImageGalleryItem from './ImageGalleryItem';
import ImageLoader from '../ImageLoader/ImageLoader';
import LoadMoreButton from '../LoadMoreButton/LoadMoreButton';

const API_SECRET_KEY = '23900299-fa2ddfe6bd8026b5b95bcaf8f';
const baseURL = `https://pixabay.com/api/`;
const perPage = 12;

class ImageGallery extends Component {
  state = {
    hits: [],
    error: null,
    status: 'idle',
    currentPage: 1,
  };

  componentDidUpdate(prevProps) {
    const prevImage = prevProps.imageName;
    const nextImage = this.props.imageName;

    if (prevImage != nextImage) {
      this.setState(
        {
          status: 'pending',
          hits: [],
          currentPage: 1,
        },
        () => this.fetchImages(),
      );
    }
  }

  fetchImages = () => {
    const { imageName } = this.props;
    const url = `${baseURL}?q=${imageName}&page=${this.state.currentPage}&key=${API_SECRET_KEY}&per_page=${perPage}`;

    fetch(url)
      .then(response => {
        if (response.ok) {
          return response.json();
        }
        return Promise.reject(new Error('Empty result'));
      })
      .then(data => {
        const { hits } = data;
        this.setState(prevState => ({
          hits: [...prevState.hits, ...hits],
          currentPage: prevState.currentPage + 1,
          status: 'resolved',
        }));
        window.scrollTo({
          top: document.documentElement.scrollHeight,
          behavior: 'smooth',
        });
      })
      .catch(error => this.setState({ error, status: 'rejected' }));
  };

  render() {
    const { error, status, hits } = this.state;
    const { imageName } = this.props.imageName;

    if (status === 'idle') {
      return <div></div>;
    }

    if (status === 'pending') {
      return <ImageLoader />;
    }

    if (status === 'rejected') {
      return <div>{error.message}</div>;
    }

    if (status === 'resolved') {
      return (
        <>
          <ul className="ImageGallery">
            {hits.map(({ id, webformatURL, largeImageURL }) => (
              <ImageGalleryItem
                key={id}
                webformatURL={webformatURL}
                onClickImage={this.props.onClickImage}
                largeImageURL={largeImageURL}
                imageName={imageName}
              />
            ))}
            {hits.length > 0 ? (
              <LoadMoreButton onClick={this.fetchImages} />
            ) : (
              <h1>По вашему запросу ничего не найдено.</h1>
            )}
          </ul>
        </>
      );
    }
  }
}

ImageGallery.propTypes = {
  onSubmit: PropTypes.func,
  imageName: PropTypes.string,
  onClickImage: PropTypes.func,
};

export default ImageGallery;
