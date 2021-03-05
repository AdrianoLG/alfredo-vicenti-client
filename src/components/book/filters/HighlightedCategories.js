import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';

import Filter from './Filter';
import {
  filterBooksByCategory,
  resetFilters
} from '../../../redux/actions/bookActions';
import { getTimesRepeated, sorts } from '../../../utils/filterCollections';

function HighlightedCategories({ books, resetFilters, filterBooksByCategory }) {
  const [categories, setCategories] = useState([]);
  const [filtered, setFiltered] = useState(false);
  const [originalList, setOriginalList] = useState([]);

  useEffect(() => {
    const bookCategories = books
      .filter(book => book.category !== null)
      .map(book => book.category);
    const repeatedCategories = getTimesRepeated(bookCategories);
    const sortedRepeatedCategories = sorts(repeatedCategories);
    setCategories(sortedRepeatedCategories);
  }, [books, resetFilters, filterBooksByCategory]);

  function handleClick(e, category) {
    if (!filtered) {
      setOriginalList(books);
      filterBooksByCategory(category);
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
      data={categories}
      name='Categorías destacadas'
      handleClick={handleClick}
      handleEnter={handleEnter}
      type='highlightedCategories'
    />
  );
}

const mapStateToProps = state => {
  return {
    books: state.books
  };
};

const mapDispatchToProps = {
  filterBooksByCategory,
  resetFilters
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HighlightedCategories);
