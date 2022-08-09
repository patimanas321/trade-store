import React from 'react';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleExclamation } from '@fortawesome/free-solid-svg-icons';
import PropTypes from 'prop-types';

import styles from './APIError.module.css';

const APIError = ({
  message
}) => {
  if (!message) {
    return null;
  }

  return (
    <p className={styles.APIError}>
      <i
        aria-hidden="true"
        className={styles.icon}
      >
        <FontAwesomeIcon icon={faCircleExclamation} />
      </i>
      {message}
    </p>
  );
};

const mapStateToProps = ({ apiError }) => ({
  message: apiError.message
});

export default connect(mapStateToProps)(APIError);

APIError.propTypes = {
  message: PropTypes.string
};
