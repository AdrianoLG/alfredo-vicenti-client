import React, { useEffect } from 'react';
import { useHistory } from 'react-router';

import PrintInfo from '../../components/book/export/PrintInfo';

const Print = () => {
  const history = useHistory();

  useEffect(() => {
    window.print();
  });

  window.onafterprint = event => {
    history.push('/');
  };

  return <PrintInfo />;
};

export default Print;
