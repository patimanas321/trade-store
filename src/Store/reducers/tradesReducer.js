import { GET_LATEST_TRADES, SET_SORT_COL, SET_SORT_ORDER } from '../actionTypes';
import AppConstants from '../../Constants/AppConstants';

const INITIAL_STATE = {
  list: [],
  sortColumn: AppConstants.TRADE_COLS.ID,
  sortOrder: AppConstants.SORT_ORDER.ASCENDING
};

const reducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case GET_LATEST_TRADES:
    return {
      ...state,
      list: [...state.list, ...action.data]
    };

  case SET_SORT_COL:
    return {
      ...state,
      sortColumn: action.data
    };

  case SET_SORT_ORDER:
    return {
      ...state,
      sortOrder: action.data
    };

  default: return state;
  }
};

export default reducer;
