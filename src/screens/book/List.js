import PropTypes from 'prop-types';
import React from 'react';
import { useEffect } from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Button, Grid, Loader } from 'semantic-ui-react';

import Books from '../../components/book/Books';
import Header from '../../components/common/header/Header';
import { deleteBook, loadBooks } from '../../redux/actions/bookActions';

function BookList({ book, books, loadBooks, deleteBook, ...props }) {
  useEffect(() => {
    // TODO
    if (books.length === 0) {
      loadBooks().catch(error => {
        alert('La carga de los libros ha fallado\n' + error);
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
                <input type='text' placeholder='Buscar...' />
                <i className='search icon'></i>
              </div>
              <div className='button-group'>
                <NavLink to='/libro/crear'>
                  <Button size='tiny' secondary>
                    <i className='plus icon'></i> Añadir
                  </Button>
                </NavLink>
                <NavLink to='/'>
                  <Button size='tiny'>
                    <i className='filter icon'></i> Filtrar
                  </Button>
                </NavLink>
                <Button size='tiny' color='black'>
                  <i className='trash icon'></i> Borrar
                </Button>
              </div>
              {props.loading ? (
                <div className='hundred'>
                  <Loader active />
                </div>
              ) : (
                <Books onDeleteClick={handleDeleteBook} books={books} />
              )}
            </Grid.Column>
            <Grid.Column computer={1}></Grid.Column>
            <Grid.Column
              mobile={16}
              tablet={16}
              computer={6}
              className='aside height-pad min-height'
            >
              <h2>Últimos libros leídos</h2>
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
    loading: state.apiCallsInProgress > 0
  };
};

const mapDispatchToProps = {
  loadBooks,
  deleteBook
};

export default connect(mapStateToProps, mapDispatchToProps)(BookList);
