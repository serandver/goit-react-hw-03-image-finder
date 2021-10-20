import './App.css';
import React, { Component } from 'react';
import Searchbar from './components/Searchbar/Searchbar';
import ImageGallery from './components/ImageGallery/ImageGallery';
import Modal from './components/Modal/Modal';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

class App extends Component {
  state = {
    showModal: false,
    imageName: '',
    largeImage: null,
  };

  search = data => {
    console.log(data);
    const { imageName } = data;
    this.setState({ imageName });
  };

  toggleModal = () => {
    this.setState(({ showModal }) => ({
      showModal: !showModal,
    }));
  };

  handleClickImage = largeImage => {
    this.setState({ largeImage });
    this.toggleModal();
  };

  render() {
    const { showModal, largeImage, imageName } = this.state;
    return (
      <>
        <Searchbar onSubmit={this.search} />
        <ImageGallery
          imageName={this.state.imageName}
          onClickImage={this.handleClickImage}
        />
        {showModal && (
          <Modal
            toogleModal={this.toggleModal}
            largeImage={largeImage}
            imageName={imageName}
          />
        )}
        <ToastContainer />
      </>
    );
  }
}

export default App;
