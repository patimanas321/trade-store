import { GET_LATEST_TRADES, SET_SORT_MODEL, SHOW_API_ERROR, HIDE_API_ERROR } from '../actionTypes';
import TradesAPIClient from '../../API/tradesApiClient';
import Trade from '../../Model/Trade';

export const getNewTrades = () => (dispatch) => {
  TradesAPIClient.getNewTrades()
    .then(res => {
      dispatch({
        type: HIDE_API_ERROR
      });
      dispatch({
        type: GET_LATEST_TRADES,
        data: res.data.map(trade => new Trade(trade))
      });
    })
    .catch(() => dispatch({
      type: SHOW_API_ERROR,
      data: "Looks like JSON-SERVER is not running. Please run both 'npm start' and 'npm run json-server' in separate terminal windows"
    }));
};

export const setSortModel = (column, order) => ({
  type: SET_SORT_MODEL,
  data: {
    column,
    order
  }
});
