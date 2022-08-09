import React, { useEffect } from 'react';
import DataGrid from '../../Components/core/DataGrid/DataGrid';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import TradeFetchSummary from '../../Components/TradeFetchSummary';
import useLocalize from '../../Hooks/useLocalize';
import { getNewTrades, setSortModel } from '../../Store/actions/tradeActions';
import AppConstants from '../../Constants/AppConstants';

const Trades = ({
  trades,
  fetchNewTrades,
  sortColumn,
  sortOrder,
  setSortModel,
  lastUpdate
}) => {
  const translate = useLocalize();
  const { TRADE_COLS } = AppConstants;
  const cols = [
    {
      title: translate('trades.id'),
      field: TRADE_COLS.ID,
      sortable: true
    },
    {
      title: translate('trades.version'),
      field: TRADE_COLS.VERSION
    },
    {
      title: translate('trades.counter_party_id'),
      field: TRADE_COLS.COUNTER_PARTY_ID,
      sortable: true
    },
    {
      title: translate('trades.booking_id'),
      field: TRADE_COLS.BOOKING_ID,
      sortable: true
    },
    {
      title: translate('trades.maturity_date'),
      field: TRADE_COLS.MATURITY_DATE,
      sortable: true,
      renderCell: (value) => value.toLocaleDateString()
    },
    {
      title: translate('trades.created_date'),
      field: TRADE_COLS.CREATED_DATE,
      sortable: true,
      renderCell: (value) => value.toLocaleDateString()
    },
    {
      title: translate('trades.expired'),
      field: TRADE_COLS.EXPIRED,
      sortable: true,
      renderCell: (value) => value ? translate('generic.yes') : translate('generic.no')
    }
  ];
  useEffect(() => {
    fetchNewTrades();
  }, []);

  return (
    <>
      <TradeFetchSummary summary={lastUpdate} onFetchNewRecords={fetchNewTrades} />
      <DataGrid columns={cols} rows={trades} sortCol={sortColumn} sortOrder={sortOrder} onSort={setSortModel} />
    </>
  );
};

const mapStateToProps = ({ trades }) => ({
  trades: trades.list,
  sortOrder: trades.sortModel.order,
  sortColumn: trades.sortModel.column,
  lastUpdate: trades.lastUpdate
});

const mapDispatchToProps = (dispatch) => ({
  fetchNewTrades: () => dispatch(getNewTrades()),
  setSortModel: (col, order) => dispatch(setSortModel(col, order))
});

export default connect(mapStateToProps, mapDispatchToProps)(Trades);

Trades.propTypes = {
  trades: PropTypes.arrayOf(PropTypes.object).isRequired,
  fetchNewTrades: PropTypes.func.isRequired,
  sortOrder: PropTypes.string.isRequired,
  sortColumn: PropTypes.string.isRequired,
  setSortModel: PropTypes.func.isRequired,
  lastUpdate: PropTypes.shape({
    updatedAt: PropTypes.object,
    lowerVersionCount: PropTypes.number,
    sameVersionCount: PropTypes.number,
    lessMaturityDateCount: PropTypes.number,
    validRecordsCount: PropTypes.number
  }).isRequired
};
