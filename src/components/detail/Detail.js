import React from 'react';
import Header from '../header/Header';

const Detail = (props) => (
    <React.Fragment>
        <Header />
        <div className="container">
            <h1>Libro {props.match.params.id}</h1>
        </div>
    </React.Fragment>
);

export default Detail;