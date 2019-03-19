import React from 'react';
import PropTypes from 'prop-types';
import JSONPretty from 'react-json-pretty';
import JSONPrettyAcai from 'react-json-pretty/dist/acai';
import injectSheet from 'react-jss';

const styles = {
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    alignItems: 'center',
  },
  description: {
    width: '250px',
    padding: '10px 15px',
    color: '#DDDDDD',
    backgroundColor: '#4A5A6A',
    boxShadow: '3px 3px 6px rgba(45, 45, 90, 0.35)',
  },
  marqueeOuter: {
    width: '250px',
    margin: '15px',
    flexGrow: 1,
    backgroundColor: '#CCCCCC',
    borderRadius: '2px',
    boxShadow: '3px 3px 6px rgba(45, 45, 90, 0.35)',
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
        <div>
          {description}
        </div>
        <div className={classes.props}>
          <JSONPretty
            data={{
              // Wrap it so that it's obvious to readers that
              // they are props.
              props: marqueeComponent.props,
            }}
            theme={{
              ...JSONPrettyAcai,
              main: `padding: 8px; ${JSONPrettyAcai.main}`,
              // Ensures that words are broken and wrapped as necessary
              // to fit the parent element.
              string: 'word-break: break-all; white-space: normal',
            }}
          />
        </div>
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
