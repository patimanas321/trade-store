import React from 'react';
import { render, screen } from '@testing-library/react';
import DataGrid from './DataGrid';
import AppConstants from '../../../Constants/AppConstants';

const rows = new Array(10).fill(0).map((_, index) => ({
  id: index,
  name: `Name ${index}`,
  address: `Address ${index}`,
  scores: index * 3,
  rollNo: index + 1
}));
const cols = [
  {
    title: 'Roll No',
    field: 'rollNo',
    sortable: false
  },
  {
    title: 'Name',
    field: 'name',
    sortable: true
  },
  {
    title: 'Address',
    field: 'address',
    sortable: false
  },
  {
    title: 'Scores',
    field: 'scores',
    sortable: true
  }
];
const selector = {
  getDataRow: (index) => `data-row-${index}`,
  getColHeader: (field) => `col-header-${field}`,
  getColTitle: (field) => `col-title-${field}`,
  getColSortHandle: (field) => `col-sort-handle-${field}`,
  noDataMessage: 'no-data-message'
};

test('should contain column headers', () => {
  render(<DataGrid rows={rows} columns={cols} />);
  for (const col of cols) {
    const header = screen.getByTestId(selector.getColHeader(col.field));
    expect(header).toBeInTheDocument();
    const headerTitle = screen.getByTestId(selector.getColTitle(col.field));
    expect(headerTitle).toBeInTheDocument();

    if (col.sortable) {
      const sortHandle = screen.getByTestId(selector.getColSortHandle(col.field));
      expect(sortHandle).toBeInTheDocument();
    } else {
      expect(screen.queryByTestId(selector.getColSortHandle(col.field))).toBeNull();
    }
  }
});

test('should sort the column when clicked on headers', () => {
  const onSortMock = jest.fn();
  render(<DataGrid rows={rows} columns={cols} onSort={onSortMock} />);

  const nameColSortHandle = screen.getByTestId(selector.getColSortHandle(cols[1].field));
  nameColSortHandle.click();
  expect(onSortMock).toHaveBeenLastCalledWith(cols[1].field, AppConstants.SORT_ORDER.Ascending);

  const scoresColSortHandle = screen.getByTestId(selector.getColSortHandle(cols[3].field));
  scoresColSortHandle.click();
  expect(onSortMock).toHaveBeenLastCalledWith(cols[3].field, AppConstants.SORT_ORDER.Ascending);
});

test('should render no data message when there are no rows', () => {
  render(<DataGrid rows={[]} columns={cols} />);

  const noDataMessage = screen.getByTestId(selector.noDataMessage);
  expect(noDataMessage).toBeInTheDocument();
});

test('should render rows', () => {
  render(<DataGrid rows={rows} columns={cols} />);

  for (let i = 0; i < rows.length; i++) {
    const row = rows[i];
    const dataRow = screen.getByTestId(selector.getDataRow(i));
    expect(dataRow).toBeInTheDocument();
    expect(dataRow).toHaveTextContent(row.rollNo);
    expect(dataRow).toHaveTextContent(row.name);
    expect(dataRow).toHaveTextContent(row.address);
    expect(dataRow).toHaveTextContent(row.scores);
  }
});

test('should render custom cell templates', () => {
  const cols = [
    {
      title: 'Name',
      field: 'name',
      sortable: false,
      renderCell: (value, row) => (
        <span data-testid={`cell-name-${row.id}`}>
          <a data-testid={`cell-name-link-${row.id}`} href="#">{value}</a>
        </span>
      )
    }
  ];
  render(<DataGrid rows={rows} columns={cols} />);

  for (const row of rows) {
    const cell = screen.getByTestId(`cell-name-${row.id}`);
    expect(cell).toBeInTheDocument();

    const link = screen.getByTestId(`cell-name-link-${row.id}`);
    expect(link).toBeInTheDocument();

    expect(link).toHaveTextContent(row.name);
  }
});
