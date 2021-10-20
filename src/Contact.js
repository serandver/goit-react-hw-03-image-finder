import PropTypes from 'prop-types';

class Contact {
  constructor(id, name, number) {
    this.id = id;
    this.name = name;
    this.number = number;
  }

  equals = contact => {
    return this.name === contact.name;
  };
}

Contact.propTypes = {
  id: PropTypes.string,
  name: PropTypes.string,
  number: PropTypes.string,
};

export default Contact;
