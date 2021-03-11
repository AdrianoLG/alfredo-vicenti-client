import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Icon } from 'semantic-ui-react';

import { sortDesc } from '../../../utils/filterCollections';

function BestRated({ books, user }) {
  const [rated, setRated] = useState([]);

  useEffect(() => {
    const sortsRated = objectArray => {
      return sortDesc(objectArray, 'rating');
    };
    const ratedBooks = books.filter(book => book.rating !== null);
    const sortedRatedBooks = sortsRated(ratedBooks);
    setRated(sortedRatedBooks);
  }, [books]);

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

export default BestRated;
