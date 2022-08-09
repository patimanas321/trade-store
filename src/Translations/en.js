const strings = {
  header: 'Trade Store',
  trades: {
    id: 'Trade Id',
    version: 'Version',
    counter_party_id: 'Counter-Party Id',
    booking_id: 'Booking Id',
    maturity_date: 'Maturity Date',
    created_date: 'Created Date',
    expired: 'Expired',
    fetch_new_trades: 'Fetch new trades'
  },
  trade_summary: {
    last_fetch: 'Last fetch: $DATE',
    valid_records_count: '$COUNT new trades added',
    same_version_count: '$COUNT trades are replaced due to same version',
    lower_version_count: '$COUNT trades are rejected due to previous version',
    past_maturity_date_count: '$COUNT trades are rejected due to past maturity date'
  },
  generic: {
    yes: 'Y',
    no: 'N',
    no_records_found: 'No records found',
    total: 'Total'
  }
};

export default strings;
