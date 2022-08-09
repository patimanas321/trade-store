import React from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSquare } from '@fortawesome/free-solid-svg-icons';

import Button from '../core/Button';
import useLocalize from '../../Hooks/useLocalize';
import styles from './TradeFetchSummary.module.css';

const TradeFetchSummary = ({
  summary,
  onFetchNewRecords
}) => {
  const translate = useLocalize();
  const pointer = (
    <i
      aria-hidden="true"
      className={styles.bullet}
    >
      <FontAwesomeIcon icon={faSquare} />
    </i>
  );

  return (
    <section className={styles.wrapper}>
      <div className={styles.summary}>
        <p
          data-testid="last_fetch"
          className={styles.date}
        >
          {translate('trade_summary.last_fetch').replace('$DATE', summary.updatedAt?.toLocaleTimeString() ?? '--')}
        </p>
        <div className={styles.details}>
          <div>
            <p data-testid="valid_records_count" className={styles.info}>
              {pointer}
              {translate('trade_summary.valid_records_count').replace('$COUNT', summary.validRecordsCount)}
            </p>
            <p data-testid="same_version_count" className={styles.info}>
              {pointer}
              {translate('trade_summary.same_version_count').replace('$COUNT', summary.sameVersionCount)}
            </p>
          </div>
          <div className={styles.col2}>
            <p data-testid="lower_version_count" className={styles.info}>
              {pointer}
              {translate('trade_summary.lower_version_count').replace('$COUNT', summary.lowerVersionCount)}
            </p>
            <p data-testid="past_maturity_date_count" className={styles.info}>
              {pointer}
              {translate('trade_summary.past_maturity_date_count').replace('$COUNT', summary.lessMaturityDateCount)}
            </p>
          </div>
        </div>
      </div>
      <div>
        <Button label={translate('trades.fetch_new_trades')} onClick={onFetchNewRecords} />
      </div>
    </section>
  );
};

TradeFetchSummary.propTypes = {
  summary: PropTypes.shape({
    updatedAt: PropTypes.object,
    lowerVersionCount: PropTypes.number,
    sameVersionCount: PropTypes.number,
    lessMaturityDateCount: PropTypes.number,
    validRecordsCount: PropTypes.number
  }).isRequired,
  onFetchNewRecords: PropTypes.func.isRequired
};

export default TradeFetchSummary;
