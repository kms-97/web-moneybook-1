const express = require('express');

const historyRouter = express.Router();

historyRouter.get('/', (req, res) => {
  res.json('get /history');
});
historyRouter.get('/SixMonthPerCategory', (req, res) => {
  res.send('get /history/SixMonth');
});
historyRouter.post('/', (req, res) => {
  res.send('post /history');
});
historyRouter.put('/', (req, res) => {
  res.send('put /history');
});

module.exports = { historyRouter };
