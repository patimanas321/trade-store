import { GET_LATEST_TRADES } from '../actionTypes';

const INITIAL_STATE = {
  list: []
};

const reducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case GET_LATEST_TRADES:
    console.log('called');
    return {
      ...state,
      trades: [...state.trades, ...action.data]
    };

  default: return state;
  }
};

export default reducer;
