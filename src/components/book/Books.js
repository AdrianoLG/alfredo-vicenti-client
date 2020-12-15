import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Button, Card, List, Transition } from 'semantic-ui-react';
import ReactPaginate from 'react-paginate';
import { filterBooksByPages } from '../../redux/actions/bookActions';
import { connect } from 'react-redux';
import { Pagination } from 'semantic-ui-react';

function Books({ books, onDeleteClick, visibleButtons }) {
  const [pageCount, setPageCount] = useState(0);
  const [pagedBooks, setPagedBooks] = useState([]);
  const itemsPerPage = 20;

  useEffect(() => {
    let pages = Math.floor(books.length / itemsPerPage);
    const pagesModulus = books.length % itemsPerPage;
    if (pagesModulus > 0) {
      pages++;
    }
    setPageCount(pages);
    setPagedBooks(books.slice(0, itemsPerPage));
  }, [books]);

  function handlePageClick(data) {
    console.log(pagedBooks);
    let selected = data.selected;
    let from = Math.ceil(selected * itemsPerPage);
    let to = Math.ceil((selected + 1) * itemsPerPage);
    setPagedBooks(books.slice(from, to));
  }

  return (
    <>
      {books.length > 0 ? (
        <>
          <Transition.Group as={List} duration={250} divided>
            {pagedBooks.map(book => (
              <Link
                key={book.id}
                to={'/libro/' + book.id}
                className='card-link'
              >
                <Card>
                  <Card.Content>
                    <div className='left'>
                      <Card.Header>{book.title}</Card.Header>
                      <Card.Meta>{book.author}</Card.Meta>
                    </div>
                    <div className='right'>
                      <Card.Description>{book.category}</Card.Description>
                    </div>
                  </Card.Content>
                </Card>
                <Button.Group size='large' className='card-button-group'>
                  <Button
                    icon='delete'
                    color='black'
                    className={visibleButtons}
                    onClick={e => {
                      e.preventDefault();
                      e.stopPropagation();
                      onDeleteClick(book);
                    }}
                    tabIndex={visibleButtons === 'show' ? '0' : '-1'}
                  />
                </Button.Group>
              </Link>
            ))}
          </Transition.Group>
          <ReactPaginate
            previousLabel={'Anterior'}
            nextLabel={'Siguiente'}
            breakLabel={'...'}
            activeLinkClassName={'active'}
            pageCount={pageCount}
            marginPagesDisplayed={2}
            pageRangeDisplayed={5}
            onPageChange={handlePageClick}
            containerClassName={'ui pagination menu'}
            previousLinkClassName={'item'}
            nextLinkClassName={'item'}
            pageLinkClassName={'item'}
            activeClassName={'active'}
          />
        </>
      ) : (
        <p>No hay libros</p>
      )}
    </>
  );
}

Books.propTypes = {
  books: PropTypes.array.isRequired,
  onDeleteClick: PropTypes.func.isRequired
};

const mapStateToProps = state => {
  return {
    books: state.books
  };
};

const mapDispatchToProps = {
  filterBooksByPages
};

export default connect(mapStateToProps, mapDispatchToProps)(Books);
