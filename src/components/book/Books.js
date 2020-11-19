import PropTypes from 'prop-types';
import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Card } from 'semantic-ui-react';

const Books = ({ books, onDeleteClick }) => (
  <React.Fragment>
    {books.map(book => {
      console.log(book);
      return (
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
              onClick={e => {
                e.preventDefault();
                e.stopPropagation();
                onDeleteClick(book);
              }}
            />
          </Button.Group>
        </Link>
      );
    })}
  </React.Fragment>
);

Books.propTypes = {
  books: PropTypes.array.isRequired,
  onDeleteClick: PropTypes.func.isRequired
};

export default Books;
