import PropTypes from 'prop-types';
import React from 'react';
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
import { deleteBook, loadBooks } from '../../redux/actions/bookActions';

function BookList({ book, books, loadBooks, deleteBook, loading, ...props }) {
  useEffect(() => {
    // TODO
    if (books.length === 0) {
      loadBooks().catch(error => {
        toast.error(`La carga de los libros ha fallado.\n${error}`, {
          autoClose: false
        });
      });
    }
  }, [book, books, loadBooks, loading]);

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
              <BooksSection books={books} loading={loading} />
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
