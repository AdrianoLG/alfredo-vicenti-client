import React from 'react';
import { useHistory } from 'react-router-dom';
import { Button } from 'semantic-ui-react';

import BoxHeader from '../components/user/BoxHeader';
import './notFound.scss';

const NotFound = function () {
  const history = useHistory();

  return (
    <div className='main-background'>
      <div className='centered-box not-found'>
        <BoxHeader />
        <h2>404</h2>
        <h3>Quería perderse. Olvidarse de todo y de todos.</h3>
        <div className='buttons'>
          <Button
            onClick={() => {
              history.push('/');
            }}
          >
            Volver
          </Button>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
