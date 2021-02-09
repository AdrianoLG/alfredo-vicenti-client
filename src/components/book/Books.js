import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import ReactPaginate from 'react-paginate';
import { Link } from 'react-router-dom';
import { Button, Card, List, Transition } from 'semantic-ui-react';

function Books({ books, groups, name, user, onDeleteClick, visibleButtons }) {
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
  }, [books, groups, name, user]);

  function handlePageClick(data) {
    let selected = data.selected;
    let from = Math.ceil(selected * itemsPerPage);
    let to = Math.ceil((selected + 1) * itemsPerPage);
    setPagedBooks(books.slice(from, to));
  }

  function boxShadow(book) {
    let color = '';
    user.groups.forEach(group => {
      if (`del grupo ${group.name}` === name) {
        group.users.forEach(user => {
          if (user.pivot.user_id === book.user_id) {
            color = '#' + user.pivot.color;
          }
        });
      }
    });
    return { boxShadow: `0 1px 3px 0 ${color}` };
  }

  return (
    <>
      {books.length > 0 ? (
        <>
          <Transition.Group as={List} duration={250} divided>
            {pagedBooks.map(book => (
              <Link
                key={book.id}
                to={'/libro/' + book.id + '/usuario/' + book.user_id}
                className='card-link'
              >
                {user.groups?.length > 0 &&
                user.groups?.filter !== undefined &&
                book.user_id !== user.id ? (
                  <Card style={boxShadow(book)}>
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
                ) : (
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
                )}

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

export default Books;
