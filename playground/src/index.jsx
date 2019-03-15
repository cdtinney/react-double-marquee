///////////////////////////
// External dependencies //
///////////////////////////

import React from 'react';
import ReactDOM from 'react-dom';

///////////////////////////
// Internal dependencies //
///////////////////////////

import Marquee from '../../dist/bundle.esm';

function Index() {
  return (
    <div
      style={{
        width: '200px',
        whiteSpace: 'nowrap',
      }}
    >
      <Marquee>
        foo foo foo foo foo foo foo foo foo foo foo foo foo foo foo foo foo foo
      </Marquee>
    </div>
  );
}

ReactDOM.render(
  <Index />,
  document.getElementById('root'),
);
