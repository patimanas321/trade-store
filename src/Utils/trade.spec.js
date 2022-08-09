import AppConstants from '../Constants/AppConstants';
import { sortTrades, mergeTrades } from './trade';

const generateRandomNumber = (min, max) => {
  const random = Math.random() * (+max - +min) + +min;
  return Math.floor(random);
};
const trades = new Array(10).fill(0).map((_, index) => ({
  id: `TRADE_${generateRandomNumber(1, 20).toString().padStart(4, '0')}`,
  version: generateRandomNumber(1, 10),
  counterPartyId: `Counter-Party_${index}`
}));

test('sortTrades() should sort by id - DESCENDING', () => {
  const sorted = sortTrades(trades, { column: 'id', order: AppConstants.SORT_ORDER.DESCENDING });

  let lastVal = Infinity;
  for (const trade of sorted) {
    const id = Number(trade.id.split('_')[1]);
    expect(id).toBeLessThanOrEqual(lastVal);
    lastVal = id;
  }
});

test('sortTrades() should sort by id - ASCENDING', () => {
  const sorted = sortTrades(trades, { column: 'id', order: AppConstants.SORT_ORDER.ASCENDING });

  let lastVal = -Infinity;
  for (const trade of sorted) {
    const id = Number(trade.id.split('_')[1]);
    expect(id).toBeGreaterThanOrEqual(lastVal);
    lastVal = id;
  }
});

test('sortTrades() should sort by version - ASCENDING', () => {
  const sorted = sortTrades(trades, { column: 'version', order: AppConstants.SORT_ORDER.ASCENDING });

  let lastVal = -Infinity;
  for (const trade of sorted) {
    expect(trade.version).toBeGreaterThanOrEqual(lastVal);
    lastVal = trade.version;
  }
});

test('sortTrades() should sort by counterPartyId - ASCENDING', () => {
  const sorted = sortTrades(trades, { column: 'counterPartyId', order: AppConstants.SORT_ORDER.DESCENDING });

  let lastVal = Infinity;
  for (const trade of sorted) {
    const id = Number(trade.counterPartyId.split('_')[1]);
    expect(id).toBeLessThanOrEqual(lastVal);
    lastVal = id;
  }
});

const tradesInStore = [
  {
    id: 'TRADE_1',
    version: 1,
    counterPartyId: 'Counter-Party_1',
    maturityDate: new Date().setDate(new Date().getDate() + 1)
  },
  {
    id: 'TRADE_2',
    version: 2,
    counterPartyId: 'Counter-Party_1',
    maturityDate: new Date().setDate(new Date().getDate() - 3)
  }
];
test('mergeTrades() should reject trades with part maturity date', () => {
  const toBeMerged = [
    {
      id: 'TRADE_3',
      version: 2,
      counterPartyId: 'Counter-Party_1',
      maturityDate: new Date().setDate(new Date().getDate() + 1)
    },
    {
      id: 'TRADE_2',
      version: 1,
      counterPartyId: 'Counter-Party_1',
      maturityDate: new Date().setDate(new Date().getDate() - 3)
    }
  ];
  const {
    trades,
    lowerVersionCount,
    sameVersionCount,
    lessMaturityDateCount,
    validRecordsCount
  } = mergeTrades(tradesInStore, toBeMerged);
  expect(trades).toHaveLength(3);
  expect(lowerVersionCount).toEqual(0);
  expect(sameVersionCount).toEqual(0);
  expect(lessMaturityDateCount).toEqual(1);
  expect(validRecordsCount).toEqual(1);
});

test('mergeTrades() should reject trades with lower version', () => {
  const toBeMerged = [
    {
      id: 'TRADE_3',
      version: 2,
      counterPartyId: 'Counter-Party_1',
      maturityDate: new Date().setDate(new Date().getDate() + 1)
    },
    {
      id: 'TRADE_2',
      version: 1,
      counterPartyId: 'Counter-Party_1',
      maturityDate: new Date().setDate(new Date().getDate() + 3)
    }
  ];
  const {
    trades,
    lowerVersionCount,
    sameVersionCount,
    lessMaturityDateCount,
    validRecordsCount
  } = mergeTrades(tradesInStore, toBeMerged);
  expect(trades).toHaveLength(3);
  expect(lowerVersionCount).toEqual(1);
  expect(sameVersionCount).toEqual(0);
  expect(lessMaturityDateCount).toEqual(0);
  expect(validRecordsCount).toEqual(1);
});

test('mergeTrades() should override trades with same version', () => {
  const toBeMerged = [
    {
      id: 'TRADE_1',
      version: 1,
      counterPartyId: 'Counter-Party_1',
      maturityDate: new Date().setDate(new Date().getDate() + 1)
    },
    {
      id: 'TRADE_2',
      version: 2,
      counterPartyId: 'Counter-Party_1',
      maturityDate: new Date().setDate(new Date().getDate() + 3)
    }
  ];
  const {
    trades,
    lowerVersionCount,
    sameVersionCount,
    lessMaturityDateCount,
    validRecordsCount
  } = mergeTrades(tradesInStore, toBeMerged);
  expect(trades).toHaveLength(2);
  expect(lowerVersionCount).toEqual(0);
  expect(sameVersionCount).toEqual(2);
  expect(lessMaturityDateCount).toEqual(0);
  expect(validRecordsCount).toEqual(0);
});

test('mergeTrades() should add trades with new version', () => {
  const toBeMerged = [
    {
      id: 'TRADE_1',
      version: 2,
      counterPartyId: 'Counter-Party_1',
      maturityDate: new Date().setDate(new Date().getDate() + 1)
    },
    {
      id: 'TRADE_2',
      version: 3,
      counterPartyId: 'Counter-Party_1',
      maturityDate: new Date().setDate(new Date().getDate() + 3)
    }
  ];
  const {
    trades,
    lowerVersionCount,
    sameVersionCount,
    lessMaturityDateCount,
    validRecordsCount
  } = mergeTrades(tradesInStore, toBeMerged);
  expect(trades).toHaveLength(4);
  expect(lowerVersionCount).toEqual(0);
  expect(sameVersionCount).toEqual(0);
  expect(lessMaturityDateCount).toEqual(0);
  expect(validRecordsCount).toEqual(2);
});

test('mergeTrades() should add all new trades', () => {
  const toBeMerged = [
    {
      id: 'TRADE_4',
      version: 1,
      counterPartyId: 'Counter-Party_1',
      maturityDate: new Date().setDate(new Date().getDate() + 1)
    },
    {
      id: 'TRADE_3',
      version: 1,
      counterPartyId: 'Counter-Party_1',
      maturityDate: new Date().setDate(new Date().getDate() + 3)
    }
  ];
  const {
    trades,
    lowerVersionCount,
    sameVersionCount,
    lessMaturityDateCount,
    validRecordsCount
  } = mergeTrades(tradesInStore, toBeMerged);
  expect(trades).toHaveLength(4);
  expect(lowerVersionCount).toEqual(0);
  expect(sameVersionCount).toEqual(0);
  expect(lessMaturityDateCount).toEqual(0);
  expect(validRecordsCount).toEqual(2);
});
