const express = require('express');
const controller = require('../controller/payment');
const { asyncErrorCatcher } = require('../middleware/asyncErrorCatcher');

const paymentRouter = express.Router();

paymentRouter.get('/', asyncErrorCatcher(controller.getAllPayment));
paymentRouter.post('/', asyncErrorCatcher(controller.postPayment));
paymentRouter.delete('/', asyncErrorCatcher(controller.deletePayment));

module.exports = { paymentRouter };
