import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as booksActions from '../../redux/actions/booksActions';
import PropTypes from 'prop-types';
import Books from '../../components/book/Books';
import Header from '../../components/common/header/Header';
import { Button, Grid } from 'semantic-ui-react';
import { NavLink } from 'react-router-dom';

class BookList extends React.Component {
  componentDidMount() {
    const { books, actions } = this.props;
    if (books.length === 0) {
      actions.loadBooks().catch(error => {
        alert('Loading books failed\n' + error);
      });
    }
  }
  render() {
    return (
      <React.Fragment>
        <Header />
        <main className='main-container'>
          <Grid>
            <Grid.Row>
              <Grid.Column
                mobile={16}
                tablet={10}
                computer={10}
                className='height-pad'
              >
                <h2>Grupo: Familia</h2>
                <div class='ui buttons'>
                  <button class='ui button'>Todos</button>
                  <button class='ui button'>Adriano</button>
                  <button class='ui button'>Greta</button>
                  <button class='ui button'>Lola</button>
                  <button class='ui button'>José Antonio</button>
                  <button class='ui button'>Rosa</button>
                  <button class='ui button'>Rosalía</button>
                </div>
                <h2>Libros de Adriano</h2>
                <div class='ui icon input'>
                  <input type='text' placeholder='Buscar...' />
                  <i className='search icon'></i>
                </div>
                <div class='button-group'>
                  <NavLink to='/libro/crear'>
                    <Button size='tiny' primary>
                      <i className='plus icon'></i> Añadir
                    </Button>
                  </NavLink>
                  <NavLink to='/'>
                    <Button size='tiny'>
                      <i className='filter icon'></i> Filtrar
                    </Button>
                  </NavLink>
                </div>
                <Books books={this.props?.books} />
              </Grid.Column>
              <Grid.Column
                mobile={16}
                tablet={6}
                computer={6}
                className='aside height-pad min-height'
              ></Grid.Column>
            </Grid.Row>
          </Grid>
        </main>
      </React.Fragment>
    );
  }
}
BookList.propTypes = {
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

export default connect(mapStateToProps, mapDispatchToProps)(BookList);
