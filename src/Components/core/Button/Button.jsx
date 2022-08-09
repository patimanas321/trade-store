import React from 'react';
import PropTypes from 'prop-types';

import styles from './Button.module.css';

const Button = ({
  label,
  onClick
}) => (
  <button className={styles.button} onClick={onClick}>{label}</button>
);

Button.propTypes = {
  label: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired
};

export default Button;
