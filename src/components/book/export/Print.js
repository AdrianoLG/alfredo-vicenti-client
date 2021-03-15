import React from 'react';
import { useHistory } from 'react-router';
import { Button, Icon } from 'semantic-ui-react';

const PrintBooks = () => {
  const history = useHistory();

  return (
    <Button
      basic
      className='hov printBooks'
      onClick={() => history.push('/imprimir')}
    >
      <Icon name='print' /> Imprimir
    </Button>
  );
};

export default PrintBooks;
