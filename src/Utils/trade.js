import AppConstants from '../Constants/AppConstants';

export function sortTrades (records, { column, order }) {
  return records.sort((a, b) => {
    if (order === AppConstants.SORT_ORDER.ASCENDING) {
      return a[column] > b[column] ? 1 : -1;
    }
    return a[column] > b[column] ? -1 : 1;
  });
};

export function mergeTrades (list, newTrades) {
  const copy = [...list];
  let lowerVersionCount = 0;
  let sameVersionCount = 0;
  let lessMaturityDateCount = 0;
  let validRecordsCount = 0;
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  for (const trade of newTrades) {
    // Maturity date less then today - REJECT
    if (trade.maturityDate < today) {
      lessMaturityDateCount++;
      continue;
    }
    // If same version - OVERRIDE
    const matchingIdAndVersion = copy.find(entry => entry.id === trade.id && entry.version === trade.version);
    if (matchingIdAndVersion) {
      copy[copy.indexOf(matchingIdAndVersion)] = trade;
      sameVersionCount++;
      continue;
    }
    // If smaller version - REJECT
    const allRecordsWithSameID = copy.filter(entry => entry.id === trade.id).sort((a, b) => b.version - a.version);
    if (allRecordsWithSameID?.[0]?.version > trade.version) {
      lowerVersionCount++;
      continue;
    }

    // Valid Record - ADD
    copy.push(trade);
    validRecordsCount++;
  }

  return {
    trades: copy,
    lowerVersionCount,
    sameVersionCount,
    lessMaturityDateCount,
    validRecordsCount
  };
};
