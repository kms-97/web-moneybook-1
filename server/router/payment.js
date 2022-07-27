const express = require('express');
const paymentController = require('../controller/payment');
const { asyncErrorCatcher } = require('../middleware/asyncErrorCatcher');

const paymentRouter = express.Router();

paymentRouter.get('/', asyncErrorCatcher(paymentController.getAllPayment));
paymentRouter.post('/', asyncErrorCatcher(paymentController.postPayment));
paymentRouter.delete('/', asyncErrorCatcher(paymentController.deletePayment));

module.exports = { paymentRouter };
