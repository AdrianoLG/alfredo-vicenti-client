import React, { useState } from 'react';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Button, Loader } from 'semantic-ui-react';

import { deleteBook } from '../../redux/actions/bookActions';
import Books from './Books';
import SearchBook from './filters/Search';
import OrderDropdown from './OrderDropdown';

function BooksSection({ books, loading, deleteBook }) {
  const [visibleButtons, setVisibleButtons] = useState('hidden');
  const history = useHistory();

  const handleDeleteBook = async bookRes => {
    toast(`"${bookRes.title}" borrado`);
    try {
      await deleteBook(bookRes);
    } catch (error) {
      toast.error(`"${bookRes.title}" no ha sido eliminado. ${error.message}`, {
        autoClose: false
      });
    }
  };

  const toggleButtons = () => {
    visibleButtons === 'hidden'
      ? setVisibleButtons('show')
      : setVisibleButtons('hidden');
  };

  return (
    <>
      <h2>Libros de Adriano</h2>
      <SearchBook books={books} />
      <div className='button-group'>
        <Button
          size='tiny'
          secondary
          onClick={() => {
            history.push('/libro/crear');
          }}
        >
          <i className='plus icon'></i> Añadir
        </Button>
        <OrderDropdown />
        <Button
          size='tiny'
          color='black'
          className={'toggleButton ' + visibleButtons}
          onClick={toggleButtons}
        >
          <i className='trash icon'></i> Borrar
        </Button>
      </div>
      {loading ? (
        <div className='hundred'>
          <Loader active />
        </div>
      ) : (
        <Books
          onDeleteClick={handleDeleteBook}
          books={books}
          visibleButtons={visibleButtons}
        />
      )}
    </>
  );
}

const mapStateToProps = (state, ownProps) => {
  return {
    books: state.books
  };
};

const mapDispatchToProps = {
  deleteBook
};

export default connect(mapStateToProps, mapDispatchToProps)(BooksSection);
