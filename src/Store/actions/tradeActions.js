import { GET_LATEST_TRADES } from '../actionTypes';
import TradesAPIClient from '../../API/tradesApiClient';
import Trade from '../../Model/Trade';

export const getNewTrades = () => async (dispatch) => {
  const res = await TradesAPIClient.getNewTrades();

  dispatch({
    type: GET_LATEST_TRADES,
    data: res.data.map(trade => new Trade(trade))
  });
};
