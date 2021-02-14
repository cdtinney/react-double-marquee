///////////////////////////
// External dependencies //
///////////////////////////

import React from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';
import injectSheet from 'react-jss';

///////////////////////////
// Internal dependencies //
///////////////////////////

import Header from './components/Header';
import DefaultRightMarquee from './examples/DefaultRightMarquee';
import DefaultLeftMarquee from './examples/DefaultLeftMarquee';
import ShortMarquee from './examples/ShortMarquee';
import ShortScrollingMarquee from './examples/ShortScrollingMarquee';

import './styles.css';

const styles = {
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    fontFamily: 'roboto, sans-serif',
    boxSizing: 'border-box',
    backgroundColor: '#EFEFEF',
  },
  examples: {
    width: '90%',
    maxWidth: '1200px',
    padding: '20px 15px',
    borderTop: '1px solid rgba(221, 221, 221)',
  },
};

function Index({
  classes,
}) {
  return (
    <div className={classes.root}>
      <Header />
      <div className={classes.examples}>
        <DefaultRightMarquee />
        <DefaultLeftMarquee />
        <ShortScrollingMarquee />
        <ShortMarquee />
      </div>
    </div>
  );
}

Index.propTypes = {
  classes: PropTypes.shape({
    root: PropTypes.string.isRequired,
    examples: PropTypes.string.isRequired,
  }).isRequired,
};

const ComponentWithStyles = injectSheet(styles)(Index);

ReactDOM.render(
  <ComponentWithStyles />,
  document.getElementById('root'),
);
