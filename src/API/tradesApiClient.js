import axios from 'axios';

import AppConstants from '../Constants/AppConstants';

class TradesAPIClient {
  static getNewTrades () {
    return axios.get(`${AppConstants.BASE_API_URL}/trades`);
  }
}

export default TradesAPIClient;
