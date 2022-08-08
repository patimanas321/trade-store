import PropTypes from 'prop-types';

import styles from './DataGrid.module.css';

const DataGrid = ({
  rows,
  columns,
  sortCol,
  sortOrder,
  onSort
}) => {
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
              <span data-testid={`col-title-${col.field}`}>
                {col.title}
              </span>
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
