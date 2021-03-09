import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { toast } from 'react-toastify';
import { Button, Loader } from 'semantic-ui-react';

import Book from '../../components/book/Book';
import Header from '../../components/common/header/Header';
import { loadBook } from '../../redux/actions/bookActions';

function BookDetail({ user, loadBook, history, ...props }) {
  const [book, setBook] = useState({ ...props.book });
  const paramId = props.match.params.id;
  const paramUserId = props.match.params.userId;

  useEffect(() => {
    if (paramId) {
      loadBook(paramId, paramUserId)
        .then(book => {
          setBook(book.data);
        })
        .catch(error => {
          toast.error(`La carga del libro ha fallado.\n${error}`, {
            autoClose: false
          });
        });
    }
  }, [user, loadBook, paramId, paramUserId]);

  return (
    <React.Fragment>
      <Header />
      <div className='mainContainer height-pad'>
        {props.loading ? (
          <Loader active />
        ) : (
          <>
            <Book book={book} />
            <div className='buttons mt7'>
              <Button
                onClick={() => {
                  history.push('/');
                }}
              >
                Volver
              </Button>
              {user.id === parseInt(paramUserId) ? (
                <Button
                  secondary
                  onClick={() => {
                    history.push(`/libro/editar/${props.match.params.id}`);
                  }}
                >
                  Editar
                </Button>
              ) : (
                ''
              )}
            </div>
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
    loading: state.apiCallsInProgress > 0,
    user: state.user
  };
};

const mapDispatchToProps = {
  loadBook
};

export default connect(mapStateToProps, mapDispatchToProps)(BookDetail);
