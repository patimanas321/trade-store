import axios from 'axios';

import AppConstants from '../Constants/AppConstants';

export const getNewTrades = () => {
  return axios.get(`${AppConstants.BASE_API_URL}/trades`);
};
