import Trade from './Trade';

test('should set values properly', () => {
  const rawData = {
    id: 'TRADE_0551',
    version: 2,
    counterPartyId: 'Counter-Party-0',
    bookingId: 'B05542',
    maturityDate: '2022-08-12T20:30:45.848Z',
    createdDate: '2022-08-08T20:30:45.848Z'
  };

  const maturityDate = new Date(rawData.maturityDate);
  maturityDate.setHours(0, 0, 0, 0);
  const createdDate = new Date(rawData.createdDate);
  createdDate.setHours(0, 0, 0, 0);
  const trade = new Trade(rawData);
  expect(trade.id).toBe(rawData.id);
  expect(trade.bookingId).toBe(rawData.bookingId);
  expect(trade.version).toBe(rawData.version);
  expect(trade.counterPartyId).toBe(rawData.counterPartyId);
  expect(trade.bookingId).toBe(rawData.bookingId);
  expect(trade.maturityDate).toStrictEqual(maturityDate);
  expect(trade.createdDate).toStrictEqual(createdDate);
  expect(trade.expired).toBe(true);
});
