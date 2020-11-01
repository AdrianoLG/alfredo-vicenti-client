import React from 'react';
import Header from '../header/Header';
import { connect } from 'react-redux';
import * as bookActions from '../../redux/actions/bookActions';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import BookDetail from './BookDetail';

class Detail extends React.Component {
  componentDidMount() {
    const { book, actions } = this.props;
    if (book.length === 0) {
      actions.loadBook().catch(error => {
        alert('Loading books failed' + error);
      });
    }
  }

  render() {
    return (
      <React.Fragment>
        <Header />
        <div className='container'>
          <h1>Libro {this.props.match.params.id}</h1>
          <BookDetail book={this.props.book} />
        </div>
      </React.Fragment>
    );
  }
}

Detail.propTypes = {
  book: PropTypes.object.isRequired,
  actions: PropTypes.object.isRequired
};

const mapStateToProps = state => {
  return {
    book: state.book
  };
};

const mapDispatchToProps = dispatch => {
  return {
    actions: {
      loadBook: bindActionCreators(bookActions.loadBook, dispatch)
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Detail);