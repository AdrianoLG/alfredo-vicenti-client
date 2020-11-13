import React, { useEffect } from 'react';
import Header from '../../components/common/header/Header';
import { connect } from 'react-redux';
import { loadBook } from '../../redux/actions/bookActions';
import Book from '../../components/book/Book';
import { Button, Loader } from 'semantic-ui-react';
import { NavLink } from 'react-router-dom';

function BookDetail({ book, loadBook, history, ...props }) {
  useEffect(() => {
    loadBook(props.match.params.id).catch(error => {
      alert('La carga del libro ha fallado\n' + error);
    });
  }, [loadBook, props.match.params.id]);

  return (
    <React.Fragment>
      <Header />
      <div className='main-container height-pad'>
        <h2>Libro {props.match.params.id}</h2>
        {props.loading ? (
          <Loader active />
        ) : (
          <>
            <Book book={book} />
            <NavLink to='/'>
              <Button>Cancelar</Button>
            </NavLink>
            <NavLink to={`/libro/editar/${props.match.params.id}`}>
              <Button secondary>Editar</Button>
            </NavLink>
          </>
        )}
      </div>
    </React.Fragment>
  );
}

const mapStateToProps = state => {
  return {
    book: state.book,
    loading: state.apiCallsInProgress > 0
  };
};

const mapDispatchToProps = {
  loadBook
};

export default connect(mapStateToProps, mapDispatchToProps)(BookDetail);
