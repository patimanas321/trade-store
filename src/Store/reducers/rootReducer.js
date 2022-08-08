import { combineReducers } from 'redux';

import tradesReducer from './tradesReducer';

const reducers = {
  trades: tradesReducer
};

export default combineReducers(reducers);
