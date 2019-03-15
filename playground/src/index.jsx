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
    <Marquee>
      foo
    </Marquee>
  );
}

ReactDOM.render(
  <Index />,
  document.getElementById('root'),
);
