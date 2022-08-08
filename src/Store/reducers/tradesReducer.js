import { GET_LATEST_TRADES, SET_SORT_MODEL } from '../actionTypes';
import AppConstants from '../../Constants/AppConstants';

const INITIAL_STATE = {
  list: [],
  sortModel: {
    column: AppConstants.TRADE_COLS.ID,
    order: AppConstants.SORT_ORDER.ASCENDING
  }
};

const sortRecords = (records, { column, order }) => {
  return records.sort((a, b) => {
    if (order === AppConstants.SORT_ORDER.Ascending) {
      return a[column] > b[column] ? 1 : -1;
    }
    return a[column] > b[column] ? -1 : 1;
  });
};

const reducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case GET_LATEST_TRADES:
    return {
      ...state,
      list: [...state.list, ...action.data]
    };

  case SET_SORT_MODEL:
    return {
      ...state,
      sortModel: action.data,
      list: sortRecords(state.list, action.data)
    };

  default: return state;
  }
};

export default reducer;
