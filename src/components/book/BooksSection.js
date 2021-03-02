import React, { useState } from 'react';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Button, Loader } from 'semantic-ui-react';

import { ReactComponent as Spider } from '../../assets/images/spider.svg';
import Books from './Books';
import SearchBook from './filters/Search';
import OrderDropdown from './OrderDropdown';
import { deleteBook } from '../../redux/actions/bookActions';

function BooksSection({ user, books, loading, deleteBook, name, setIsLoaded }) {
  const [visibleButtons, setVisibleButtons] = useState('hidden');
  const [searchText, setSearchText] = useState('');
  const history = useHistory();

  const handleDeleteBook = async bookRes => {
    toast(`"${bookRes.title}" borrado`);
    try {
      await deleteBook(bookRes, user.id);
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
      {user.name ? (
        <h2>Libros {name !== '' ? name : `de ${user.name}`}</h2>
      ) : (
        ''
      )}
      <SearchBook books={books} getSearchText={setSearchText} />
      <div className='button-group'>
        <Button
          size='tiny'
          secondary
          onClick={() => {
            history.push('/libro/crear');
            setIsLoaded(false);
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
      ) : books.length > 0 ? (
        <Books
          onDeleteClick={handleDeleteBook}
          books={books}
          groups={user.groups}
          name={name || user.name}
          user={user}
          visibleButtons={visibleButtons}
        />
      ) : searchText !== '' ? (
        'No hay coincidencias'
      ) : (
        <>
          <Spider id='spider' />
          <p class='mt7'>
            Tu colección está vacía. ¡Prueba a <a href='/libro/crear'>añadir</a>{' '}
            un libro!
          </p>
        </>
      )}
    </>
  );
}

const mapStateToProps = (state, ownProps) => {
  return {
    books: state.books,
    user: state.user,
    name: state.name
  };
};

const mapDispatchToProps = {
  deleteBook
};

export default connect(mapStateToProps, mapDispatchToProps)(BooksSection);
