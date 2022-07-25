const express = require('express');

const historyRouter = express.Router();

historyRouter.get('/', (req, res) => {
  res.json('get /history');
});
historyRouter.get('/SixMonthPerCategory', (req, res) => {
  res.json('get /history/SixMonth');
});
historyRouter.post('/', (req, res) => {
  res.json('post /history');
});
historyRouter.put('/', (req, res) => {
  res.json('put /history');
});

module.exports = { historyRouter };
