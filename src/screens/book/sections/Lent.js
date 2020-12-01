import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { Icon } from 'semantic-ui-react';

import {
  filterBooksByLent,
  resetFilters
} from '../../../redux/actions/bookActions';

function Lent({ books, resetFilters, filterBooksByLent }) {
  const [lent, setLent] = useState([]);

  useEffect(() => {
    const lentBooks = books.filter(book => {
      if (book.lent_date !== null) return book;
    });
    const sortedLentBooks = sortsLent(lentBooks);
    setLent(sortedLentBooks);
  }, [books, resetFilters, filterBooksByLent]);

  function orderLentDesc(a, b) {
    if (a.lent_date < b.lent_date) {
      return 1;
    }
    if (a.lent_date > b.lent_date) {
      return -1;
    }
    return 0;
  }

  function sortsLent(objectArray) {
    return objectArray.sort(orderLentDesc);
  }

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
                    {new Intl.DateTimeFormat('es-ES').format(
                      new Date(lent.lent_date)
                    )}{' '}
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

const mapStateToProps = state => {
  return {
    books: state.books
  };
};

const mapDispatchToProps = {
  filterBooksByLent,
  resetFilters
};

export default connect(mapStateToProps, mapDispatchToProps)(Lent);
