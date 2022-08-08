import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowsUpDown, faArrowUp, faArrowDown } from '@fortawesome/free-solid-svg-icons';

import styles from './DataGrid.module.css';
import AppConstants from '../../../Constants/AppConstants';
import useLocalize from '../../../Hooks/useLocalize';

const { SORT_ORDER: { ASCENDING, DESCENDING } } = AppConstants;
const DataGrid = ({
  rows,
  columns,
  sortCol,
  sortOrder,
  onSort
}) => {
  const translate = useLocalize();
  const handleColumnSort = (col) => {
    if (col !== sortCol) {
      onSort(col, ASCENDING);
    } else {
      onSort(
        sortCol,
        sortOrder === ASCENDING ? DESCENDING : ASCENDING
      );
    }
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
                      {sortCol === col.field && <FontAwesomeIcon icon={sortOrder === AppConstants.SORT_ORDER.ascending ? faArrowDown : faArrowUp} />}
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
        !!rows.length && rows.map((row, index) => (
          <div
            role="row"
            key={row.id ?? index}
            className={styles.dataRow}
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
        ))
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
  sortCol: PropTypes.string,
  sortOrder: PropTypes.string,
  onSort: PropTypes.func
};

export default DataGrid;
