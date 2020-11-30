import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import {
  filterBooksByCategory,
  resetFilters
} from '../../../redux/actions/bookActions';

function HighlightedCategories({ books, resetFilters, filterBooksByCategory }) {
  const [categories, setCategories] = useState([]);
  const [filtered, setFiltered] = useState(false);
  const [originalList, setOriginalList] = useState([]);
  useEffect(() => {
    const categories = books.map(book => book.category);
    const repeatedCategories = getTimesRepeated(categories);
    const sortedRepeatedCategories = sorts(repeatedCategories);
    setCategories(sortedRepeatedCategories);
  }, [books, resetFilters, filterBooksByCategory]);

  function getTimesRepeated(array) {
    if (array.length === 0) return null;
    var items = {};
    for (var i = 0; i < array.length; i++) {
      var el = array[i];
      if (items[el] == null) items[el] = 1;
      else items[el]++;
    }
    return items;
  }

  function sorts(array) {
    let sortable = [];
    for (let item in array) {
      sortable.push([item, array[item]]);
    }

    sortable.sort(function (a, b) {
      return b[1] - a[1];
    });
    return sortable;
  }

  function handleClick(e, category) {
    e.preventDefault();
    if (!filtered) {
      setOriginalList(books);
      filterBooksByCategory(category);
      setFiltered(true);
    } else {
      resetFilters(originalList);
      setFiltered(false);
    }
  }

  return (
    <>
      {categories.length > 0 ? (
        <>
          <h2>Categorías destacadas</h2>
          <ul>
            {categories.slice(0, 4).map(category => (
              <li key={category[0]}>
                <a
                  href='#'
                  onClick={e => handleClick(e, category[0])}
                  className={filtered ? 'active' : ''}
                >
                  {category[0]} ({category[1]})
                </a>
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
