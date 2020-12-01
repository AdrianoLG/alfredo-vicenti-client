import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { useEffect } from 'react';
import { connect } from 'react-redux';
import { toast } from 'react-toastify';
import { Button, Grid, Loader } from 'semantic-ui-react';

import Books from '../../components/book/Books';
import Header from '../../components/common/header/Header';
import { deleteBook, loadBooks } from '../../redux/actions/bookActions';
import BestRated from './sections/BestRated';
import HighlightedAuthors from './sections/HighlightedAuthors';
import HighlightedCategories from './sections/HighlightedCategories';
import HighlightedEditorial from './sections/HighlightedEditorial';
import LastRead from './sections/LastRead';
import Lent from './sections/Lent';

function BookList({ book, books, loadBooks, deleteBook, ...props }) {
  const [visibleButtons, setVisibleButtons] = useState('hidden');

  useEffect(() => {
    // TODO
    if (books.length === 0) {
      loadBooks().catch(error => {
        toast.error(`La carga de los libros ha fallado.\n${error}`, {
          autoClose: false
        });
      });
    }
  }, [book, books, loadBooks]);

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
    <React.Fragment>
      <Header />
      <main className='main-container'>
        <Grid>
          <Grid.Row>
            <Grid.Column
              mobile={16}
              tablet={16}
              computer={9}
              className='height-pad'
            >
              <h2>Grupo: Familia</h2>
              <div className='ui buttons group-users'>
                <button className='ui button'>Todos</button>
                <button className='ui button'>Adriano</button>
                <button className='ui button'>Greta</button>
                <button className='ui button'>Lola</button>
                <button className='ui button'>José Antonio</button>
                <button className='ui button'>Rosa</button>
                <button className='ui button'>Rosalía</button>
              </div>
              <h2>Libros de Adriano</h2>
              <div className='ui icon input'>
                <input type='search' placeholder='Buscar...' />
                <i className='search icon'></i>
              </div>
              <div className='button-group'>
                <Button
                  size='tiny'
                  secondary
                  onClick={() => {
                    props.history.push('/libro/crear');
                  }}
                >
                  <i className='plus icon'></i> Añadir
                </Button>
                <Button
                  size='tiny'
                  onClick={() => {
                    props.history.push('/');
                  }}
                >
                  <i className='ordered list icon'></i> Ordenar
                </Button>
                <Button
                  size='tiny'
                  color='black'
                  className={'toggleButton ' + visibleButtons}
                  onClick={toggleButtons}
                >
                  <i className='trash icon'></i> Borrar
                </Button>
              </div>
              {props.loading ? (
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
            </Grid.Column>
            <Grid.Column computer={1}></Grid.Column>
            <Grid.Column
              as='aside'
              mobile={16}
              tablet={16}
              computer={6}
              className='aside height-pad min-height'
            >
              <section>
                <LastRead books={books} />
              </section>
              <section>
                <HighlightedCategories books={books} />
              </section>
              <section>
                <HighlightedAuthors books={books} />
              </section>
              <section>
                <BestRated books={books} />
              </section>
              <section>
                <HighlightedEditorial books={books} />
              </section>
              <section>
                <Lent books={books} />
              </section>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </main>
    </React.Fragment>
  );
}

BookList.propTypes = {
  books: PropTypes.array.isRequired,
  loading: PropTypes.bool.isRequired
};

const mapStateToProps = state => {
  return {
    book: state.book,
    books: state.books,
    loading: state.apiCallsInProgress > 0,
    visibleButtons: state.visibleButtons
  };
};

const mapDispatchToProps = {
  loadBooks,
  deleteBook
};

export default connect(mapStateToProps, mapDispatchToProps)(BookList);
