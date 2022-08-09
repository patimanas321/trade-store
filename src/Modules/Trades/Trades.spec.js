import React from 'react';
import { screen, render } from '@testing-library/react';
import Trades from './Trades';
import strings from '../../Translations/en';
import AppConstants from '../../Constants/AppConstants';
import TestWrapper from '../../Utils/TestWrapper';

const trades = new Array(10).fill(0).map((_, index) => ({
  id: `TRADE_${index}`,
  version: 1,
  counterPartyId: `Counter-Party-${index}`,
  bookingId: `B_${index}`,
  maturityDate: new Date(),
  createdDate: new Date()
}));
const lastUpdate = {
  updatedAt: new Date(),
  lowerVersionCount: 2,
  sameVersionCount: 3,
  lessMaturityDateCount: 4,
  validRecordsCount: 6
};
const INITIAL_STATE = {
  trades: {
    list: trades,
    sortModel: {
      column: AppConstants.TRADE_COLS.ID,
      order: AppConstants.SORT_ORDER.ASCENDING
    },
    lastUpdate
  }
};
test('should render data grid', () => {
  const fetchNewTrades = jest.fn();
  const setSortModel = jest.fn();
  render(TestWrapper(
    <Trades
      fetchNewTrades={fetchNewTrades}
      sortOrder={AppConstants.SORT_ORDER.ASCENDING}
      sortColumn={'id'}
      setSortModel={setSortModel}
    />,
    INITIAL_STATE
  ));
  const rows = screen.getAllByRole('row');
  for (let i = 1; i <= rows.length; i++) {
    expect(rows[i - 1]).toHaveAttribute('aria-rowindex', i.toString());
  }
});

test('should render summary', () => {
  const fetchNewTrades = jest.fn();
  const setSortModel = jest.fn();
  render(TestWrapper(
    <Trades
      fetchNewTrades={fetchNewTrades}
      sortOrder={AppConstants.SORT_ORDER.ASCENDING}
      sortColumn={'id'}
      setSortModel={setSortModel}
    />,
    INITIAL_STATE
  ));
  const lastUpdated = screen.getByText(strings.trade_summary.last_fetch.replace('$DATE', lastUpdate.updatedAt?.toLocaleDateString()));
  expect(lastUpdated).toBeInTheDocument();

  const validRecordsCount = screen.getByText(strings.trade_summary.valid_records_count.replace('$COUNT', lastUpdate.validRecordsCount));
  expect(validRecordsCount).toBeInTheDocument();

  const sameVersionCount = screen.getByText(strings.trade_summary.same_version_count.replace('$COUNT', lastUpdate.sameVersionCount));
  expect(sameVersionCount).toBeInTheDocument();

  const lowerVersionCount = screen.getByText(strings.trade_summary.lower_version_count.replace('$COUNT', lastUpdate.lowerVersionCount));
  expect(lowerVersionCount).toBeInTheDocument();

  const lessMaturityDateCount = screen.getByText(strings.trade_summary.past_maturity_date_count.replace('$COUNT', lastUpdate.lessMaturityDateCount));
  expect(lessMaturityDateCount).toBeInTheDocument();
});
