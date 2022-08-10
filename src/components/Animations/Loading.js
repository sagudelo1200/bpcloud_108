import React from 'react';

import { Spinner } from 'reactstrap';

export const DefaultLoading = (props) => {
  return (
    <>
      <div
        className='content'
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Spinner
          color={props.color}
          style={{ margin: 'auto', width: '3rem', height: '3rem' }}
          type='grow'
        />
      </div>
    </>
  );
};