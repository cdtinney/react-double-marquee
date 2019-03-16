import React from 'react';
import PropTypes from 'prop-types';
import injectSheet from 'react-jss';

const styles = {
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    alignItems: 'center',
    border: '1px solid rgba(221, 221, 221)',
  },
  description: {
    width: '100px',
    padding: '20px',
    color: '#DDDDDD',
    backgroundColor: '#4A5A6A',
  },
  marqueeOuter: {
    width: '250px',
    flexGrow: 1,
    backgroundColor: '#CCCCCC',
    borderRadius: '2px',
  },
  marqueeInner: {
    width: '200px',
    margin: '20px',
    whiteSpace: 'nowrap',
  },
};

function ExampleCard({
  classes,
  description,
  marqueeComponent,
}) {
  return (
    <div className={classes.root}>
      <div className={classes.description}>
        {description}
      </div>
      <div className={classes.marqueeOuter}>
        <div className={classes.marqueeInner}>
          {marqueeComponent}
        </div>
      </div>
    </div>
  );
}

ExampleCard.propTypes = {
  classes: PropTypes.shape({
    root: PropTypes.string.isRequired,
  }).isRequired,
  description: PropTypes.string.isRequired,
  marqueeComponent: PropTypes.node.isRequired,
};

export default injectSheet(styles)(ExampleCard);
