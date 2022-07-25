const express = require('express');
const controller = require('../controller/payment');

const paymentRouter = express.Router();

paymentRouter.get('/', controller.getAllPayment);
paymentRouter.post('/', (req, res) => {
  res.json('post /payment');
});
paymentRouter.delete('/', (req, res) => {
  res.json('delete /payment');
});

module.exports = { paymentRouter };
