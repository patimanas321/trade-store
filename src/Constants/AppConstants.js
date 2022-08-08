const AppConstants = {
  BASE_API_URL: process.env.REACT_APP_API_URL,
  SORT_ORDER: {
    ASCENDING: 'asc',
    DESCENDING: 'desc'
  },
  TRADE_COLS: {
    ID: 'id',
    VERSION: 'version',
    COUNTER_PARTY_ID: 'counterPartyId',
    BOOKING_ID: 'bookingId',
    MATURITY_DATE: 'maturityDate',
    CREATED_DATE: 'createdDate',
    EXPIRED: 'expired'
  }
};

export default AppConstants;
