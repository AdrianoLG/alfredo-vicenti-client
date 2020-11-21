import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Button, Loader } from 'semantic-ui-react';

import Book from '../../components/book/Book';
import Header from '../../components/common/header/Header';
import { loadBook } from '../../redux/actions/bookActions';

function BookDetail({ loadBook, history, ...props }) {
  const [book, setBook] = useState({ ...props.book });
  useEffect(() => {
    const paramId = props.match.params.id;
    if (paramId) {
      loadBook(paramId)
        .then(book => {
          setBook(book.data);
        })
        .catch(error => {
          alert('La carga del libro ha fallado\n' + error);
        });
    }
  }, [loadBook, props.match.params.id]);

  return (
    <React.Fragment>
      <Header />
      <div className='main-container height-pad'>
        {props.loading ? (
          <Loader active />
        ) : (
          <>
            <Book book={book} />
            <Button
              onClick={() => {
                history.push('/');
              }}
            >
              Cancelar
            </Button>
            <Button
              secondary
              onClick={() => {
                history.push(`/libro/editar/${props.match.params.id}`);
              }}
            >
              Editar
            </Button>
          </>
        )}
      </div>
    </React.Fragment>
  );
}

const mapStateToProps = state => {
  return {
    book: state.book,
    books: state.books,
    loading: state.apiCallsInProgress > 0
  };
};

const mapDispatchToProps = {
  loadBook
};

export default connect(mapStateToProps, mapDispatchToProps)(BookDetail);
