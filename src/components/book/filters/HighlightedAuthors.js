import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';

import Filter from './Filter';
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
      .filter(book => book.author !== null)
      .map(book => book.author);
    const repeatedAuthors = getTimesRepeated(authors);
    const sortedRepeatedAuthors = sorts(repeatedAuthors);
    setAuthors(sortedRepeatedAuthors);
  }, [books, resetFilters, filterBooksByAuthor]);

  function handleClick(e, author) {
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

  function handleEnter(e, category) {
    if (e.keyCode === 13) {
      handleClick(e, category);
    }
  }

  return (
    <Filter
      data={authors}
      name='Autores destacados'
      handleClick={handleClick}
      handleEnter={handleEnter}
      type='highlightedAuthors'
    />
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
