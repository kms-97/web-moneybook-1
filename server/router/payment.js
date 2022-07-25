const express = require('express');
const controller = require('../controller/payment');

const paymentRouter = express.Router();

paymentRouter.get('/', controller.getAllPayment);
paymentRouter.post('/', controller.postPayment);
paymentRouter.delete('/', controller.deletePayment);

module.exports = { paymentRouter };
