import React from 'react';
import { Icon } from 'semantic-ui-react';

const Filter = ({ data, name, handleClick, handleEnter }) => {
  return (
    <>
      {data.length > 0 ? (
        <>
          <h2>{name}</h2>
          <ul className='book-filter'>
            {data.slice(0, 4).map(dataItem => (
              <li key={dataItem[0]}>
                <span
                  className='link'
                  tabIndex='0'
                  onClick={e => handleClick(e, dataItem[0])}
                  onKeyDown={e => handleEnter(e, dataItem[0])}
                >
                  {dataItem[0]} ({dataItem[1]})
                </span>
                <Icon name='close' />
              </li>
            ))}
          </ul>
        </>
      ) : (
        ''
      )}
    </>
  );
};

export default Filter;
