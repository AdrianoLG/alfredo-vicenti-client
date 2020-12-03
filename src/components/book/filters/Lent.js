import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Icon } from 'semantic-ui-react';

import { sortDesc } from '../../../utils/filterCollections';

function Lent({ books, resetFilters }) {
  const [lent, setLent] = useState([]);

  useEffect(() => {
    const sortsLent = objectArray => {
      return sortDesc(objectArray, 'lent_date');
    };
    const lentBooks = books.filter(book => {
      return book.lent_date !== null;
    });
    const sortedLentBooks = sortsLent(lentBooks);
    setLent(sortedLentBooks);
  }, [books, resetFilters]);

  return (
    <>
      {lent.length > 0 ? (
        <>
          <h2>Libros prestados</h2>
          <ul className='book-filter lent'>
            {lent.map(lent => (
              <li key={lent.id}>
                <NavLink to={`libro/${lent.id}`}>
                  <p>{lent.title}</p>
                  <p className='small'>
                    {lent.lent_date
                      ? new Intl.DateTimeFormat('es-ES').format(
                          new Date(lent.lent_date)
                        )
                      : ''}{' '}
                    ({lent.lent_to})
                  </p>
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

export default Lent;
