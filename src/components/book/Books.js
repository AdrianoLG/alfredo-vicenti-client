import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Card } from 'semantic-ui-react';

const Books = ({ books }) => (
  <React.Fragment>
    {books.map(book => {
      return (
        <Link key={book.id} to={'/libro/' + book.id} className='card-link'>
          <Card key={book.id}>
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
        </Link>
      );
    })}
  </React.Fragment>
);

Books.propTypes = {
  books: PropTypes.array.isRequired
};

export default Books;
