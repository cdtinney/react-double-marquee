import React from 'react';
import PropTypes from 'prop-types';
import injectSheet from 'react-jss';
import Logo from '../../public/static/logo.png';

const styles = {
  header: {
    margin: '20px',
  },
  logo: {
    width: '400px',
    maxWidth: '100%',
  },
};

function Header({
  classes,
}) {
  return (
    <header className={classes.header}>
      <img className={classes.logo} src={Logo.src} alt="logo" />
    </header>
  );
}

Header.propTypes = {
  classes: PropTypes.shape({
    header: PropTypes.string.isRequired,
    logo: PropTypes.string.isRequired,
  }).isRequired,
};

export default injectSheet(styles)(Header);
