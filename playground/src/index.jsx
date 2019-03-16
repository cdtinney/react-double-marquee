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
import DefaultMarquee from './examples/DefaultMarquee';

import './styles.css';

const styles = {
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    height: '100%',
    fontFamily: 'roboto, sans-serif',
    boxSizing: 'border-box',
    backgroundColor: '#EFEFEF',
  },
  examples: {
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
        <DefaultMarquee />
      </div>
    </div>
  );
}

Index.propTypes = {
  classes: PropTypes.shape({
    root: PropTypes.string.isRequired,
  }).isRequired,
};

const ComponentWithStyles = injectSheet(styles)(Index);

ReactDOM.render(
  <ComponentWithStyles />,
  document.getElementById('root'),
);
