import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Input } from 'semantic-ui-react';

import { filterBooksByValue } from '../../../redux/actions/bookActions';

function SearchBook({ filterBooksByValue, books }) {
  const [booksConst, setBooksConst] = useState(books);
  const [start, setStart] = useState(true);

  const handleChange = e => {
    if (start) {
      setBooksConst(books);
      setStart(false);
      filterBooksByValue(e.target.value, books);
    } else {
      filterBooksByValue(e.target.value, booksConst);
    }
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
