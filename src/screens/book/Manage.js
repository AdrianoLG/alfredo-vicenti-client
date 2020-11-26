import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { toast } from 'react-toastify';
import { Loader } from 'semantic-ui-react';

import BookForm from '../../components/book/Form';
import Header from '../../components/common/header/Header';
import { loadBook, saveBook } from '../../redux/actions/bookActions';
import { newBook } from '../../tools/mockData';

function BookManage({ books, loadBook, saveBook, history, ...props }) {
  const [book, setBook] = useState({ ...props.book });
  const [errors, setErrors] = useState({});
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const paramId = props.match.params.id;
    if (paramId) {
      loadBook(paramId).catch(error => {
        toast.error(`La carga del libro ha fallado.\n${error}`, {
          autoClose: false
        });
      });
    } else {
      setBook({ newBook });
    }
  }, [props.match.params.id, loadBook]);

  function handleChange(event) {
    const { name, value } = event.target;
    setBook(prevBook => ({
      ...prevBook,
      [name]:
        name === 'pages' || name === 'rating' ? parseInt(value, 10) : value
    }));
  }

  function formIsValid() {
    const { title, author, category } = book;
    const errors = {};

    if (!title) errors.title = 'El título es necesario.';
    if (!author) errors.author = 'El autor es necesario.';
    if (!category) errors.category = 'La categoría es necesaria.';

    setErrors(errors);
    return Object.keys(errors).length === 0;
  }

  function handleSave(event) {
    event.preventDefault();
    if (!formIsValid()) return;
    setSaving(true);
    // TODO
    book.user_id = 1;
    saveBook(book)
      .then(() => {
        toast('Libro guardado');
        history.push('/');
      })
      .catch(error => {
        setSaving(false);
        setErrors({ onSave: error.message });
      });
  }

  return (
    <React.Fragment>
      <Header />
      <main className='main-container height-pad'>
        {props.loading ? (
          <div className='hundred'>
            <Loader active />
          </div>
        ) : (
          <BookForm
            book={book}
            errors={errors}
            onChange={handleChange}
            onSave={handleSave}
            saving={saving}
          />
        )}
      </main>
    </React.Fragment>
  );
}

BookManage.propTypes = {
  loadBook: PropTypes.func.isRequired,
  saveBook: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired
};

const mapStateToProps = (state, ownProps) => {
  return {
    book: state.book,
    books: state.books,
    read: state.read
  };
};

const mapDispatchToProps = {
  loadBook,
  saveBook
};

export default connect(mapStateToProps, mapDispatchToProps)(BookManage);
