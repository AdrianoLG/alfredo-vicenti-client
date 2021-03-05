import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';

import Filter from './Filter';
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
      .filter(book => book.editorial !== null)
      .map(book => book.editorial);
    const repeatedEditorial = getTimesRepeated(editorial);
    const sortedRepeatedEditorial = sorts(repeatedEditorial);
    setEditorial(sortedRepeatedEditorial);
  }, [books, resetFilters]);

  function handleClick(e, editorial) {
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

  function handleEnter(e, category) {
    if (e.keyCode === 13) {
      handleClick(e, category);
    }
  }

  return (
    <Filter
      data={editorial}
      name='Editoriales destacadas'
      handleClick={handleClick}
      handleEnter={handleEnter}
      type='highlightedEditorial'
    />
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
