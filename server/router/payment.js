const express = require('express');

const paymentRouter = express.Router();

paymentRouter.get('/', (req, res) => {
  res.json('get /payment');
});
paymentRouter.post('/', (req, res) => {
  res.json('post /payment');
});
paymentRouter.delete('/', (req, res) => {
  res.json('delete /payment');
});

module.exports = { paymentRouter };
