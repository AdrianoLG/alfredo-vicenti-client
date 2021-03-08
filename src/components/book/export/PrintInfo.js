import React from 'react';
import { connect } from 'react-redux';

import logo from '../../../assets/images/logo.svg';
import './printInfo.scss';

function PrintInfo({ books }) {
  return (
    <>
      <div className='printHeader'>
        <img id='logo' className='logoSmall' src={logo} alt='' />
        <h1>
          Biblioteca
          <br />
          <span className='subheader'>Alfredo Vicenti</span>
        </h1>
      </div>
      <div className='books'>
        {books.length > 0
          ? books.map(book => (
              <div className='printBook'>
                <div className='left'>
                  <h2>{book.title}</h2>
                  <h3>{book.author}</h3>
                </div>
                <div className='right'>
                  <h4>{book.category}</h4>
                </div>
              </div>
            ))
          : ''}
      </div>
    </>
  );
}

const mapStateToProps = (state, ownProps) => {
  return {
    books: state.books
  };
};

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(PrintInfo);
