import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Icon } from 'semantic-ui-react';

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
    e.preventDefault();
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

  return (
    <>
      {categories.length > 0 ? (
        <>
          <h2>Categorías destacadas</h2>
          <ul className='book-filter category'>
            {categories.slice(0, 4).map(category => (
              <li key={category[0]}>
                <span
                  className='link'
                  tabIndex='0'
                  onClick={e => handleClick(e, category[0])}
                  onKeyDown={e => {
                    if (e.keyCode === 13) {
                      handleClick(e, category[0]);
                    }
                  }}
                >
                  {category[0]} ({category[1]})
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
  filterBooksByCategory,
  resetFilters
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HighlightedCategories);
