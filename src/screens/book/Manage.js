import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { loadBook, saveBook } from '../../redux/actions/bookActions';
import Header from '../../components/common/header/Header';
import BookForm from '../../components/book/Form';
import { newBook } from '../../tools/mockData';

function BookManage({ loadBook, saveBook, history, ...props }) {
  const [book, setBook] = useState({ ...props.book });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (props.match.params.id) {
      loadBook(props.match.params.id).catch(error => {
        alert('La carga del libro ha fallado\n' + error);
      });
    } else {
      setBook({ newBook });
    }
  }, [loadBook]);

  function handleChange(event) {
    const { name, value } = event.target;
    setBook(prevBook => ({
      ...prevBook,
      [name]: name === 'pages' ? parseInt(value, 10) : value
    }));
  }

  function handleSave(event) {
    event.preventDefault();
    // TODO
    book.user_id = 1;
    saveBook(book).then(() => {
      history.push('/');
    });
  }

  return (
    <React.Fragment>
      <Header />
      <main className='main-container height-pad'>
        <BookForm
          book={book}
          errors={errors}
          onChange={handleChange}
          onSave={handleSave}
        />
      </main>
    </React.Fragment>
  );
}
BookManage.propTypes = {
  book: PropTypes.object.isRequired,
  books: PropTypes.array.isRequired,
  loadBooks: PropTypes.func.isRequired,
  saveBook: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired
};

const mapStateToProps = (state, ownProps) => {
  return {
    book: state.book
  };
};

const mapDispatchToProps = {
  loadBook,
  saveBook
};

export default connect(mapStateToProps, mapDispatchToProps)(BookManage);
