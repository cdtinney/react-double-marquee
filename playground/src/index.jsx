///////////////////////////
// External dependencies //
///////////////////////////

import React from 'react';
import ReactDOM from 'react-dom';

///////////////////////////
// Internal dependencies //
///////////////////////////

import Marquee from '../public/static/lib';

function Index() {
  return (
    <div
      style={{
        width: '200px',
        whiteSpace: 'nowrap',
      }}
    >
      <Marquee>
        foo bar foo bar foo foo foo foo foo foo foo foo foo foo foo foo foo foo
      </Marquee>
    </div>
  );
}

ReactDOM.render(
  <Index />,
  document.getElementById('root'),
);
