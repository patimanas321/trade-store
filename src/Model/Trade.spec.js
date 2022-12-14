import Trade from './Trade';

test('should set values properly', () => {
  const rawData = {
    id: 'TRADE_0551',
    version: 2,
    counterPartyId: 'Counter-Party-0',
    bookingId: 'B05542',
    maturityDate: '2022-08-03T20:30:45.848Z',
    createdDate: '2022-08-08T20:30:45.848Z'
  };

  const trade = new Trade(rawData);
  expect(trade.id).toBe(rawData.id);
  expect(trade.bookingId).toBe(rawData.bookingId);
  expect(trade.version).toBe(rawData.version);
  expect(trade.counterPartyId).toBe(rawData.counterPartyId);
  expect(trade.bookingId).toBe(rawData.bookingId);
  expect(trade.maturityDate.toISOString()).toBe(rawData.maturityDate);
  expect(trade.createdDate.toISOString()).toBe(rawData.createdDate);
  expect(trade.expired).toBe(true);
});
