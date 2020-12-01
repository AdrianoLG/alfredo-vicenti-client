import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { Icon } from 'semantic-ui-react';

import {
  filterBooksByRating,
  resetFilters
} from '../../../redux/actions/bookActions';

function BestRated({ books, resetFilters, filterBooksByRating }) {
  const [rated, setRated] = useState([]);

  useEffect(() => {
    const ratedBooks = books.filter(book => {
      if (book.rating !== null) return book;
    });
    const sortedRatedBooks = sortsRated(ratedBooks);
    setRated(sortedRatedBooks);
  }, [books, resetFilters, filterBooksByRating]);

  function orderRatingDesc(a, b) {
    if (a.rating < b.rating) {
      return 1;
    }
    if (a.rating > b.rating) {
      return -1;
    }
    return 0;
  }

  function sortsRated(objectArray) {
    return objectArray.sort(orderRatingDesc);
  }

  return (
    <>
      {rated.length > 0 ? (
        <>
          <h2>Mejor valorados</h2>
          <ul className='book-filter rating'>
            {rated.slice(0, 4).map(rating => (
              <li key={rating.id}>
                <NavLink to={`libro/${rating.id}`}>
                  {rating.title} ({rating.rating})
                </NavLink>
                <Icon name='close' />
              </li>
            ))}
          </ul>
        </>
      ) : (
        ''
      )}
    </>
  );
}

const mapStateToProps = state => {
  return {
    books: state.books
  };
};

const mapDispatchToProps = {
  filterBooksByRating,
  resetFilters
};

export default connect(mapStateToProps, mapDispatchToProps)(BestRated);
