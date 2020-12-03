import PropTypes from 'prop-types';
import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Card, List, Transition } from 'semantic-ui-react';

const Books = ({ books, onDeleteClick, visibleButtons }) => (
  <>
    {books.length > 0 ? (
      <Transition.Group as={List} duration={250} divided>
        {books.map(book => (
          <Link key={book.id} to={'/libro/' + book.id} className='card-link'>
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
    ) : (
      <p>No hay libros</p>
    )}
  </>
);

Books.propTypes = {
  books: PropTypes.array.isRequired,
  onDeleteClick: PropTypes.func.isRequired
};

export default Books;
