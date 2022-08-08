import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowsUpDown, faArrowUp, faArrowDown } from '@fortawesome/free-solid-svg-icons';

import styles from './DataGrid.module.css';
import AppConstants from '../../../Constants/AppConstants';

const DataGrid = ({
  rows,
  columns,
  sortCol,
  sortOrder,
  onSort
}) => {
  const handleColumnSort = (col) => {
    if (col !== sortCol) {
      onSort(col, AppConstants.SORT_ORDER.Ascending);
    } else {
      onSort(
        sortCol,
        sortOrder === AppConstants.SORT_ORDER.Ascending ? AppConstants.SORT_ORDER.Descending : AppConstants.SORT_ORDER.Ascending
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
                      {sortCol === col.field && <FontAwesomeIcon icon={sortOrder === AppConstants.SORT_ORDER.Ascending ? faArrowDown : faArrowUp} />}
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
