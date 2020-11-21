import React from 'react';
import { useHistory } from 'react-router-dom';

const NotFound = function () {
  const history = useHistory();

  return (
    <div>
      <h1>404</h1>
      <button
        onClick={() => {
          history.push('/');
        }}
      >
        Volver
      </button>
    </div>
  );
};

export default NotFound;
