import React from 'react';
import PropTypes from 'prop-types';
import { AutoSizer, List } from 'react-virtualized';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowsUpDown, faArrowUp, faArrowDown } from '@fortawesome/free-solid-svg-icons';

import styles from './DataGrid.module.css';
import AppConstants from '../../../Constants/AppConstants';
import useLocalize from '../../../Hooks/useLocalize';

const { SORT_ORDER } = AppConstants;
const DataGrid = ({
  rows,
  columns,
  virtualize = false,
  sortCol,
  sortOrder,
  onSort
}) => {
  const translate = useLocalize();
  const handleColumnSort = (col) => {
    if (col !== sortCol) {
      onSort(col, SORT_ORDER.ASCENDING);
    } else {
      onSort(
        sortCol,
        sortOrder === SORT_ORDER.ASCENDING ? SORT_ORDER.DESCENDING : SORT_ORDER.ASCENDING
      );
    }
  };
  const rowRenderer = ({ key, index, style }) => {
    const row = rows[index];

    return (
      <div
        role="row"
        key={key}
        className={styles.dataRow}
        style={style}
        aria-rowindex={index + 2}
        data-testid={`data-row-${index}`}
      >
        {
          columns.map((col, index) => (
            <div
              key={`col-${index}`}
              role="gridcell"
              className={styles.dataCell}
              aria-colindex={index + 1}
            >
              {col.renderCell ? col.renderCell(row[col.field], row) : row[col.field]}
            </div>
          ))
        }
      </div>
    );
  };

  return (
    <div
      role="grid"
      className={styles.grid}
      aria-rowcount={rows.length}
    >
      <div
        role="row"
        className={styles.headerRow}
        aria-rowindex="1"
      >
        {
          columns.map((col, index) => (
            <div
              key={`col-${index}`}
              role="columnheader"
              className={styles.headerCell}
              aria-colindex={index + 1}
              data-testid={`col-header-${col.field}`}
            >
              {
                col.sortable && (
                  <a className={styles.sortableHeader} onClick={() => handleColumnSort(col.field)}>
                    <span data-testid={`col-title-${col.field}`}>{col.title}</span>
                    <i
                      data-testid={`col-sort-handle-${col.field}`}
                      aria-hidden="true"
                      className={styles.sortHandle}
                    >
                      {sortCol !== col.field && <FontAwesomeIcon icon={faArrowsUpDown} />}
                      {sortCol === col.field && <FontAwesomeIcon icon={sortOrder === SORT_ORDER.ASCENDING ? faArrowDown : faArrowUp} />}
                    </i>
                  </a>
                )
              }
              {
                !col.sortable && (
                  <span data-testid={`col-title-${col.field}`}>
                    {col.title}
                  </span>
                )
              }
            </div>
          ))
        }
      </div>
      <div className={styles.contentArea}>
        {
          !rows.length && (
            <h3
              data-testid="no-data-message"
              className={styles.noData}
            >
              {translate('generic.no_records_found')}
            </h3>
          )
        }
        {
          !!rows.length && virtualize && (
            <AutoSizer>
              {
                ({ height, width }) => (
                  <List
                    height={height}
                    width={width}
                    rowCount={rows.length}
                    rowHeight={68}
                    rowRenderer={rowRenderer}
                  />
                )
              }
            </AutoSizer>
          )
        }
        {
          !!rows.length && !virtualize && rows.map((row, index) => rowRenderer({
            key: row.id ? `row-${row.id}-${index}` : index,
            index,
            style: {
              height: '68px'
            }
          }))
        }
      </div>
      {
        !!rows.length && (
          <div className={styles.footerRow}>
            {`${translate('generic.total')}: ${rows.length}`}
          </div>
        )
      }
    </div>
  );
};
DataGrid.propTypes = {
  rows: PropTypes.arrayOf(PropTypes.object).isRequired,
  columns: PropTypes.arrayOf(PropTypes.shape({
    title: PropTypes.string.isRequired,
    field: PropTypes.string.isRequired,
    sortable: PropTypes.bool,
    renderCell: PropTypes.func
  })).isRequired,
  virtualize: PropTypes.bool,
  sortCol: PropTypes.string,
  sortOrder: PropTypes.string,
  onSort: PropTypes.func
};

export default DataGrid;
