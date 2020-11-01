import React from 'react';
import Header from '../header/Header';
import { connect } from 'react-redux';
import * as booksActions from '../../redux/actions/booksActions';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import BookList from './BookList';

class BookForm extends React.Component {
  componentDidMount() {
    if (this.props.books.length === 0) {
      this.props.actions.loadBooks().catch(error => {
        alert('Loading books failed' + error);
      });
    }

    if (this.props.books.length === 0) {
      this.props.actions.loadBook().catch(error => {
        alert('Loading books failed' + error);
      });
    }
  }

  render() {
    return (
      <React.Fragment>
        <Header />
        <section className='container'>
          <h2>Libros</h2>
          <BookList books={this.props.books} />
        </section>
      </React.Fragment>
    );
  }
}

BookForm.propTypes = {
  books: PropTypes.array.isRequired,
  actions: PropTypes.object.isRequired
};

const mapStateToProps = state => {
  return {
    books: state.books
  };
};

const mapDispatchToProps = dispatch => {
  return {
    actions: {
      loadBooks: bindActionCreators(booksActions.loadBooks, dispatch)
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(BookForm);
