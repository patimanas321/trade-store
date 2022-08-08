import { GET_LATEST_TRADES, SET_SORT_MODEL } from '../actionTypes';
import TradesAPIClient from '../../API/tradesApiClient';
import Trade from '../../Model/Trade';

export const getNewTrades = () => async (dispatch) => {
  const res = await TradesAPIClient.getNewTrades();

  dispatch({
    type: GET_LATEST_TRADES,
    data: res.data.map(trade => new Trade(trade))
  });
};

export const setSortModel = (column, order) => ({
  type: SET_SORT_MODEL,
  data: {
    column,
    order
  }
});
