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

function BookList({ user, books, loadBooks, loading, history }) {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    if (user.id !== undefined || user.name !== undefined) {
      if (books.length === 0 && !isLoaded) {
        getBooks();
      }
    } else {
      history.push('/login');
    }
  }, [isLoaded, loadBooks]);

  function getBooks() {
    let bearer = localStorage.getItem('access_token');
    loadBooks(user.id, bearer)
      .then(() => setIsLoaded(true))
      .catch(error => {
        toast.error(`La carga de los libros ha fallado.\n${error}`);
      });
  }

  if (user.name) {
    return (
      <React.Fragment>
        <Header />
        <main className='main-container'>
          <Grid>
            <Grid.Row className='pb0'>
              <Grid.Column
                mobile={16}
                tablet={16}
                computer={9}
                className='height-pad'
              >
                {user.groups !== undefined && user.groups.length > 0 ? (
                  <Groups user={user} />
                ) : (
                  ''
                )}
                <BooksSection
                  books={books}
                  loading={loading}
                  name={user.name}
                  setIsLoaded={setIsLoaded}
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
                      <LastRead books={books} user={user} />
                    </section>
                    <section>
                      <HighlightedCategories books={books} />
                    </section>
                    <section>
                      <HighlightedAuthors books={books} />
                    </section>
                    <section>
                      <BestRated books={books} user={user} />
                    </section>
                    <section>
                      <HighlightedEditorial books={books} />
                    </section>
                    <section>
                      <Lent books={books} user={user} />
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
    user: state.user
  };
};

const mapDispatchToProps = {
  loadBooks,
  deleteBook
};

export default connect(mapStateToProps, mapDispatchToProps)(BookList);
