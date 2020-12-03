import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Icon } from 'semantic-ui-react';

import {
  filterBooksByEditorial,
  resetFilters
} from '../../../redux/actions/bookActions';
import { getTimesRepeated, sorts } from '../../../utils/filterCollections';

function HighlightedEditorial({ books, resetFilters, filterBooksByEditorial }) {
  const [editorial, setEditorial] = useState([]);
  const [filtered, setFiltered] = useState(false);
  const [originalList, setOriginalList] = useState([]);

  useEffect(() => {
    const editorial = books
      .filter(book => {
        return book.editorial !== null;
      })
      .map(book => book.editorial);
    const repeatedEditorial = getTimesRepeated(editorial);
    const sortedRepeatedEditorial = sorts(repeatedEditorial);
    setEditorial(sortedRepeatedEditorial);
  }, [books, resetFilters]);

  function handleClick(e, editorial) {
    e.preventDefault();
    if (!filtered) {
      setOriginalList(books);
      filterBooksByEditorial(editorial);
      setFiltered(true);
      e.currentTarget.parentNode.className = 'active';
    } else {
      resetFilters(originalList);
      setFiltered(false);
      e.currentTarget.parentNode.className = '';
    }
  }

  return (
    <>
      {editorial.length > 0 ? (
        <>
          <h2>Editoriales destacadas</h2>
          <ul className='book-filter editorial'>
            {editorial.slice(0, 4).map(editorial => (
              <li key={editorial[0]}>
                <span
                  className='link'
                  tabIndex='0'
                  onClick={e => handleClick(e, editorial[0])}
                  onKeyDown={e => {
                    if (e.keyCode === 13) {
                      handleClick(e, editorial[0]);
                    }
                  }}
                >
                  {editorial[0]} ({editorial[1]})
                </span>
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
  filterBooksByEditorial,
  resetFilters
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HighlightedEditorial);
