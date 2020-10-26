import React from 'react';
import Header from '../header/Header';
import { connect } from 'react-redux';
import * as bookActions from '../../redux/actions/bookActions';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';

class BookForm extends React.Component {
  state = {
    book: {
      title: ''
    }
  };

  handleChange = event => {
    const book = { ...this.state.book, title: event.target.value };
    this.setState({ book });
  };

  handleSubmit = event => {
    event.preventDefault();
    this.props.actions.createBook(this.state.book);
  };

  render() {
    return (
      <React.Fragment>
        <Header />
        <section className='container'>
          <h2>Libros</h2>
          <h3>Añadir libro</h3>
          <form onSubmit={this.handleSubmit}>
            <input
              type='text'
              onChange={this.handleChange}
              value={this.state.book.title}
            />
            <br />
            <input type='submit' value='Añadir' />
          </form>
          {this.props.books.map(book => (
            <div key={book.title}>{book.title}</div>
          ))}
        </section>
      </React.Fragment>
    );
  }
}

BookForm.propTypes = {
  courses: PropTypes.array.isRequired,
  actions: PropTypes.object.isRequired
};

const mapStateToProps = state => {
  return {
    books: state.books
  };
};

const mapDispatchToProps = dispatch => {
  return {
    actions: bindActionCreators(bookActions, dispatch)
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(BookForm);
