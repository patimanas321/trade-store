import { GET_LATEST_TRADES, SET_SORT_MODEL } from '../actionTypes';
import { mergeTrades, sortTrades } from '../../Utils/trade';
import AppConstants from '../../Constants/AppConstants';

const INITIAL_STATE = {
  list: [],
  sortModel: {
    column: AppConstants.TRADE_COLS.ID,
    order: AppConstants.SORT_ORDER.ASCENDING
  },
  lastUpdate: {
    updatedAt: null,
    lowerVersionCount: 0,
    sameVersionCount: 0,
    lessMaturityDateCount: 0,
    validRecordsCount: 0
  }
};

const reducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case GET_LATEST_TRADES: {
    const {
      trades,
      lowerVersionCount,
      sameVersionCount,
      lessMaturityDateCount,
      validRecordsCount
    } = mergeTrades(state.list, action.data);

    return {
      ...state,
      list: sortTrades(trades, state.sortModel),
      lastUpdate: {
        updatedAt: new Date(),
        lowerVersionCount,
        sameVersionCount,
        lessMaturityDateCount,
        validRecordsCount
      }
    };
  }

  case SET_SORT_MODEL:
    return {
      ...state,
      sortModel: action.data,
      list: sortTrades(state.list, action.data)
    };

  default: return state;
  }
};

export default reducer;
