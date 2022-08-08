import { GET_LATEST_TRADES } from '../actionTypes';

const INITIAL_STATE = {
  list: []
};

const reducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case GET_LATEST_TRADES:
    return {
      ...state,
      list: [...state.list, ...action.data]
    };

  default: return state;
  }
};

export default reducer;
