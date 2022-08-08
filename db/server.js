const jsonServer = require('json-server');
const server = jsonServer.create();

const generateRandomNumber = (min = -3, max = 5) => {
  const random = Math.random() * (+max - +min) + +min;
  return Math.floor(random);
};
const generateRandomMaturityDate = () => {
  const date = new Date();
  date.setDate(date.getDate() + generateRandomNumber());
  return date;
};
const generateNewTrades = () => {
  const res = [];
  for (let i = 0; i < 10; i++) {
    res.push({
      id: `TRADE_${generateRandomNumber(1, 1000).toString().padStart(4, '0')}`,
      version: generateRandomNumber(1, 10),
      counterPartyId: `Counter-Party-${i}`,
      bookingId: `B_${generateRandomNumber(1, 10000).toString().padStart(5, '0')}`,
      maturityDate: generateRandomMaturityDate(),
      createdDate: new Date()
    });
  }

  return res;
};

server.get('/trades', (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.jsonp(generateNewTrades());
});

server.listen(3001, () => {
  console.log('JSON Server is running');
});
