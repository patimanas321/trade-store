import { GET_LATEST_TRADES, SET_SORT_COL, SET_SORT_ORDER } from '../actionTypes';
import TradesAPIClient from '../../API/tradesApiClient';
import Trade from '../../Model/Trade';

export const getNewTrades = () => async (dispatch) => {
  const res = await TradesAPIClient.getNewTrades();

  dispatch({
    type: GET_LATEST_TRADES,
    data: res.data.map(trade => new Trade(trade))
  });
};

export const setSortColumn = (column) => ({
  type: SET_SORT_COL,
  data: column
});

export const setSortOrder = (order) => ({
  type: SET_SORT_ORDER,
  data: order
});
