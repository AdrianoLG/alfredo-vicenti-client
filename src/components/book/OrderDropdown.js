import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Dropdown } from 'semantic-ui-react';

import {
  orderBooksByAuthorAsc,
  orderBooksByAuthorDesc,
  orderBooksByCategoryAsc,
  orderBooksByCategoryDesc,
  orderBooksByTitleAsc,
  orderBooksByTitleDesc
} from '../../redux/actions/bookActions';

function OrderDropdown({
  books,
  orderBooksByAuthorAsc,
  orderBooksByAuthorDesc,
  orderBooksByCategoryAsc,
  orderBooksByCategoryDesc,
  orderBooksByTitleAsc,
  orderBooksByTitleDesc
}) {
  const value = '';
  const options = [
    { key: 1, text: 'Título A-Z', value: 1 },
    { key: 2, text: 'Título Z-A', value: 2 },
    { key: 3, text: 'Autor A-Z', value: 3 },
    { key: 4, text: 'Autor Z-A', value: 4 },
    { key: 5, text: 'Categoría A-Z', value: 5 },
    { key: 6, text: 'Categoría Z-A', value: 6 }
  ];

  useEffect(() => {}, [
    books,
    orderBooksByAuthorAsc,
    orderBooksByAuthorDesc,
    orderBooksByCategoryAsc,
    orderBooksByCategoryDesc,
    orderBooksByTitleAsc,
    orderBooksByTitleDesc
  ]);

  const handleChange = (e, { value }) => {
    switch (value) {
      case 1:
        return orderBooksByTitleAsc(books);
      case 2:
        return orderBooksByTitleDesc(books);
      case 3:
        return orderBooksByAuthorAsc(books);
      case 4:
        return orderBooksByAuthorDesc(books);
      case 5:
        return orderBooksByCategoryAsc(books);
      case 6:
        return orderBooksByCategoryDesc(books);
      default:
        return;
    }
  };
  return (
    <Dropdown
      text='Ordenar'
      icon='ordered list'
      labeled
      button
      className='tiny icon'
      options={options}
      onChange={handleChange}
      value={value}
    ></Dropdown>
  );
}

const mapStateToProps = state => {
  return {
    books: state.books
  };
};

const mapDispatchToProps = {
  orderBooksByAuthorAsc,
  orderBooksByAuthorDesc,
  orderBooksByCategoryAsc,
  orderBooksByCategoryDesc,
  orderBooksByTitleAsc,
  orderBooksByTitleDesc
};

export default connect(mapStateToProps, mapDispatchToProps)(OrderDropdown);
