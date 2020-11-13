import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { loadBook, saveBook } from '../../redux/actions/bookActions';
import Header from '../../components/common/header/Header';
import BookForm from '../../components/book/Form';
import { newBook } from '../../tools/mockData';
import { toast } from 'react-toastify';

function BookManage({ books, loadBook, saveBook, history, ...props }) {
  const [book, setBook] = useState({ ...props.book });
  const [errors, setErrors] = useState({});
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const paramId = props.match.params.id;
    if (paramId) {
      loadBook(paramId).catch(error => {
        alert('La carga del libro ha fallado\n' + error);
      });
    } else {
      setBook({ newBook });
    }
  }, [props.match.params.id, loadBook]);

  function handleChange(event) {
    const { name, value } = event.target;
    setBook(prevBook => ({
      ...prevBook,
      [name]: name === 'pages' ? parseInt(value, 10) : value
    }));
  }

  function handleSave(event) {
    event.preventDefault();
    setSaving(true);
    // TODO
    book.user_id = 1;
    saveBook(book).then(() => {
      toast('Libro guardado');
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
          saving={saving}
        />
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
    books: state.books
  };
};

const mapDispatchToProps = {
  loadBook,
  saveBook
};

export default connect(mapStateToProps, mapDispatchToProps)(BookManage);
