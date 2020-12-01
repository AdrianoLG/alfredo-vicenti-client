import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { Icon } from 'semantic-ui-react';

import {
  filterBooksByReadDate,
  resetFilters
} from '../../../redux/actions/bookActions';

function LastRead({ books, resetFilters, filterBooksByReadDate }) {
  const [read, setRead] = useState([]);

  useEffect(() => {
    const readBooks = books.filter(book => {
      if (book.read_date !== null) return book;
    });
    const sortedReadBooks = sortsRead(readBooks);
    setRead(sortedReadBooks);
  }, [books, resetFilters, filterBooksByReadDate]);

  function orderReadDesc(a, b) {
    if (a.read_date < b.read_date) {
      return 1;
    }
    if (a.read_date > b.read_date) {
      return -1;
    }
    return 0;
  }

  function sortsRead(objectArray) {
    return objectArray.sort(orderReadDesc);
  }

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

const mapDispatchToProps = {
  filterBooksByReadDate,
  resetFilters
};

export default connect(mapStateToProps, mapDispatchToProps)(LastRead);
