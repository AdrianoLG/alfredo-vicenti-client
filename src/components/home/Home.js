import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as booksActions from '../../redux/actions/booksActions';
import PropTypes from 'prop-types';
import BookList from '../books/BookList';
import Header from '../common/header/Header';
import { Grid } from 'semantic-ui-react';
import { NavLink } from 'react-router-dom';

class Home extends React.Component {
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
        <section className='main-container'>
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
                  <NavLink to='/' className='ui basic primary tiny button'>
                    <i className='plus icon'></i> Añadir
                  </NavLink>
                  <NavLink to='/' className='ui basic secondary tiny button'>
                    <i className='filter icon'></i> Filtrar
                  </NavLink>
                </div>
                <BookList books={this.props.books} />
              </Grid.Column>
              <Grid.Column
                mobile={16}
                tablet={6}
                computer={6}
                className='aside height-pad min-height'
              ></Grid.Column>
            </Grid.Row>
          </Grid>
        </section>
      </React.Fragment>
    );
  }
}
Home.propTypes = {
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

export default connect(mapStateToProps, mapDispatchToProps)(Home);
