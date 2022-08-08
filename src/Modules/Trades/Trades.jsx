import React from 'react';
import DataGrid from '../../Components/core/DataGrid/DataGrid';
import useLocalize from '../../Hooks/useLocalize';

// import styles from './Header.module.css';

const Trades = () => {
  const translate = useLocalize();
  const cols = [
    {
      title: translate('trades.id'),
      field: 'id',
      sortable: true
    },
    {
      title: translate('trades.version'),
      field: 'version'
    },
    {
      title: translate('trades.counter_party_id'),
      field: 'counterPartyId',
      sortable: true
    },
    {
      title: translate('trades.booking_id'),
      field: 'bookingId',
      sortable: true
    },
    {
      title: translate('trades.maturity_date'),
      field: 'maturityDate',
      sortable: true,
      renderCell: (value) => value.toLocaleDateString()
    },
    {
      title: translate('trades.created_date'),
      field: 'createdDate',
      sortable: true,
      renderCell: (value) => value.toLocaleDateString()
    },
    {
      title: translate('trades.expired'),
      field: 'expired',
      sortable: true,
      renderCell: (_, row) => row.maturityDate > new Date() ? translate('generic.yes') : translate('generic.no')
    }
  ];

  return (
    <DataGrid columns={cols} rows={[]} />
  );
};

export default Trades;