import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Input } from 'semantic-ui-react';
import { filterBooksByValue } from '../../../redux/actions/bookActions';

function SearchBook({ filterBooksByValue, books, resetFilters }) {
  const [booksConst, setBooksConst] = useState([]);
  useEffect(() => {
    if (booksConst.length === 0) {
      setBooksConst(books);
    }
  }, [filterBooksByValue, books, resetFilters, booksConst]);

  const handleChange = e => {
    filterBooksByValue(e.target.value, booksConst);
  };

  return (
    <Input icon='search' placeholder='Buscar...' onChange={handleChange} />
  );
}

const mapStateToProps = state => {
  return {
    books: state.books
  };
};

const MapDispatchToProps = {
  filterBooksByValue
};

export default connect(mapStateToProps, MapDispatchToProps)(SearchBook);
