import React from 'react';
import { render, screen } from '@testing-library/react';
import TradeFetchSummary from './TradeFetchSummary';
import strings from '../../Translations/en';

const selectors = {
  lastFetch: 'last_fetch',
  validRecordsCount: 'valid_records_count',
  sameVersionCount: 'same_version_count',
  lowerVersionCount: 'lower_version_count',
  pastMaturityDateCount: 'past_maturity_date_count'
};
test('should render summary', () => {
  const onClickMock = jest.fn();
  const data = {
    updatedAt: new Date(),
    lowerVersionCount: 1,
    sameVersionCount: 2,
    lessMaturityDateCount: 3,
    validRecordsCount: 5
  };

  render(<TradeFetchSummary summary={data} onFetchNewRecords={onClickMock} />);

  const lastFetch = screen.getByTestId(selectors.lastFetch);
  expect(lastFetch).toBeInTheDocument();
  expect(lastFetch).toHaveTextContent(data.updatedAt.toLocaleTimeString());

  const lowerVersionCount = screen.getByTestId(selectors.lowerVersionCount);
  expect(lowerVersionCount).toBeInTheDocument();
  expect(lowerVersionCount).toHaveTextContent(data.lowerVersionCount);

  const sameVersionCount = screen.getByTestId(selectors.sameVersionCount);
  expect(sameVersionCount).toBeInTheDocument();
  expect(sameVersionCount).toHaveTextContent(data.sameVersionCount);

  const lessMaturityDateCount = screen.getByTestId(selectors.pastMaturityDateCount);
  expect(lessMaturityDateCount).toBeInTheDocument();
  expect(lessMaturityDateCount).toHaveTextContent(data.lessMaturityDateCount);

  const validRecordsCount = screen.getByTestId(selectors.validRecordsCount);
  expect(validRecordsCount).toBeInTheDocument();
  expect(validRecordsCount).toHaveTextContent(data.validRecordsCount);
});

test('should trigger onFetchNewRecords event when fetch button is clicked', () => {
  const onClickMock = jest.fn();
  const data = {
    updatedAt: new Date(),
    lowerVersionCount: 1,
    sameVersionCount: 2,
    lessMaturityDateCount: 3,
    validRecordsCount: 5
  };

  render(<TradeFetchSummary summary={data} onFetchNewRecords={onClickMock} />);

  const btnFetch = screen.getByText(strings.trades.fetch_new_trades);
  btnFetch.click();
  expect(onClickMock).toBeCalledTimes(1);
});
