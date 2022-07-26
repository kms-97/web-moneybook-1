const express = require('express');
const paymentController = require('../controller/payment');

const paymentRouter = express.Router();

paymentRouter.get('/', paymentController.getAllPayment);
paymentRouter.post('/', paymentController.postPayment);
paymentRouter.delete('/', paymentController.deletePayment);

module.exports = { paymentRouter };
