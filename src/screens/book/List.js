import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { useEffect } from 'react';
import { connect } from 'react-redux';
import { toast } from 'react-toastify';
import { Grid } from 'semantic-ui-react';

import BooksSection from '../../components/book/BooksSection';
import BestRated from '../../components/book/filters/BestRated';
import HighlightedAuthors from '../../components/book/filters/HighlightedAuthors';
import HighlightedCategories from '../../components/book/filters/HighlightedCategories';
import HighlightedEditorial from '../../components/book/filters/HighlightedEditorial';
import LastRead from '../../components/book/filters/LastRead';
import Lent from '../../components/book/filters/Lent';
import Header from '../../components/common/header/Header';
import Groups from '../../components/group/Groups';
import { deleteBook, loadBooks } from '../../redux/actions/bookActions';
import { retrieveUser } from '../../redux/actions/userActions';

function BookList({
  user,
  userForm,
  books,
  retrieveUser,
  loadBooks,
  loading,
  history
}) {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    if (userForm.user_id !== undefined) {
      let bearer = localStorage.getItem('access_token');
      if (bearer !== undefined && bearer !== '') {
        retrieveUser(userForm.user_id, bearer).catch(error => {
          toast.error(`La carga del usuario ha fallado.\n${error}`);
        });
      }
    }
    const getBooks = () => {
      if (userForm.user_id) {
        let bearer = localStorage.getItem('access_token');
        loadBooks(userForm.user_id, bearer)
          .then(() => setIsLoaded(true))
          .catch(error => {
            toast.error(`La carga de los libros ha fallado.\n${error}`);
          });
      }
    };
    if (!userForm.name) {
      history.push('/login');
    } else {
      if (!isLoaded) {
        let ls = localStorage.getItem('access_token');
        if (ls === '' || ls === undefined) {
          setTimeout(() => {
            ls = localStorage.getItem('access_token');
            if (ls !== '' && ls !== undefined) {
              getBooks();
            }
          }, 500);
        } else {
          getBooks();
        }
      }
    }
  }, [history, isLoaded, loadBooks, userForm, retrieveUser]);

  if (userForm.name) {
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
                <Groups user={user} />
                <BooksSection
                  books={books}
                  loading={loading}
                  name={userForm.name}
                />
              </Grid.Column>
              <Grid.Column computer={1}></Grid.Column>
              <Grid.Column
                as='aside'
                mobile={16}
                tablet={16}
                computer={6}
                className='aside height-pad min-height'
              >
                {loading ? (
                  ''
                ) : (
                  <>
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
                  </>
                )}
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </main>
      </React.Fragment>
    );
  } else {
    return null;
  }
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
    visibleButtons: state.visibleButtons,
    userForm: state.userForm,
    user: state.user
  };
};

const mapDispatchToProps = {
  loadBooks,
  deleteBook,
  retrieveUser
};

export default connect(mapStateToProps, mapDispatchToProps)(BookList);
