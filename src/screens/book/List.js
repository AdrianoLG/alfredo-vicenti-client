import React from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { loadBooks } from '../../redux/actions/booksActions';
import PropTypes from 'prop-types';
import Books from '../../components/book/Books';
import Header from '../../components/common/header/Header';
import { Button, Grid } from 'semantic-ui-react';
import { useEffect } from 'react';

function BookList({ book, books, loadBooks }) {
  useEffect(() => {
    loadBooks().catch(error => {
      alert('La carga de los libros ha fallado\n' + error);
    });
  }, [book]);
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
              </div>
              <Books books={books} />
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
  books: PropTypes.array.isRequired
};

const mapStateToProps = state => {
  return {
    books: state.books
  };
};

const mapDispatchToProps = {
  loadBooks
};

export default connect(mapStateToProps, mapDispatchToProps)(BookList);
