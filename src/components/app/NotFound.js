import React from 'react';
import { NavLink } from 'react-router-dom';

const PageNotFound = () => (
  <div>
    <h1>404</h1>
    <NavLink to="/">Volver</NavLink>
  </div>
);

export default PageNotFound;
