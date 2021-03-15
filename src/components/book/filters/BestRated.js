import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Icon } from 'semantic-ui-react';

import { sortDescNum } from '../../../utils/filterCollections';
import {
  filterBooksByRated,
  resetFilters
} from '../../../redux/actions/bookActions';
import { connect } from 'react-redux';

function BestRated({ books, user, filterBooksByRated }) {
  const [rated, setRated] = useState([]);

  useEffect(() => {
    const sortsRated = objectArray => {
      return sortDescNum(objectArray, 'rating');
    };
    const ratedBooks = books.filter(book => book.rating !== null);
    const sortedRatedBooks = sortsRated(ratedBooks);
    setRated(sortedRatedBooks);
  }, [books, filterBooksByRated]);

  return (
    <>
      {rated.slice(0, 4).filter(rating => rating.rating !== null).length > 0 ? (
        <>
          <h2>Mejor valorados</h2>
          <ul className='book-filter rating'>
            {rated.slice(0, 4).map(rating => (
              <li key={rating.id}>
                <NavLink to={`libro/${rating.id}/usuario/${user.id}`}>
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
  filterBooksByRated,
  resetFilters
};

export default connect(mapStateToProps, mapDispatchToProps)(BestRated);
