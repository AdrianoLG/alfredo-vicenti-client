import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Icon } from 'semantic-ui-react';

import {
  filterBooksByAuthor,
  resetFilters
} from '../../../redux/actions/bookActions';
import { getTimesRepeated, sorts } from '../../../utils/filterCollections';

function HighlightedAuthors({ books, resetFilters, filterBooksByAuthor }) {
  const [authors, setAuthors] = useState([]);
  const [filtered, setFiltered] = useState(false);
  const [originalList, setOriginalList] = useState([]);

  useEffect(() => {
    const authors = books
      .filter(book => {
        if (book.author !== null) return book;
      })
      .map(book => book.author);
    const repeatedAuthors = getTimesRepeated(authors);
    const sortedRepeatedAuthors = sorts(repeatedAuthors);
    setAuthors(sortedRepeatedAuthors);
  }, [books, resetFilters, filterBooksByAuthor]);

  function handleClick(e, author) {
    e.preventDefault();
    if (!filtered) {
      setOriginalList(books);
      filterBooksByAuthor(author);
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
      {authors.length > 0 ? (
        <>
          <h2>Autores destacados</h2>
          <ul className='book-filter author'>
            {authors.slice(0, 4).map(author => (
              <li key={author[0]}>
                <span
                  className='link'
                  tabIndex='0'
                  onClick={e => handleClick(e, author[0])}
                  onKeyDown={e => {
                    if (e.keyCode == 13) {
                      handleClick(e, author[0]);
                    }
                  }}
                >
                  {author[0]} ({author[1]})
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
  filterBooksByAuthor,
  resetFilters
};

export default connect(mapStateToProps, mapDispatchToProps)(HighlightedAuthors);
