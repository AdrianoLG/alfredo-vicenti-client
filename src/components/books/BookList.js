import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Card } from 'semantic-ui-react';

const BookList = ({ books }) => (
  <React.Fragment>
    {books.map(book => {
      return (
        <>
          <Link to={'/libro/' + book.id} className='card-link'>
            <Card>
              <Card.Content>
                <div className='left'>
                  <Card.Header>{book.title}</Card.Header>
                  <Card.Meta>{book.author}</Card.Meta>
                </div>
                <div className='right'>
                  <Card.Description className='floated right'>
                    {book.category}
                  </Card.Description>
                </div>
              </Card.Content>
            </Card>
          </Link>
        </>
      );
    })}
  </React.Fragment>
);

BookList.propTypes = {
  books: PropTypes.array.isRequired
};

export default BookList;
