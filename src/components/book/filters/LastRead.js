import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { Icon } from 'semantic-ui-react';

import { sortDesc } from '../../../utils/filterCollections';

function LastRead({ books, resetFilters }) {
  const [read, setRead] = useState([]);

  useEffect(() => {
    const sortsRead = objectArray => {
      return sortDesc(objectArray, 'read_date');
    };
    const readBooks = books.filter(book => {
      return book.read_date !== null;
    });
    const sortedReadBooks = sortsRead(readBooks);
    setRead(sortedReadBooks);
  }, [books, resetFilters]);

  return (
    <>
      {read.length > 0 ? (
        <>
          <h2>Últimos libros leídos</h2>
          <ul className='book-filter read'>
            {read.slice(0, 4).map(read => (
              <li key={read.id}>
                <NavLink to={`libro/${read.id}`}>
                  {read.title} (
                  {new Intl.DateTimeFormat('es-ES').format(
                    new Date(read.read_date)
                  )}
                  )
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

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(LastRead);
